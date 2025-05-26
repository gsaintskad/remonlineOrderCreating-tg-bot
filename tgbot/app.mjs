import { Telegraf, session } from 'telegraf';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { dbLogger } from './telegram/middleware/db-logger.mjs';
import { stage } from './telegram/stage.mjs';
import {
  onStart,
  onReset,
  onEdit,
  onGetOrders,
  onNewClient,
} from './telegram/middleware/start-handler.mjs';
import { keyboardText } from './translate.mjs';
import { remonlineTokenToEnv } from './remonline/remonline.api.mjs';
import initAPI from './api/initAPI.mjs';

dotenv.config();

await remonlineTokenToEnv();

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

const app = express();
app.use(cors());

bot.use(session());
bot.use(stage.middleware());

(async () => {
  bot.use(dbLogger);
  bot.start(onStart);
  bot.command('edit', onEdit);
  bot.command('newClient', onNewClient);
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

  initAPI({ app });

  app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(
      `Repairstationbot listening on port ${process.env.PORT || 3000}`
    );
  });
  if (process.env.ENV === 'dev') {
    bot.command('reset', onReset);
    bot.launch();
    console.log('Bot is running in development mode...');
  } else if (process.env.ENV === 'prod') {
    const webhookProps = { domain: process.env.HOST, path: webhookPath };
    console.log({ webhookProps });
    await bot.createWebhook(webhookProps);
    app.use(webhookPath, async (req, res) => {
      await bot.handleUpdate(req.body);
      res.sendStatus(200);
    });
  }

  console.log('Bot setup completed.');
})();
