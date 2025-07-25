import { specialMessages } from '../../../../../translate.mjs';
import { ua } from '../../../../../translate.mjs';
import { generateUserAssetListKeyboard } from '../../../../telegram.utilities.mjs';
import { getAsset } from '../../../../../remonline/remonline.utils.mjs';

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
