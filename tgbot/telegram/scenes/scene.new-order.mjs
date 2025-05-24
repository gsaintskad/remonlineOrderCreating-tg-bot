import { Scenes, Markup } from "telegraf";
import { ua, malfunctionTypes, chooseAssetTypes } from "../../translate.mjs";
import { mainKeyboard } from "../middleware/keyboards.mjs";
import { createOrder } from "../../remonline/remonline.utils.mjs";
import { leaveSceneOnCommand } from "../middleware/start-handler.mjs";
import {
  saveOrder,
  getBranchManager,
} from "../../remonline/remonline.queries.mjs";
import { generateUserAssetListKeyboard } from "../telegram.utilities.mjs";
import { selectListedAssetStepSequence } from "./subscenes/new-order/steps/stepsequence.select-listed-asset.mjs";
import { registerNewAssetStepSequence } from "./subscenes/new-order/steps/stepsequence.new-asset.mjs";


const chooseAssetKeyboard = (() => {
  const buttons = [
    [chooseAssetTypes.listMyAssets],
    [chooseAssetTypes.registerNewAsset],
  ];
  return Markup.keyboard(buttons).oneTime(true).resize(true);
})();

export const createOrderScene = new Scenes.WizardScene(
  process.env.CREATE_ORDER_SCENE,
  async (ctx) => {
    ctx.session.contactData = {};
    ctx.session.contactData.chosenAsset = {};
    ctx.reply(ua.createOrder.chooseAssetSelectingMode, chooseAssetKeyboard);
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!Object.values(chooseAssetTypes).includes(ctx.message?.text)) {
      ctx.reply(ua.createOrder.chooseAssetSelectingMode, chooseAssetKeyboard);
      console.error("user hadnt chose asset selecting mode");
      return;
    }
    ctx.session.chosenAssetSelectingMode = ctx.message.text;
    process.env.CHOSEN_ASSET_SELECTING_MODE = ctx.message.text;

    if (ctx.session.chosenAssetSelectingMode == chooseAssetTypes.listMyAssets) {
      return ctx.scene.enter(process.env.SELECT_ASSET_SCENE);
    }
    if (
      ctx.session.chosenAssetSelectingMode == chooseAssetTypes.registerNewAsset
    ) {
      return ctx.scene.enter(process.env.NEW_ASSET_SCENE);
    }

    return;
  },
  
);

createOrderScene.command("start", leaveSceneOnCommand);
