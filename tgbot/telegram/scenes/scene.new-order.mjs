import { Scenes, Markup } from "telegraf";
import { ua, malfunctionTypes, chooseAssetTypes } from "../../translate.mjs";
import { mainKeyboard } from "../middleware/keyboards.mjs";
import { createOrder } from "../../remonline/remonline.utils.mjs";
import { leaveSceneOnCommand } from "../middleware/start-handler.mjs";
import {
  saveOrder,
  getBranchManager,
} from "../../remonline/remonline.queries.mjs";
import { generateUserAssetListKeyboard } from "../telegram.utilities.mjs";
import { chooseListedAssetSubscene } from "./subscenes/new-order/subscene.choose-listed-asset.mjs";
import { registerNewAssetSubScene } from "./subscenes/new-order/subscene.new-asset.mjs";

const isDataCorrentBtm = (() => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("🟢 Так", "order_is_ok"),
      Markup.button.callback("🔴 Ні", "wrong_order"),
    ],
  ]);
})();

const malfunctionTypesKeyboard = (() => {
  const buttons = [
    [malfunctionTypes.chassis],
    [malfunctionTypes.electrical],
    [malfunctionTypes.bodywork],
    [malfunctionTypes.maintenance, malfunctionTypes.other],
  ];
  return Markup.keyboard(buttons).oneTime(true).resize(true);
})();
const chooseAssetKeyboard = (() => {
  const buttons = [
    [chooseAssetTypes.listMyAssets],
    [chooseAssetTypes.registerNewAsset],
  ];
  return Markup.keyboard(buttons).oneTime(true).resize(true);
})();

export const createOrderScene = new Scenes.WizardScene(
  process.env.CREATE_ORDER_SCENE,
  async (ctx) => {
    ctx.wizard.state.contactData = {};
    ctx.wizard.state.contactData.chosenAsset = {};
    ctx.reply(ua.createOrder.chooseAssetSelectingMode, chooseAssetKeyboard);
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (
      !Object.values(chooseAssetTypes).includes(ctx.message?.text) &&
      !ctx.wizard.state.contactData.chosenAsset
    ) {
      ctx.reply(ua.createOrder.chooseAssetSelectingMode, chooseAssetKeyboard);
      console.error('user hadnt chose asset selecting mode')
      return;
    }
    ctx.session.chosenAssetSelectingMode = ctx.message.text;
    const remonline_id = ctx.session.remonline_id;
    if (
      ctx.session.chosenAssetSelectingMode === chooseAssetTypes.listMyAssets
    ) {
      const keyboard = await generateUserAssetListKeyboard({ remonline_id });
      ctx.reply(ua.createOrder.chooseAsset, keyboard);
      return ctx.wizard.next();
    } else if (
      ctx.session.chosenAssetSelectingMode ===
      chooseAssetTypes.registerExistingAssetByLicensePlate
    ) {
      //////////////
    } else {
      ctx.reply(ua.createOrder.chooseAssetSelectingMode, chooseAssetKeyboard);
      return;
    }
  },
  ...chooseListedAssetSubscene,
  ...registerNewAssetSubScene,
  async (ctx) => {
    if (
      !Object.values(chooseAssetTypes).includes(ctx.message?.text) &&
      !ctx.wizard.state.contactData.chosenAsset
    ) {
      ctx.reply(ua.createOrder.chooseAssetSelectingMode, chooseAssetKeyboard);
      return;
    }
    ctx.reply(ua.createOrder.pickMalfunctionType, malfunctionTypesKeyboard);
    return ctx.wizard.next();
  },
  async (ctx) => {
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

    ctx.wizard.state.contactData.apointmenDate = new Date();
    ctx.wizard.state.contactData.apointmenDateString = new Date()
      .toISOString()
      .split("T")[0];

    await ctx.reply(ua.createOrder.askToVefirApointment);

    let text = "";
    text += `🚙 Авто: ${ctx.wizard.state.contactData.plateNumber}`;
    text += `\n`;
    text += `🗓 Причина: ${ctx.wizard.state.contactData.malfunctionType}`;
    if (ctx.wizard.state.contactData.malfunctionDescription) {
      text += `\n`;
      text += `🗓 Деталі: ${ctx.wizard.state.contactData.malfunctionDescription}`;
    }
    text += `\n`;
    text += `⏰ Дата: ${ctx.wizard.state.contactData.apointmenDateString}`;

    ctx.reply(text, isDataCorrentBtm);
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!ctx.update.callback_query) {
      return;
    }
    const { data } = ctx.update.callback_query;
    if (data == "wrong_order") {
      await ctx.answerCbQuery();
      await ctx.reply(ua.createOrder.tryAgainToCompletApointment);
      ctx.wizard.selectStep(1);
      return;
    }

    if (data == "order_is_ok") {
      const {
        malfunctionDescription,
        malfunctionType,
        plateNumber,
        apointmenDate,
        apointmenDateString,
      } = ctx.wizard.state.contactData;
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
  }
);

createOrderScene.command("start", leaveSceneOnCommand);
