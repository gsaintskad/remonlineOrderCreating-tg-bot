import { chooseAssetTypes } from "../../../../../translate.mjs";
import { stayInSpecialNewOrderSubscene } from "../../../../telegram.utilities.mjs";
import { ua } from "../../../../../translate.mjs";
import { generateUserAssetListKeyboard } from "../../../../telegram.utilities.mjs";
const stayInChooseListedAssetSubscene = stayInSpecialNewOrderSubscene({
  subSceneSet: chooseAssetTypes,
  targetSubscene: chooseAssetTypes.listMyAssets,
});

const sendAssetKeyboard = async (ctx) => {
  console.log("trying to send asset keyboard");
  const navDecision = stayInChooseListedAssetSubscene(
    ctx,
    ctx.session.chosenAssetSelectingMode
  );
  if (navDecision) {
    return navDecision;
  }
  const { remonline_id } = ctx.session;
  const keyboard = await generateUserAssetListKeyboard({ remonline_id });
  ctx.reply(ua.createOrder.chooseAsset, keyboard);
  return ctx.wizard.next();
};
const getRemonlineAsset = async (ctx) => {
  const navDecision = stayInChooseListedAssetSubscene(
    ctx,
    ctx.session.chosenAssetSelectingMode
  );
  if (navDecision) {
    return navDecision;
  }
  ctx.session.contactData.chosenAsset.licensePlate = ctx.message.text;
  console.log(ctx.session.contactData.chosenAsset);
  ctx.reply("leaving scene...");
  return ctx.scene.leave();
};

export const chooseListedAssetSubscene = [sendAssetKeyboard, getRemonlineAsset];
