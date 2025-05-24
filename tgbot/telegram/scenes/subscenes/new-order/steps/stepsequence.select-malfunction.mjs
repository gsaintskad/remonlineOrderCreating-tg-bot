import { ua } from "../../../../../translate.mjs";
import { Markup } from "telegraf";
import { malfunctionTypes } from "../../../../../translate.mjs";

const malfunctionTypesKeyboard = (() => {
  const buttons = [
    [malfunctionTypes.chassis],
    [malfunctionTypes.electrical],
    [malfunctionTypes.bodywork],
    [malfunctionTypes.maintenance, malfunctionTypes.other],
  ];
  return Markup.keyboard(buttons).oneTime(true).resize(true);
})();
const selectMalfunction = async (ctx) => {
  if (
    !Object.values(malfunctionTypes).includes(ctx.message?.text) &&
    !ctx.session.contactData.malfunctionType
  ) {
    ctx.reply(ua.createOrder.pickMalfunctionType, malfunctionTypesKeyboard);
    return;
  }

  ctx.session.contactData.malfunctionType ??= ctx.message?.text;

  if (!ctx.message?.text) {
    ctx.reply(ua.createOrder.askMalfunction, Markup.removeKeyboard());
    return;
  }

  if (ctx.session.contactData.waitingMalfunctionDescription) {
    ctx.session.contactData.malfunctionDescription = ctx.message?.text;
  }

  if (
    !ctx.session.contactData.malfunctionDescription &&
    ctx.message?.text == malfunctionTypes.other
  ) {
    ctx.session.contactData.waitingMalfunctionDescription = true;
    ctx.reply(ua.createOrder.askMalfunction, Markup.removeKeyboard());
    return;
  }
  ctx.scene.enter(process.env.ORDER_SUMMARY_SUBSCENE);
};
export const selectMalfunctionStepSequence = [selectMalfunction];
