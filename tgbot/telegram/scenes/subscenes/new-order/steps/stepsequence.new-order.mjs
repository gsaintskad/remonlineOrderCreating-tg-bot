import { Markup } from 'telegraf';
import {
  ua,
  chooseAssetTypes,
  specialMessages,
} from '../../../../../translate.mjs';
import { generateUserAssetListKeyboard } from '../../../../telegram.utilities.mjs';
import { getAsset } from '../../../../../remonline/remonline.utils.mjs';

const chooseAssetKeyboard = (() => {
  const buttons = [
    [chooseAssetTypes.listMyAssets],
    [chooseAssetTypes.registerNewAsset],
  ];
  return Markup.keyboard(buttons).oneTime(true).resize(true);
})();

const fork = async (ctx) => {
  ctx.session.contactData = {};
  ctx.session.contactData.chosenAsset = {};
  ctx.reply(ua.createOrder.chooseAssetSelectingMode, chooseAssetKeyboard);
  return ctx.wizard.next();
};
const onChooseAssetSelectingMode = async (ctx) => {
  if (!Object.values(chooseAssetTypes).includes(ctx.message?.text)) {
    ctx.reply(ua.createOrder.chooseAssetSelectingMode, chooseAssetKeyboard);
    console.error('user hadnt chose asset selecting mode');
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
};
export const newOrderStepSequence = [fork, onChooseAssetSelectingMode];

const sendAssetKeyboard = async (ctx) => {
  console.log('trying to send asset keyboard');
  const { remonline_id } = ctx.session;
  const { code, keyboard } = await generateUserAssetListKeyboard({
    remonline_id,
  });

  ctx.reply(
    code === 404 ? 'Не знайдено ваших авто' : ua.createOrder.chooseAsset,
    keyboard
  );
  return ctx.wizard.next();
};
const getRemonlineAsset = async (ctx) => {
  if (ctx.message.text === specialMessages.turnBack) {
    return ctx.scene.enter(process.env.CREATE_ORDER_SCENE);
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

export const selectListedAssetStepSequence = [
  sendAssetKeyboard,
  getRemonlineAsset,
];
