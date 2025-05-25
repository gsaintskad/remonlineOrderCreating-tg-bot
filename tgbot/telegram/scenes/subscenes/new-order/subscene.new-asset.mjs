import { Scenes } from "telegraf";
import { registerNewAssetStepSequence } from "./steps/stepsequence.new-asset.mjs";

export const newAssetSubscene = new Scenes.WizardScene(
  process.env.NEW_ASSET_SCENE,
  ...registerNewAssetStepSequence,
);
