import { Markup } from "telegraf";

import { createOrder } from "../../../../../remonline/remonline.utils.mjs";
import { saveOrder,getBranchManager } from "../../../../../remonline/remonline.queries.mjs";
import { mainKeyboard } from "../../../../middleware/keyboards.mjs";

import { ua } from "../../../../../translate.mjs";

const isDataCorrentBtm = (() => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("🟢 Так", "order_is_ok"),
      Markup.button.callback("🔴 Ні", "wrong_order"),
    ],
  ]);
})();

const summarize = async (ctx) => {
  ctx.session.contactData.apointmenDate = new Date();
  ctx.session.contactData.apointmenDateString = new Date()
    .toISOString()
    .split("T")[0];

  await ctx.reply(ua.createOrder.askToVefirApointment);

  let text = "";
  text += `🚙 Авто: ${ctx.session.contactData.chosenAsset.uid}`;
  text += `\n`;
  text += `🗓 Причина: ${ctx.session.contactData.malfunctionType}`;
  if (ctx.session.contactData.malfunctionDescription) {
    text += `\n`;
    text += `🗓 Деталі: ${ctx.session.contactData.malfunctionDescription}`;
  }
  text += `\n`;
  text += `⏰ Дата: ${ctx.session.contactData.apointmenDateString}`;

  ctx.reply(text, isDataCorrentBtm);
  console.log({ cursor: ctx.wizard.cursor });
  return ctx.wizard.next();
};
const check = async (ctx) => {
  if (!ctx.update.callback_query) {
    return;
  }
  const { data } = ctx.update.callback_query;
  if (data == "wrong_order") {
    await ctx.answerCbQuery();
    await ctx.reply(ua.createOrder.tryAgainToCompletApointment);
    return ctx.scene.enter(process.env.CREATE_ORDER_SCENE);
  }

  if (data == "order_is_ok") {
    const {
      malfunctionDescription,
      malfunctionType,
      chosenAsset,
      apointmenDate,
      apointmenDateString,
    } = ctx.session.contactData;
    const { uid: plateNumber } = chosenAsset;
    const scheduledFor = new Date(apointmenDate).getTime();

    let malfunction = malfunctionType;
    if (malfunctionDescription) {
      malfunction += `. Деталі: ${malfunctionDescription}`;
    }
    const manager = await getBranchManager(ctx.session.branch_id);
    const { manager_id } = manager;
    const asset_id = 6226070;
    try {
      const { idLabel, orderId } = await createOrder({
        malfunction,
        scheduledFor,
        plateNumber,
        // telegramId: ctx.update.callback_query?.from?.id,
        remonlineId: ctx.session.remonline_id,
        branchPublicName: ctx.session.branch_public_name,
        branchId: ctx.session.branch_id,
        manager_id,
        asset_id,
      });
      console.log({ idLabel, orderId }, "order successfully created");

      await saveOrder({
        orderId,
        orderLable: idLabel,
        createdBy: ctx.update.callback_query.from.id,
        plateNumber,
        malfunction,
      });

      console.log({ idLabel, orderId }, "order successfully saved");
      let text = ua.createOrder.apointmentDone;
      text += `\n`;
      text += `\n`;
      text += `🆔 Документ: ${idLabel}`;
      text += `\n`;
      text += `\n`;
      text += `🚙 Авто: ${plateNumber}`;
      text += `\n`;
      text += `🗓  Причина: ${malfunctionType}`;
      if (malfunctionDescription) {
        text += `\n`;
        text += `🗓 Деталі: ${malfunctionDescription}`;
      }
      text += `\n`;
      text += `⏰ Дата: ${apointmenDateString}`;
      text += `\n`;
      text += ua.createOrder.apointmentWaitingApproval;
      await ctx.scene.leave();
      await ctx.answerCbQuery("👌");
      await ctx.reply(text, mainKeyboard);
      return;
    } catch (e) {
      console.error({
        message: "error while createOrder in new order scene",
        e,
      });
      await ctx.answerCbQuery(ua.errorWhileCreateOrder, { show_alert: true });
      return;
    }
  }
};
export const orderSummaryStepSequence = [summarize, check];
