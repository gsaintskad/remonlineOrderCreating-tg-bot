import { Scenes } from "telegraf";
import { chooseListedAssetSubscene } from "./steps/stepsequence.choose-listed-asset.mjs";
import { registerNewAssetSubScene } from "./steps/stepsequence.new-asset.mjs";
import { chooseAssetTypes } from "../../../../translate.mjs";
const nextScene = [];
export const newAssetSubscene = new Scenes.WizardScene(
  process.env.NEW_ASSET_SCENE,
  ...registerNewAssetSubScene
);
