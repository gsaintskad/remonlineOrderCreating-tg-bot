import { ua } from "../../translate.mjs"
import { mainKeyboard } from './keyboards.mjs';
import { resetRemonlineId } from "../telegram.queries.mjs";

export async function onStart(ctx, next) {
    if (ctx.session.remonline_id) {
        ctx.reply(`${ctx.session.telegram_name} ${ua.sayHi}`, mainKeyboard)
        return
    }
    ctx.scene.enter(process.env.CREATE_REMONLINE_ID);
    await next()
}

export async function onReset(ctx, next) {
    await resetRemonlineId({ telegramId: ctx.message.from.id })
    ctx.session.remonline_id = null
    ctx.session.branch_id = null
    ctx.session.branch_public_name = null
    await next()
}

export async function leaveSceneOnCommand(ctx, next) {
    if (ctx.wizard.cursor == 0) {
        return await next()
    }
    await ctx.scene.leave();
    return await onStart(ctx, next);
}
export const onGetOrders=async (ctx, next) => {
    if (!ctx.session.remonline_id) {
        ctx.reply(ua.needToRegistrate)
        return
    }
    ctx.scene.enter(process.env.GET_ORDERS_SCENE);
    await next()
}

export async function onEdit(ctx, next) {
    if (!ctx.session.remonline_id) {
        ctx.reply(ua.needToRegistrate)
        return
    }
    ctx.scene.enter(process.env.USER_EDIT_SCENE);
    await next()
}