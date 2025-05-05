import { Telegraf, session, Scenes } from 'telegraf';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createOrderScene } from './telegram/scenes/scene.new-order.mjs';
import { createRemonlineId } from './telegram/scenes/scene.new-remonline-id.mjs';
import { editUserScene } from './telegram/scenes/scene.user-edit-scene.mjs';
import { dbLogger } from './telegram/middleware/db-logger.mjs';
import { onStart, onReset, onEdit, onGetOrders } from './telegram/middleware/start-handler.mjs';
import { keyboardText } from './translate.mjs';
import { remonlineTokenToEnv } from './remonline/remonline.api.mjs';
import { getOrdersScene } from './telegram/scenes/scene.get-orders.mjs';
import {getOrders} from "./remonline/remonline.utils.mjs";

// Load environment variables
dotenv.config();

await remonlineTokenToEnv();
const bot = new Telegraf(process.env.TELEGRAM_API_KEY);
const stage = new Scenes.Stage([createRemonlineId, createOrderScene, editUserScene, getOrdersScene]);
const app = express();
app.use(cors());

bot.use(session());
bot.use(stage.middleware());

(async () => {
    bot.use(dbLogger);
    bot.start(onStart);
    bot.command('edit', onEdit);
    bot.command('getOrders', onGetOrders);

    bot.hears(keyboardText.newAppointment, (ctx) => {
        if (!ctx.session.remonline_id) {
            return;
        }
        return ctx.scene.enter(process.env.CREATE_ORDER_SCENE);
    });

    // Setup webhook
    const webhookPath = process.env.HOST_PATH || '/bot';
    const webhookUrl = `${process.env.HOST}${webhookPath}`;
    app.use(express.json());

    if (process.env.ENV === 'dev') {
        bot.command('reset', onReset);
        bot.launch();
        console.log('Bot is running in development mode...');
    } else if (process.env.ENV === 'prod') {
        await bot.createWebhook({ domain: process.env.HOST, path: webhookPath });
        app.use(webhookPath, async (req, res) => {
            await bot.handleUpdate(req.body);
            res.sendStatus(200);
        });
    }
    app.get('/order/:remonline_id', async (req, res) => {
        try {

            const { remonline_id } = req.params;
            const { chatId } = req.body;

            const {data} = await getOrders({'clients_ids[]': String(remonline_id)});


            res.status(200).json({
                status: 'success',
                message: 'Order sent to Telegram bot',
                orders: data
            });
        } catch (error) {
            console.error('Error processing order:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Repairstationbot listening on port ${process.env.PORT || 3000}`);
    });

    console.log("Bot setup completed.");
})();
