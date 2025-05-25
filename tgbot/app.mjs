// import { Telegraf, session } from "telegraf";
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// import { dbLogger } from "./telegram/middleware/db-logger.mjs";
// import { stage } from "./telegram/stage.mjs";
// import {
//   onStart,
//   onReset,
//   onEdit,
//   onGetOrders,
// } from "./telegram/middleware/start-handler.mjs";
// import { keyboardText } from "./translate.mjs";
// import { remonlineTokenToEnv } from "./remonline/remonline.api.mjs";
// import { getOrders } from "./remonline/remonline.utils.mjs";
// import {
//   generateUserAssetListKeyboard,
//   verifyTelegramWebAppData,
// } from "./telegram/telegram.utilities.mjs";
// import { getRemonlineIdByTelegramId } from "./telegram/telegram.queries.mjs";

// // Load environment variables
// dotenv.config();

// await remonlineTokenToEnv();
// // // await createAsset({uid:"t3stt3st"})

// // // const asset = await getAsset({ params: { licensePlate: "t3stt3st" } });
// const remonline_id = 33715361;
// // const asset = await getAsset({ params: {remonline_id:33715361 } });
// // console.log(asset)
// // // return
// // await generateUserAssetListKeyboard({ remonline_id });

// const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

// const app = express();
// app.use(cors());

// bot.use(session());
// bot.use(stage.middleware());

// (async () => {
//   bot.use(dbLogger);
//   bot.start(onStart);
//   bot.command("edit", onEdit);
//   bot.command("getOrders", onGetOrders);

//   bot.hears(keyboardText.newAppointment, (ctx) => {
//     if (!ctx.session.remonline_id) {
//       return;
//     }
//     return ctx.scene.enter(process.env.CREATE_ORDER_SCENE);
//   });

//   // Setup webhook
//   const webhookPath = process.env.HOST_PATH || "/bot";
//   const webhookUrl = `${process.env.HOST}${webhookPath}`;
//   app.use(express.json());

//   app.get("/api/order/:remonline_id", async (req, res) => {
//     try {
//       const { remonline_id } = req.params;

//       const { data } = await getOrders({
//         "clients_ids[]": String(remonline_id),
//       });

//       res.status(200).json({
//         status: "success",
//         message: "Order sent to Telegram bot",
//         orders: data,
//       });
//     } catch (error) {
//       console.error("Error processing order:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });
//   app.post("/api/orders", express.text({ type: "*/*" }), async (req, res) => {
//     const initDataString = req.body; // initData будет строкой в теле запроса
//     const botToken = process.env.TELEGRAM_API_KEY;

//     if (!initDataString || typeof initDataString !== "string") {
//       return res.status(400).json({
//         success: false,
//         error: "initData is required and must be a string",
//       });
//     }
//     console.log({ initDataString });
//     if (!botToken) {
//       console.error("Error: TELEGRAM_API_KEY is not set."); // Важно для безопасности
//       return res
//         .status(500)
//         .json({ success: false, error: "Server configuration error" });
//     }

//     const { isValid, userId } = verifyTelegramWebAppData(
//       initDataString,
//       botToken
//     );
//     console.log({ isValid, userId });

//     if (isValid && userId) {
//       try {
//         console.log(
//           `User authenticated with Telegram ID: ${userId}. Fetching orders...`
//         );
//         const { remonline_id } = await getRemonlineIdByTelegramId({
//           telegramId: userId,
//         });

//         // Используем telegramUserId как client_id для RemOnline
//         const params = {
//           remonline_id,
//         };
//         const orders = await getOrders({ params });

//         res.status(200).json({
//           success: true,
//           message: "Data verified and orders fetched",

//           user: { id: userId },
//           orders,
//         });
//       } catch (error) {
//         console.error(
//           `Error fetching orders for Telegram User ID ${userId}:`,
//           error
//         );
//         res.status(500).json({
//           success: true, // Аутентификация прошла, но заказы не загрузились
//           message: "User authenticated, but failed to fetch orders.",
//           user: { id: userId },
//           orders: null,
//           error: error.message,
//         });
//       }
//     } else if (isValid && !userId) {
//       // Случай, когда initData валиден, но userId по какой-то причине не был извлечен (маловероятно, если user поле есть)
//       console.warn("initData is valid, but userId could not be extracted.");
//       res.status(403).json({
//         success: false,
//         error: "User data incomplete in Telegram initData.",
//       });
//     } else {
//       console.warn("Invalid initData received:", initDataString);
//       res.status(403).json({
//         success: false,
//         error: "Invalid Telegram data or hash mismatch",
//       });
//     }
//   });
//   app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
//     console.log(
//       `Repairstationbot listening on port ${process.env.PORT || 3000}`
//     );
//   });
//   if (process.env.ENV === "dev") {
//     bot.command("reset", onReset);
//     bot.launch();
//     console.log("Bot is running in development mode...");
//   } else if (process.env.ENV === "prod") {
//     const webhookProps = { domain: process.env.HOST, path: webhookPath };
//     console.log({ webhookProps });
//     await bot.createWebhook(webhookProps);
//     app.use(webhookPath, async (req, res) => {
//       await bot.handleUpdate(req.body);
//       res.sendStatus(200);
//     });
//   }

//   console.log("Bot setup completed.");
// })();
