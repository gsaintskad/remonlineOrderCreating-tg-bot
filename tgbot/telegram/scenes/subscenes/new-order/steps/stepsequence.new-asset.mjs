import { Markup } from "telegraf";
import { chooseAssetTypes } from "../../../../../translate.mjs";
import { stayInSpecialNewOrderSubscene } from "../../../../telegram.utilities.mjs";
import { ua } from "../../../../../translate.mjs";
import { group } from "console";
import { SyntheticModule } from "vm";

const stayInNewAssetRegitraionSubscene = stayInSpecialNewOrderSubscene({
  subSceneSet: chooseAssetTypes,
  targetSubscene: chooseAssetTypes.registerNewAsset,
});
const getLicensePlate = async (ctx) => {
  console.log("trying to create new asset");
  // const navDecision = stayInNewAssetRegitraionSubscene(
  //   ctx,
  //   ctx.session.chosenAssetSelectingMode
  // );
  // if (navDecision) {
  //   return navDecision;
  // }
  ctx.session.contactData.newAssetDto = {};
  ctx.reply(ua.createAsset.askPlateNumber, Markup.removeKeyboard());
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
    ctx.reply(ua.createAsset.wrongPlateNumber);
    return;
  }
  ctx.session.contactData.newAssetDto.uid = ctx.message.text;
  ctx.reply(ua.createAsset.askBrand, Markup.removeKeyboard());
  return ctx.wizard.next();
};

const getBrand = async (ctx) => {
  ctx.session.contactData.newAssetDto.brand = ctx.message.text;
  ctx.reply(ua.createAsset.askGroup);
  return ctx.wizard.next();
};
const getGroup = async (ctx) => {
  ctx.session.contactData.newAssetDto.group = ctx.message.text;
  ctx.reply(ua.createAsset.askColor);
  return ctx.wizard.next();
};
const getColor = async (ctx) => {
  ctx.session.contactData.newAssetDto.color = ctx.message.text;
  ctx.reply(ua.createAsset.askYear);
  return ctx.wizard.next();
};
const getYear = async (ctx) => {
  ctx.session.contactData.newAssetDto.year = ctx.message.text;
  ctx.reply(ua.createAsset.askModel);
  return ctx.wizard.next();
};
const getModel = async (ctx) => {
  ctx.session.contactData.newAssetDto.model = ctx.message.text;
  ctx.reply(ua.createAsset.askMileage);
  return ctx.wizard.next();
};
const getMileage = async (ctx) => {
  ctx.session.contactData.newAssetDto.mileage = ctx.message.text;
  ctx.reply(ua.createAsset.askEngineVolume);
  return ctx.wizard.next();
};
const getEngineVolume = async (ctx) => {
  ctx.session.contactData.newAssetDto.engineVolume = ctx.message.text;
  ctx.reply(ua.createAsset.askMyTaxiCrmId);
  return ctx.wizard.next();
};
const getMyTaxiCrmIdAndDataVerification = async (ctx) => {
  ctx.session.contactData.newAssetDto.myTaxiCrmId = ctx.message.text;

  //data verification
  const {uid, brand, group:carGroup, color, year, model, mileage, engineVolume, myTaxiCrmId} = ctx.session.contactData.newAssetDto
  let verificationText = `Перевірте деталі
    uid:${uid},
    group:${carGroup},
    brand:${brand},
    color:${color},
    year:${year},
    model:${model},
    Пробіг:${mileage},
    Об'єм двигуна (куб.см):${engineVolume},
    myTaxiCrmId:${myTaxiCrmId}
`;

  ctx.reply(verificationText);
  return ctx.wizard.next();
};
export const registerNewAssetStepSequence = [
  getLicensePlate,
  verifyNumber,
  getBrand,
  getGroup,
  getColor,
  getYear,
  getModel,
  getMileage,
  getEngineVolume,
  getMyTaxiCrmIdAndDataVerification,
];
