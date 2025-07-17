import { Scenes } from 'telegraf';
import { leaveSceneOnCommand } from '../middleware/start-handler.mjs';
import { newOrderStepSequence } from './subscenes/new-order/steps/stepsequence.new-order.mjs';

export const createOrderScene = new Scenes.WizardScene(
  process.env.CREATE_ORDER_SCENE,
  ...newOrderStepSequence
);

createOrderScene.command('start', leaveSceneOnCommand);
