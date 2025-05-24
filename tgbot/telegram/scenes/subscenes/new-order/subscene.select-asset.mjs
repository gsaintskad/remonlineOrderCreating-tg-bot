import { Scenes } from "telegraf";
import { selectListedAssetStepSequence } from "./steps/stepsequence.select-listed-asset.mjs";
import { registerNewAssetStepSequence } from "./steps/stepsequence.new-asset.mjs";
import { chooseAssetTypes } from "../../../../translate.mjs";
const nextScene = [];
export const selectAssetSubscene = new Scenes.WizardScene(
  process.env.SELECT_ASSET_SCENE,
  ...selectListedAssetStepSequence
);
