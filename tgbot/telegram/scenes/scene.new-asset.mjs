import { Scenes } from "telegraf";
import { chooseListedAssetSubscene } from "./subscenes/new-order/subscene.choose-listed-asset.mjs";
import { registerNewAssetSubScene } from "./subscenes/new-order/subscene.new-asset.mjs";
import { chooseAssetTypes } from "../../translate.mjs";
const nextScene = [];
export const newAssetScene = new Scenes.WizardScene(
  process.env.NEW_ASSET_SCENE,
  ...registerNewAssetSubScene
);
