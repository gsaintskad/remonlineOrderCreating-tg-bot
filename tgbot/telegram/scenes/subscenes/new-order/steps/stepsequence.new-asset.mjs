import { Markup } from "telegraf";
import { chooseAssetTypes } from "../../../../../translate.mjs";
import { stayInSpecialNewOrderSubscene } from "../../../../telegram.utilities.mjs";
import { ua } from "../../../../../translate.mjs";

const stayInNewAssetRegitraionSubscene = stayInSpecialNewOrderSubscene({
  subSceneSet: chooseAssetTypes,
  targetSubscene: chooseAssetTypes.registerNewAsset,
});
const getLicensePlate = async (ctx) => {
  console.log("trying to create new asset");
  const navDecision = stayInNewAssetRegitraionSubscene(
    ctx,
    ctx.session.chosenAssetSelectingMode
  );
  if (navDecision) {
    return navDecision;
  }
  ctx.reply(ua.createOrder.askPlateNumber, Markup.removeKeyboard());
  return ctx.wizard.next();
};
const verifyNumber = async (ctx) => {
  const navDecision = stayInNewAssetRegitraionSubscene(
    ctx,
    ctx.session.chosenAssetSelectingMode
  );
  if (navDecision) {
    return navDecision;
  }
  if (ctx.message?.text?.length != 8) {
    ctx.reply(ua.createOrder.wrongPlateNumber);
    return;
  }
  ctx.wizard.state.contactData.plateNumber = ctx.message.text;
  return ctx.wizard.next();
};

const getBrand = async (ctx) => {
  const navDecision = stayInNewAssetRegitraionSubscene(
    ctx,
    ctx.session.chosenAssetSelectingMode
  );
  if (navDecision) {
    return navDecision;
  }
  ctx.reply(ua.createOrder.askPlateNumber, Markup.removeKeyboard());
  return ctx.wizard.next();
};

export const registerNewAssetSubScene = [
  getLicensePlate,
  verifyNumber,
  getBrand,
];
