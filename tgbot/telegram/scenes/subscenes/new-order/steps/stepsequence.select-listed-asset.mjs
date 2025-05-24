import {
  chooseAssetTypes,
  specialMessages,
} from "../../../../../translate.mjs";
import { stayInSpecialNewOrderSubscene } from "../../../../telegram.utilities.mjs";
import { ua } from "../../../../../translate.mjs";
import { generateUserAssetListKeyboard } from "../../../../telegram.utilities.mjs";
import { getAsset } from "../../../../../remonline/remonline.utils.mjs";
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
  const { code, keyboard } = await generateUserAssetListKeyboard({
    remonline_id,
  });

  ctx.reply(
    code === 404 ? "Не знайдено ваших авто" : ua.createOrder.chooseAsset,
    keyboard
  );
  return ctx.wizard.next();
};
const getRemonlineAsset = async (ctx) => {
  if (ctx.message.text === specialMessages.turnBack) {
    return ctx.scene.enter(process.env.CREATE_ORDER_SCENE);
  }
  const navDecision = stayInChooseListedAssetSubscene(
    ctx,
    ctx.session.chosenAssetSelectingMode
  );
  if (navDecision) {
    return navDecision;
  }
  const licensePlate = ctx.message.text;
  console.log(ctx.session.contactData.chosenAsset);
  const {
    data: [asset],
  } = await getAsset({ params: { licensePlate } });
  ctx.session.contactData.chosenAsset = asset;
  ctx.reply("leaving scene...");
  return ctx.scene.enter(process.env.SELECT_MALFUNCTION_SCENE);
};

export const selectListedAssetStepSequence = [
  sendAssetKeyboard,
  getRemonlineAsset,
];
