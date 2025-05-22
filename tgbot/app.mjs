import { Telegraf, session, Scenes } from "telegraf";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { createOrderScene } from "./telegram/scenes/scene.new-order.mjs";
import { createRemonlineId } from "./telegram/scenes/scene.new-remonline-id.mjs";
import { editUserScene } from "./telegram/scenes/scene.user-edit-scene.mjs";
import { dbLogger } from "./telegram/middleware/db-logger.mjs";
import {
  onStart,
  onReset,
  onEdit,
  onGetOrders,
} from "./telegram/middleware/start-handler.mjs";
import { keyboardText } from "./translate.mjs";
import { remonlineTokenToEnv } from "./remonline/remonline.api.mjs";
import { getOrdersScene } from "./telegram/scenes/scene.get-orders.mjs";
import { getOrders } from "./remonline/remonline.utils.mjs";
import { verifyTelegramWebAppData } from "./telegram/telegram.utilities.mjs";

// Load environment variables
dotenv.config();

await remonlineTokenToEnv();
const bot = new Telegraf(process.env.TELEGRAM_API_KEY);
const stage = new Scenes.Stage([
  createRemonlineId,
  createOrderScene,
  editUserScene,
  getOrdersScene,
]);
const app = express();
app.use(cors());

bot.use(session());
bot.use(stage.middleware());

(async () => {
  bot.use(dbLogger);
  bot.start(onStart);
  bot.command("edit", onEdit);
  bot.command("getOrders", onGetOrders);

  bot.hears(keyboardText.newAppointment, (ctx) => {
    if (!ctx.session.remonline_id) {
      return;
    }
    return ctx.scene.enter(process.env.CREATE_ORDER_SCENE);
  });

  // Setup webhook
  const webhookPath = process.env.HOST_PATH || "/bot";
  const webhookUrl = `${process.env.HOST}${webhookPath}`;
  app.use(express.json());

  app.get("/api/order/:remonline_id", async (req, res) => {
    try {
      const { remonline_id } = req.params;

      const { data } = await getOrders({
        "clients_ids[]": String(remonline_id),
      });

      res.status(200).json({
        status: "success",
        message: "Order sent to Telegram bot",
        orders: data,
      });
    } catch (error) {
      console.error("Error processing order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  // На сервере, в вашем Express приложении:
  // Убедитесь, что импортированы verifyTelegramWebAppData и getOrders
  // const { verifyTelegramWebAppData } = require('./path-to-your-verifier'); // или import
  // const { getOrders } = require('./remonline/remonline.utils.mjs'); // или import

  // Используем express.text() для этого эндпоинта, так как клиент будет слать initData как строку
  app.post("/api/orders", express.text({ type: "*/*" }), async (req, res) => {
    const initDataString = req.body; // initData будет строкой в теле запроса
    const botToken = process.env.TELEGRAM_API_KEY;

    if (!initDataString || typeof initDataString !== "string") {
      return res
        .status(400)
        .json({
          success: false,
          error: "initData is required and must be a string",
        });
    }
    if (!botToken) {
      console.error("Error: TELEGRAM_API_KEY is not set."); // Важно для безопасности
      return res
        .status(500)
        .json({ success: false, error: "Server configuration error" });
    }

    const { isValid, userId } = verifyTelegramWebAppData(
      initDataString,
      botToken
    );

    if (isValid && userId) {
      try {
        console.log(
          `User authenticated with Telegram ID: ${userId}. Fetching orders...`
        );

        // Используем telegramUserId как client_id для RemOnline
        const { data: ordersResponseData } = await getOrders({
          "clients_ids[]": String(userId),
        });

        res.status(200).json({
          success: true,
          message: "Data verified and orders fetched",
          // Можно добавить больше данных о пользователе, если verifyTelegramWebAppData их возвращает
          // или если вы их как-то иначе получаете/формируете на основе userId
          user: { id: telegramUserId },
          orders: ordersResponseData,
        });
      } catch (error) {
        console.error(
          `Error fetching orders for Telegram User ID ${verificationResult.userId}:`,
          error
        );
        res.status(500).json({
          success: true, // Аутентификация прошла, но заказы не загрузились
          message: "User authenticated, but failed to fetch orders.",
          user: { id: verificationResult.userId },
          orders: null,
          error: error.message,
        });
      }
    } else if (verificationResult.isValid && !verificationResult.userId) {
      // Случай, когда initData валиден, но userId по какой-то причине не был извлечен (маловероятно, если user поле есть)
      console.warn("initData is valid, but userId could not be extracted.");
      res
        .status(403)
        .json({
          success: false,
          error: "User data incomplete in Telegram initData.",
        });
    } else {
      console.warn("Invalid initData received:", initDataString);
      res
        .status(403)
        .json({
          success: false,
          error: "Invalid Telegram data or hash mismatch",
        });
    }
  });
  app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
    console.log(
      `Repairstationbot listening on port ${process.env.PORT || 3000}`
    );
  });
  if (process.env.ENV === "dev") {
    bot.command("reset", onReset);
    bot.launch();
    console.log("Bot is running in development mode...");
  } else if (process.env.ENV === "prod") {
    const webhookProps = { domain: process.env.HOST, path: webhookPath };
    console.log({ webhookProps });
    await bot.createWebhook(webhookProps);
    app.use(webhookPath, async (req, res) => {
      await bot.handleUpdate(req.body);
      res.sendStatus(200);
    });
  }

  console.log("Bot setup completed.");
})();
