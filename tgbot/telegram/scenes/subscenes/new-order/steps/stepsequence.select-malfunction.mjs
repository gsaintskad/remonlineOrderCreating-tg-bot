import { ua } from "../../../../../translate.mjs";
import { Markup } from "telegraf";

const selectMalfunction = async (ctx) => {
  if (
    !Object.values(malfunctionTypes).includes(ctx.message?.text) &&
    !ctx.wizard.state.contactData.malfunctionType
  ) {
    ctx.reply(ua.createOrder.pickMalfunctionType, malfunctionTypesKeyboard);
    return;
  }

  ctx.wizard.state.contactData.malfunctionType ??= ctx.message?.text;

  if (!ctx.message?.text) {
    ctx.reply(ua.createOrder.askMalfunction, Markup.removeKeyboard());
    return;
  }

  if (ctx.wizard.state.contactData.waitingMalfunctionDescription) {
    ctx.wizard.state.contactData.malfunctionDescription = ctx.message?.text;
  }

  if (
    !ctx.wizard.state.contactData.malfunctionDescription &&
    ctx.message?.text == malfunctionTypes.other
  ) {
    ctx.wizard.state.contactData.waitingMalfunctionDescription = true;
    ctx.reply(ua.createOrder.askMalfunction, Markup.removeKeyboard());
    return;
  }
};
export const selectMalfunctionStepSequence=[
  selectMalfunction
]