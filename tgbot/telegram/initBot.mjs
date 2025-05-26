import { Telegraf, session } from 'telegraf';
import { dbLogger } from './middleware/db-logger.mjs';
import { stage } from './stage.mjs';
import {
  onStart,
  onEdit,
  onGetOrders,
  onNewClient,
} from './middleware/start-handler.mjs';
import { keyboardText } from '../translate.mjs';

const initBot = async () => {
  const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

  bot.use(session());
  bot.use(stage.middleware());
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
  return { bot };
};
export default initBot;
