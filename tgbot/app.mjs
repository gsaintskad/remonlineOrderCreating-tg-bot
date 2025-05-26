import dotenv from 'dotenv';

import { remonlineTokenToEnv } from './remonline/remonline.api.mjs';
import initAPI from './api/initAPI.mjs';
import initBot from './telegram/initBot.mjs';

import { onReset } from './telegram/middleware/start-handler.mjs';

dotenv.config();

const { app } = await initAPI();
const { bot } = await initBot();


await remonlineTokenToEnv();


const webhookPath = process.env.HOST_PATH || '/bot';

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {});
if (process.env.ENV === 'dev') {
  bot.command('reset', onReset);
  bot.launch();
} else if (process.env.ENV === 'prod') {
  const webhookProps = { domain: process.env.HOST, path: webhookPath };
  await bot.createWebhook(webhookProps);
  app.use(webhookPath, async (req, res) => {
    await bot.handleUpdate(req.body);
    res.sendStatus(200);
  });
}

console.log('Bot setup completed.');
