import { Scenes } from "telegraf";
import { chooseListedAssetSubscene } from "./steps/stepsequence.choose-listed-asset.mjs";
import { registerNewAssetSubScene } from "./steps/stepsequence.new-asset.mjs";
import { chooseAssetTypes } from "../../../../translate.mjs";
const nextScene = [];
export const selectAssetSubscene = new Scenes.WizardScene(
  process.env.SELECT_ASSET_SCENE,
  ...chooseListedAssetSubscene
);
