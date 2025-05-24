import { Scenes } from "telegraf";
import { selectMalfunctionStepSequence } from "./steps/stepsequence.select-malfunction.mjs";

export const selectMalfunctionSubscene = new Scenes.WizardScene(
  process.env.SELECT_MALFUNCTION_SCENE,
  ...selectMalfunctionStepSequence
);
