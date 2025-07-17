import { Markup } from 'telegraf';
import {
  generateUserAssetList,
  stayInSpecialNewOrderSubscene,
} from '../../../../telegram.utilities.mjs';
import { specialMessages } from '../../../../../translate.mjs';
import { getAsset } from '../../../../../remonline/remonline.utils.mjs';
const stayInChooseListedAssetSubscene = stayInSpecialNewOrderSubscene({
  subSceneSet: chooseAssetTypes,
  targetSubscene: chooseAssetTypes.listMyAssets,
});

const getChooseAssetKeyboard = async ({ remonline_id }) => {
  const { foundAssetButtons } = await generateUserAssetList({
    remonline_id,
  });

  const buttons = [...foundAssetButtons, [chooseAssetTypes.registerNewAsset]];
  return Markup.keyboard(buttons).oneTime(true).resize(true);
};

const chooseOrRegisterAsset = async (ctx) => {
  ctx.session.contactData = {};
  ctx.session.contactData.chosenAsset = {};
  const chooseAssetKeyboard = await getChooseAssetKeyboard({
    remonline_id: ctx.session.remonline_id,
  });
  ctx.reply(ua.createOrder.chooseAssetSelectingMode, chooseAssetKeyboard);
  return ctx.wizard.next();
};
const chooseOrRegisterAssetFork = async (ctx) => {
  const { foundAssetButtons } = await generateUserAssetList({
    remonline_id,
  });
  if (
    !Object.values(chooseAssetTypes).includes(ctx.message?.text) &&
    !foundAssetButtons.includes(ctx.message?.text)
  ) {
    ctx.reply(
      ua.createOrder.chooseAssetSelectingMode,
      await getChooseAssetKeyboard({ remonline_id: ctx.session.remonline_id })
    );
    console.error('user hadnt chose asset selecting mode');
    return;
  }
  ctx.session.chosenAssetSelectingMode = ctx.message.text;
  process.env.CHOSEN_ASSET_SELECTING_MODE = ctx.message.text;

  if (
    ctx.session.chosenAssetSelectingMode == chooseAssetTypes.registerNewAsset
  ) {
    return ctx.scene.enter(process.env.NEW_ASSET_SCENE);
  }

  return ctx.wizard.next();
};

const getRemonlineAsset = async (ctx) => {
  if (ctx.message.text === specialMessages.turnBack) {
    return ctx.scene.enter(process.env.CREATE_ORDER_SCENE);
  }
  stay;
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
  const chosenAsset = { ...asset, asset_id: asset.id };
  ctx.session.contactData.chosenAsset = chosenAsset;

  return ctx.scene.enter(process.env.SELECT_MALFUNCTION_SCENE);
};
export const newOrderStepSequence = [
  chooseOrRegisterAsset,
  chooseOrRegisterAssetFork,
  getRemonlineAsset,
];
