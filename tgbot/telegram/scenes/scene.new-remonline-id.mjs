import { Scenes, Markup } from 'telegraf';
import { ua } from '../../translate.mjs';
import parsePhoneNumber from 'libphonenumber-js';
import * as EmailValidator from 'email-validator';
import {
    getClientsByPhone,
    createClient,
    editClient
} from '../../remonline/remonline.utils.mjs';
import {
    saveRemonlineId,
    getBranchList
} from '../telegram.queries.mjs';
import {
    onStart,
    leaveSceneOnCommand
} from '../middleware/start-handler.mjs';

import { listKeyboard } from '../middleware/keyboards.mjs';

const noEmailInlineBtm = (() => {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback('Не вказувати пошту', 'without_mail')
        ]
    ])
})()

const isDataCorrentBtm = (
    () => {
        return Markup.inlineKeyboard([
            [
                Markup.button.callback('🟢 Так', 'my_data_is_ok'),
                Markup.button.callback('🔴 Ні', 'i_put_wrong_data')
            ]
        ])
    }
)()

const userInfoAppruvalText = (userData) => {
    const { number, fullName, email, branch_public_name } = userData
    let text = ''
    text += `👤 Ім\`я: ${fullName}`
    text += `\n`;
    text += `☎️ Телефон: ${number}`

    if (email) {
        text += `\n`;
        text += `🌍 Пошта: ${email}`
    }
    text += `\n`;
    text += `🏘 Місто: ${branch_public_name}`
    return text
}

const branchListObj = await getBranchList();

export const createRemonlineId = new Scenes.WizardScene(
    process.env.CREATE_REMONLINE_ID,
    async (ctx) => {
        ctx.wizard.state.userData = {};

        const branchList = branchListObj.map(b => {
            return [b.public_name]
        })
        const otherCity = branchList[0];
        branchList.shift()

        ctx.reply(ua.createRemonlineId.askCity, listKeyboard([...branchList, otherCity]));
        return ctx.wizard.next();
    }, (ctx) => {

        const [selectedBranch] = branchListObj.filter(b => {
            return b.public_name === ctx.message?.text
        })

        if (!selectedBranch) {
            ctx.reply(ua.createRemonlineId.cityNotMatch);
            return;
        }

        const { id: branch_id, public_name } = selectedBranch
        ctx.wizard.state.userData.branch_id = branch_id
        ctx.wizard.state.userData.branch_public_name = public_name

        if (public_name == 'Інше Місто') {
            ctx.reply(ua.createRemonlineId.pickOwnCity, Markup.removeKeyboard());
            return ctx.wizard.next();
        }

        ctx.reply(ua.createRemonlineId.askFullName, Markup.removeKeyboard());
        return ctx.wizard.selectStep(3);
    },
    (ctx) => {
        if (ctx.message?.text?.length < 3) {
            ctx.reply(ua.createRemonlineId.cityToShort);
            return;
        }

        ctx.wizard.state.userData.branch_public_name += `: ${ctx.message.text}`;
        ctx.reply(ua.createRemonlineId.askFullName, Markup.removeKeyboard());
        return ctx.wizard.next();
    },
    (ctx) => {
        if (ctx.message?.text?.length < 3) {
            ctx.reply(ua.createRemonlineId.fullNameToShort);
            return;
        }
        ctx.wizard.state.userData.fullName = ctx.message?.text;
        ctx.reply(ua.createRemonlineId.askContactPhone);
        return ctx.wizard.next();
    },
    async (ctx) => {

        if (!ctx.message?.text || isNaN(ctx.message?.text)) {
            ctx.reply(ua.createRemonlineId.askCorrectPhone);
            return
        }

        const phoneNumber = parsePhoneNumber(ctx.message?.text, 'UA')

        if (phoneNumber.isValid() === false) {
            ctx.reply(ua.createRemonlineId.askCorrectPhone);
            return
        }
        const { nationalNumber, number } = phoneNumber
        ctx.wizard.state.userData.nationalNumber = nationalNumber
        ctx.wizard.state.userData.number = number

        const { clientsList, count } = await getClientsByPhone({ nationalNumber });

        if (count != 0) {
            const [client] = clientsList;
            const { name, email, id } = client;

            ctx.wizard.state.userData.note = ctx.wizard.state.userData.fullName
            ctx.wizard.state.userData.fullName = name
            ctx.wizard.state.userData.email = email
            ctx.wizard.state.userData.remonline_id = id

            await ctx.reply(ua.createRemonlineId.areYouExistingClient);
            await ctx.reply(userInfoAppruvalText(ctx.wizard.state.userData), isDataCorrentBtm);
            return ctx.wizard.selectStep(6);
        }

        ctx.reply(ua.createRemonlineId.askMail, noEmailInlineBtm);
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.update?.callback_query?.data === 'without_mail') {
            await ctx.answerCbQuery();
            await ctx.reply(ua.createRemonlineId.askToCheckContactInfo);
            await ctx.reply(userInfoAppruvalText(ctx.wizard.state.userData), isDataCorrentBtm);
            return ctx.wizard.next();
        }

        if (EmailValidator.validate(ctx.message.text) == false) {
            ctx.reply(ua.createRemonlineId.askCorrectMail, noEmailInlineBtm);
            return
        }

        ctx.wizard.state.userData.email = ctx.message?.text

        await ctx.reply(ua.createRemonlineId.askToCheckContactInfo);
        await ctx.reply(userInfoAppruvalText(ctx.wizard.state.userData), isDataCorrentBtm);
        return ctx.wizard.next();
    },
    async (ctx) => {
        const { data, from } = ctx.update?.callback_query || {}
        if (!data) {
            return
        }

        if (data === 'my_data_is_ok') {

            const {
                email,
                fullName,
                remonline_id,
                number,
                branch_id,
                branch_public_name } = ctx.wizard.state.userData;

            if (remonline_id) {
                ctx.session.remonline_id = remonline_id;
                await editClient({
                    id: remonline_id,
                    branchPublicName: branch_public_name
                })
            }

            if (!remonline_id) {

                const a = await createClient({
                    email,
                    fullName,
                    number,
                    telegramId: from.id,
                    branchPublicName: branch_public_name
                });
                console.log(`\n\n\n\n\n${JSON.stringify(a)}\n\n\n\n`);
                const { clientId }=a;
                ctx.session.remonline_id = clientId;
            }

            ctx.session.branch_id = branch_id
            ctx.session.branch_public_name = branch_public_name
            
            await saveRemonlineId({
                telegramId: from.id,
                remonlineId: ctx.session.remonline_id,
                branchId: branch_id,
                branchPublicName: branch_public_name
            })

            ctx.scene.leave();
            await ctx.answerCbQuery();
            return onStart(ctx);
        }

        if (data === 'i_put_wrong_data') {
            await ctx.answerCbQuery();
            ctx.wizard.state.userData = {};

            const branchList = branchListObj.map(b => {
                return [b.public_name]
            })
            const otherCity = branchList[0];
            branchList.shift()

            ctx.reply(ua.createRemonlineId.askCity, listKeyboard([...branchList, otherCity]));
            return ctx.wizard.selectStep(1);
        }

    }
);

createRemonlineId.command('start', leaveSceneOnCommand);