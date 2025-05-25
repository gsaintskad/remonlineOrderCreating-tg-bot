import { Scenes } from "telegraf";
import { selectListedAssetStepSequence } from "./steps/stepsequence.select-listed-asset.mjs";

export const selectAssetSubscene = new Scenes.WizardScene(
  process.env.SELECT_ASSET_SCENE,
  ...selectListedAssetStepSequence,
);
