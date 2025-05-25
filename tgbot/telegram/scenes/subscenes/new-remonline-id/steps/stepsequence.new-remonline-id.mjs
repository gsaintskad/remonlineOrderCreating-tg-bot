import { Scenes, Markup } from 'telegraf';
import parsePhoneNumber from 'libphonenumber-js';
import * as EmailValidator from 'email-validator';
import {
  getClientsByPhone,
  createClient,
  editClient,
} from '../../../../../remonline/remonline.utils.mjs';
import {
  saveRemonlineId,
  getBranchList,
} from '../../../../telegram.queries.mjs';
import { ua } from '../../../../../translate.mjs';
import { listKeyboard } from '../../../../middleware/keyboards.mjs';
import { onStart } from '../../../../middleware/start-handler.mjs';

const noEmailInlineBtm = (() => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('Не вказувати пошту', 'without_mail')],
  ]);
})();

const isDataCorrentBtm = (() => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('🟢 Так', 'my_data_is_ok'),
      Markup.button.callback('🔴 Ні', 'i_put_wrong_data'),
    ],
  ]);
})();

const userInfoAppruvalText = (userData) => {
  const { number, fullName, email, branch_public_name } = userData;
  let text = '';
  text += `👤 Ім\`я: ${fullName}`;
  text += `\n`;
  text += `☎️ Телефон: ${number}`;

  if (email) {
    text += `\n`;
    text += `🌍 Пошта: ${email}`;
  }
  text += `\n`;
  text += `🏘 Місто: ${branch_public_name}`;
  return text;
};

const branchListObj = await getBranchList();

const sentCityKeyboard = async (ctx) => {
  ctx.wizard.state.userData = {};

  const branchList = branchListObj.map((b) => {
    return [b.public_name];
  });
  const otherCity = branchList[0];
  branchList.shift();
  ctx.reply(
    ua.createRemonlineId.askCity,
    listKeyboard([...branchList, otherCity])
  );
  return ctx.wizard.next();
};
const handleCityKeyboardResponse = async (ctx) => {
  const [selectedBranch] = branchListObj.filter((b) => {
    return b.public_name === ctx.message?.text;
  });

  if (!selectedBranch) {
    ctx.reply(ua.createRemonlineId.cityNotMatch);
    return;
  }

  const { id: branch_id, public_name } = selectedBranch;
  ctx.wizard.state.userData.branch_id = branch_id;
  ctx.wizard.state.userData.branch_public_name = public_name;

  if (public_name === 'Інше місто') {
    ctx.reply(ua.createRemonlineId.pickOwnCity, Markup.removeKeyboard());
    return ctx.wizard.next();
  }

  ctx.reply(ua.createRemonlineId.askFullName, Markup.removeKeyboard());
  return ctx.wizard.selectStep(3);
};
const anotherCityCaseHandler = async (ctx) => {
  if (ctx.message?.text?.length < 3) {
    ctx.reply(ua.createRemonlineId.cityToShort);
    return;
  }

  ctx.wizard.state.userData.branch_public_name += `: ${ctx.message.text}`;
  ctx.reply(ua.createRemonlineId.askFullName, Markup.removeKeyboard());
  return ctx.wizard.next();
};

const handleFullNameAndAskContact = async (ctx) => {
  if (ctx.message?.text?.length < 3) {
    ctx.reply(ua.createRemonlineId.fullNameToShort);
    return;
  }
  ctx.wizard.state.userData.fullName = ctx.message?.text;
  await ctx.reply(
    ua.createRemonlineId.askContactPhone,
    Markup.keyboard([
      Markup.button.contactRequest(
        ua.createRemonlineId.sharePhoneNumberButtonText
      ),
    ])
      .resize()
      .oneTime() // oneTime() makes the keyboard disappear after a button is pressed
  );
  return ctx.wizard.next();
};
const handleContact = async (ctx) => {
  let phoneNumberString;
  let sharedViaButton = false;

  if (ctx.message?.contact) {
    phoneNumberString = ctx.message.contact.phone_number;
    console.log(ctx.message.contact);
    if (!ctx.wizard.state.userData.fullName && ctx.message.contact.first_name) {
      ctx.wizard.state.userData.fullName = ctx.message.contact.first_name;
      if (ctx.message.contact.last_name) {
        ctx.wizard.state.userData.fullName += ` ${ctx.message.contact.last_name}`;
      }
    }
    sharedViaButton = true;
  } else {
    ctx.reply(
      ua.createRemonlineId.askCorrectContact,
      Markup.keyboard([
        Markup.button.contactRequest(
          ua.createRemonlineId.sharePhoneNumberButtonText
        ),
      ])
        .resize()
        .oneTime()
    );
    return;
  }
  const isUkrainianNumber = phoneNumberString.startsWith('380');
  const isPolishNumber = phoneNumberString.startsWith('48');
  if (!isUkrainianNumber && !isPolishNumber) {
    ctx.reply(ua.createRemonlineId.askCorrectPhone);
    return;
  }
  let phoneNumber;
  if (isUkrainianNumber)
    phoneNumber = parsePhoneNumber(phoneNumberString, 'UA');
  if (isPolishNumber) phoneNumber = parsePhoneNumber(phoneNumberString, 'PL');
  if (!phoneNumber || !phoneNumber.isValid()) {
    // Added !phoneNumber for safety
    ctx.reply(
      ua.createRemonlineId.askCorrectPhone,
      Markup.keyboard([
        // Re-prompt with the button on invalid input
        Markup.button.contactRequest(
          ua.createRemonlineId.sharePhoneNumberButtonText
        ),
      ])
        .resize()
        .oneTime()
    );
    return;
  }

  // If phone is valid, ensure reply keyboard is removed before next prompt
  // (especially if the next prompt uses an inline keyboard or no keyboard)
  if (sharedViaButton) {
    await ctx.reply(
      ua.createRemonlineId.thankYouForSharingPhone,
      Markup.removeKeyboard()
    );
  } else {
    // If typed, and we are certain the oneTime keyboard might still be an issue
    // or if no specific confirmation message for typed numbers,
    // we could just ensure it's removed before the *next* prompt
    // For now, assume oneTime() and subsequent replies handle it.
    // If issues persist, an explicit Markup.removeKeyboard() can be sent here.
  }

  const { nationalNumber, number } = phoneNumber;
  ctx.wizard.state.userData.nationalNumber = nationalNumber;
  ctx.wizard.state.userData.number = number;

  const { clientsList, count } = await getClientsByPhone({ nationalNumber });

  if (count != 0) {
    const [client] = clientsList;
    const { name, email, id } = client;

    if (ctx.wizard.state.userData.fullName !== name) {
      ctx.wizard.state.userData.note = `Telegram name: ${ctx.wizard.state.userData.fullName}`;
    }
    ctx.wizard.state.userData.fullName = name; // Use RemOnline name
    ctx.wizard.state.userData.email = email;
    ctx.wizard.state.userData.remonline_id = id;

    await ctx.reply(
      ua.createRemonlineId.areYouExistingClient,
      Markup.removeKeyboard()
    );
    await ctx.reply(
      userInfoAppruvalText(ctx.wizard.state.userData),
      isDataCorrentBtm
    );
    return ctx.wizard.selectStep(6);
  }
  await ctx.reply(ua.createRemonlineId.askMail, {
    ...(noEmailInlineBtm.reply_markup
      ? noEmailInlineBtm
      : { reply_markup: noEmailInlineBtm }),
    ...Markup.removeKeyboard(),
  });
  return ctx.wizard.next();
};
const failedVerificationHandler = async (ctx) => {
  if (ctx.update?.callback_query?.data === 'without_mail') {
    await ctx.answerCbQuery();
    await ctx.reply(ua.createRemonlineId.askToCheckContactInfo);
    await ctx.reply(
      userInfoAppruvalText(ctx.wizard.state.userData),
      isDataCorrentBtm
    );
    return ctx.wizard.next();
  }

  if (EmailValidator.validate(ctx.message.text) == false) {
    ctx.reply(ua.createRemonlineId.askCorrectMail, noEmailInlineBtm);
    return;
  }

  ctx.wizard.state.userData.email = ctx.message?.text;

  await ctx.reply(ua.createRemonlineId.askToCheckContactInfo);
  await ctx.reply(
    userInfoAppruvalText(ctx.wizard.state.userData),
    isDataCorrentBtm
  );
  return ctx.wizard.next();
};
const successfullVerificationHandler = async (ctx) => {
  const { data, from } = ctx.update?.callback_query || {};
  if (!data) {
    return;
  }

  if (data === 'my_data_is_ok') {
    const {
      email,
      fullName,
      remonline_id,
      number,
      branch_id,
      branch_public_name,
    } = ctx.wizard.state.userData;

    if (remonline_id) {
      ctx.session.remonline_id = remonline_id;
      await editClient({
        id: remonline_id,
        branchPublicName: branch_public_name,
      });
    }

    if (!remonline_id) {
      const a = await createClient({
        email,
        fullName,
        number,
        telegramId: from.id,
        branchPublicName: branch_public_name,
      });
      const { clientId } = a;
      ctx.session.remonline_id = clientId;
    }

    ctx.session.branch_id = branch_id;
    ctx.session.branch_public_name = branch_public_name;

    await saveRemonlineId({
      telegramId: from.id,
      remonlineId: ctx.session.remonline_id,
      branchId: branch_id,
      branchPublicName: branch_public_name,
    });

    ctx.scene.leave();
    await ctx.answerCbQuery();
    return onStart(ctx);
  }

  if (data === 'i_put_wrong_data') {
    await ctx.answerCbQuery();
    ctx.wizard.state.userData = {};

    const branchList = branchListObj.map((b) => {
      return [b.public_name];
    });
    const otherCity = branchList[0];
    branchList.shift();

    ctx.reply(
      ua.createRemonlineId.askCity,
      listKeyboard([...branchList, otherCity])
    );
    return ctx.wizard.selectStep(1);
  }
};
export const newRemonlineIdStepSequence = [
  sentCityKeyboard,
  handleCityKeyboardResponse,
  anotherCityCaseHandler,
  handleFullNameAndAskContact,
  handleContact,
  failedVerificationHandler,
  successfullVerificationHandler,
];
