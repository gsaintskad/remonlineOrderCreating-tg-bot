import { Scenes } from "telegraf";
import { registerNewAssetSubScene } from "./steps/stepsequence.new-asset.mjs";

export const selectMalfunctionSubscene = new Scenes.WizardScene(
  process.env.SELECT_MALFUNCTION_SCENE,
  ...registerNewAssetSubScene
);
