import { Markup } from 'telegraf';
import {
  ua,
  chooseAssetTypes,
  specialMessages,
} from '../../../../../translate.mjs';
import { generateUserAssetListKeyboard } from '../../../../telegram.utilities.mjs';
import { getAsset } from '../../../../../remonline/remonline.utils.mjs';

const sentFork = async (ctx) => {
  ctx.session.contactData = {};
  ctx.session.contactData.chosenAsset = {};
  const { remonline_id } = ctx.session;
  const { keyboard } = await generateUserAssetListKeyboard({
    remonline_id,
    ctx,
  });
  ctx.reply(ua.createOrder.chooseAssetSelectingMode, keyboard);
  return ctx.wizard.next();
};
const onChooseAssetSelectingMode = async (ctx) => {
  if (ctx.message.text == chooseAssetTypes.registerNewAsset) {
    return ctx.scene.enter(process.env.NEW_ASSET_SCENE);
  }

  if (ctx.session.contactData.availableAssets.includes(ctx.message.text)) {
    const licensePlate = ctx.message.text;
    console.log(ctx.session.contactData.chosenAsset);
    const {
      data: [asset],
    } = await getAsset({ params: { licensePlate } });
    const chosenAsset = { ...asset, asset_id: asset.id };
    ctx.session.contactData.chosenAsset = chosenAsset;
    return ctx.scene.enter(process.env.SELECT_MALFUNCTION_SCENE);
  }
  const { remonline_id } = ctx.session;
  const { keyboard } = await generateUserAssetListKeyboard({
    remonline_id,
    ctx,
  });
  ctx.reply(ua.createOrder.chooseAssetSelectingMode, keyboard);
  console.error('user hadnt chose asset selecting mode');
  return;
};
export const newOrderStepSequence = [sentFork, onChooseAssetSelectingMode];
