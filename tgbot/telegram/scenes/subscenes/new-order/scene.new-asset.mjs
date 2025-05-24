import { Scenes } from "telegraf";
import { chooseListedAssetSubscene } from "./steps/subscene.choose-listed-asset.mjs";
import { registerNewAssetSubScene } from "./steps/subscene.new-asset.mjs";
import { chooseAssetTypes } from "../../../../translate.mjs";
const nextScene = [];
export const newAssetScene = new Scenes.WizardScene(
  process.env.NEW_ASSET_SCENE,
  ...registerNewAssetSubScene
);
