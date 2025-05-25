import { Scenes } from 'telegraf';

import { onStart, leaveSceneOnCommand } from '../middleware/start-handler.mjs';

import { newRemonlineIdStepSequence } from './subscenes/new-remonline-id/steps/stepsequence.new-remonline-id.mjs';

export const createRemonlineId = new Scenes.WizardScene(
  process.env.CREATE_REMONLINE_ID,
  ...newRemonlineIdStepSequence
);

createRemonlineId.command('start', leaveSceneOnCommand);
