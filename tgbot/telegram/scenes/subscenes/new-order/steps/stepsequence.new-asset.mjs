import { Markup } from 'telegraf';
import { chooseAssetTypes } from '../../../../../translate.mjs';
import { stayInSpecialNewOrderSubscene } from '../../../../telegram.utilities.mjs';
import { ua } from '../../../../../translate.mjs';
import { isDataCorrentBtm } from '../../../../middleware/keyboards.mjs';

import {
  createAsset,
  getAsset,
} from '../../../../../remonline/remonline.utils.mjs';
import { saveNewAsset } from '../../../../telegram.queries.mjs';
import { transliterateCyrillicToLatinString } from '../../../../../utils/utils.mjs';

const stayInNewAssetRegitraionSubscene = stayInSpecialNewOrderSubscene({
  subSceneSet: chooseAssetTypes,
  targetSubscene: chooseAssetTypes.registerNewAsset,
});
const getLicensePlate = async (ctx) => {
  console.log('trying to create new asset');
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
  const licensePlate = transliterateCyrillicToLatinString(ctx.message.text);

  ctx.session.contactData.newAssetDto.uid = licensePlate;
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
  const year = parseInt(ctx.message.text);
  if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
    ctx.reply(ua.createAsset.wrongYear);
    return;
  }
  ctx.session.contactData.newAssetDto.year = year;
  ctx.reply(ua.createAsset.askModel);
  return ctx.wizard.next();
};
const getModel = async (ctx) => {
  ctx.session.contactData.newAssetDto.model = ctx.message.text;
  ctx.reply(ua.createAsset.askMileage);
  return ctx.wizard.next();
};
const getMileage = async (ctx) => {
  const mileage = parseInt(ctx.message.text);
  if (isNaN(mileage) || mileage < 0 || mileage > 10_000_000) {
    ctx.reply(ua.createAsset.wrongMileage);
    return;
  }
  ctx.session.contactData.newAssetDto.mileage = ctx.message.text;
  ctx.reply(ua.createAsset.askEngineVolume);
  return ctx.wizard.next();
};
const getEngineVolume = async (ctx) => {
  const engineVolume = parseFloat(ctx.message.text);
  if (isNaN(engineVolume) || engineVolume <= 0 || engineVolume > 50_000) {
    ctx.reply(ua.createAsset.wrongEngineVolume);
    return;
  }
  ctx.session.contactData.newAssetDto.engineVolume = engineVolume;
  ctx.reply(ua.createAsset.askMyTaxiCrmId);
  return ctx.wizard.next();
};
const getMyTaxiCrmIdAndDataVerification = async (ctx) => {
  ctx.session.contactData.newAssetDto.myTaxiCrmId = ctx.message.text;

  //data verification
  const {
    uid,
    brand,
    group: carGroup,
    color,
    year,
    model,
    mileage,
    engineVolume,
    myTaxiCrmId,
  } = ctx.session.contactData.newAssetDto;
  let verificationText = `Перевірте деталі:

🆔 Номер авто:${uid},
👥 Група:${carGroup},
🎬 Бренд:${brand},
🎨 Колір:${color},
⚙️ Рік продукції:${year},
🚘 Модель:${model},
💨 Пробіг (км):${mileage},
⚙️ Об'єм двигуна (куб.см):${engineVolume},
🆔 myTaxiCrmId:${myTaxiCrmId}

Чи все правильно 🧐?
`;

  ctx.reply(verificationText, isDataCorrentBtm);
  return ctx.wizard.next();
};
const verificationSummary = async (ctx) => {
  if (!ctx.update.callback_query) {
    return;
  }
  const { data } = ctx.update.callback_query;
  if (data === 'wrong_order' || data !== 'order_is_ok') {
    await ctx.answerCbQuery('Помилкa. Повторіть спробу');
    await ctx.reply(ua.createOrder.tryAgainToCompletApointment);
    return ctx.scene.enter(process.env.NEW_ASSET_SCENE);
  }
  const {
    uid,
    brand,
    group: carGroup,
    color,
    year,
    model,
    mileage,
    engineVolume,
    myTaxiCrmId,
  } = ctx.session.contactData.newAssetDto;
  const client_id = ctx.session.remonline_id;
  const chosenAsset = {
    uid,
    brand,
    carGroup,
    color,
    year,
    model,
    mileage,
    engineVolume,
    myTaxiCrmId,
    client_id,
  };
  let asset;
  try {
    asset = (await createAsset(chosenAsset)).asset;
  } catch (e) {
    const params = {
      licensePlate: uid,
    };
    const { data } = await getAsset({ params });
    const [as] = data;
    asset = { ...as, asset_id: as.id };
  }
  const { asset_id } = asset;
  chosenAsset.asset_id = asset_id;
  await saveNewAsset({ asset_id, client_id, asset_uid: uid });
  delete ctx.session.contactData.newAssetDto;
  ctx.session.contactData.chosenAsset = chosenAsset;
  return ctx.scene.enter(process.env.SELECT_MALFUNCTION_SCENE);
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
  verificationSummary,
];
