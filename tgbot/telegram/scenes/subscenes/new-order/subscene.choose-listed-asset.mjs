import { chooseAssetTypes } from "../../../../translate.mjs";
import { stayInSpecialNewOrderSubscene } from "../../../telegram.utilities.mjs";
const stayInChooseListedAssetSubscene = stayInSpecialNewOrderSubscene({
  subSceneSet: chooseAssetTypes,
  targetSubscene: chooseAssetTypes.listMyAssets,
});
const getRemonlineAsset = async (ctx) => {
  stayInChooseListedAssetSubscene(ctx, ctx.session.chosenAssetSelectingMode);
  ctx.wizard.state.contactData.chosenAsset.licensePlate = ctx.message.text;
  console.log(ctx.wizard.state.contactData.chosenAsset);
  return ctx.wizard.next();
};

export const chooseListedAssetSubscene = [getRemonlineAsset];
