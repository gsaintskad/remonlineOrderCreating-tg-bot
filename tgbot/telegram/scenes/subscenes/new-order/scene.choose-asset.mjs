import { Scenes } from "telegraf";
import { chooseListedAssetSubscene } from "./steps/subscene.choose-listed-asset.mjs";
import { registerNewAssetSubScene } from "./steps/subscene.new-asset.mjs";
import { chooseAssetTypes } from "../../../../translate.mjs";
const nextScene = [];
export const selectAssetScene = new Scenes.WizardScene(
  process.env.SELECT_ASSET_SCENE,
  ...chooseListedAssetSubscene
);
