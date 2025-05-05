import { Scenes, Markup } from 'telegraf';
import { ua } from '../../translate.mjs';
import {
    editClient
} from '../../remonline/remonline.utils.mjs';
import {
    saveRemonlineId,
    getBranchList
} from '../telegram.queries.mjs';
import {
    leaveSceneOnCommand
} from '../middleware/start-handler.mjs';

import { listKeyboard } from '../middleware/keyboards.mjs';

const branchListObj = await getBranchList();

export const editUserScene = new Scenes.WizardScene(
    process.env.USER_EDIT_SCENE,
    async (ctx) => {
        ctx.wizard.state.userData = {};
        const branchList = branchListObj.map(b => {
            return [b.public_name]
        })
        const otherCity = branchList[0];
        branchList.shift()

        ctx.reply(ua.askCityForEdit, listKeyboard([...branchList, otherCity]));
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

        ctx.wizard.next();
        return ctx.wizard.steps[ctx.wizard.cursor](ctx);
    },
    async (ctx) => {
        if (ctx.wizard.state.userData.branch_public_name === 'Інше Місто') {
            if (ctx.message?.text?.length < 3) {
                ctx.reply(ua.createRemonlineId.cityToShort);
                return;
            }

            ctx.wizard.state.userData.branch_public_name += `: ${ctx.message.text}`;
        }

        const {
            branch_id,
            branch_public_name } = ctx.wizard.state.userData;

        await editClient({
            id: ctx.session.remonline_id,
            branchPublicName: branch_public_name
        })

        ctx.session.branch_id = branch_id
        ctx.session.branch_public_name = branch_public_name

        const { message } = ctx.update;
        const { from } = message;

        await saveRemonlineId({
            telegramId: from.id,
            remonlineId: ctx.session.remonline_id,
            branchId: branch_id,
            branchPublicName: branch_public_name
        })

        ctx.scene.leave();
        ctx.reply(ua.editDone, Markup.removeKeyboard());
        return
    }
);

editUserScene.command('start', leaveSceneOnCommand);