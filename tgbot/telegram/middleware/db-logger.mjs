import {
    isUserSaved,
    saveNewUser
} from '../telegram.queries.mjs';

export async function dbLogger(ctx, next) {
    if (ctx.session.saved) {
        await next();
        return
    }
    const { message, callback_query } = ctx.update;
    const { from, text } = message || callback_query || inline_query;
    const { id, first_name, last_name, username } = from
    const result = await isUserSaved({ id })
    if (result) {
        ctx.session.saved = true
        ctx.session.remonline_id = result.remonline_id
        ctx.session.telegram_name = result.first_name

        ctx.session.branch_id = result.branch_id
        ctx.session.branch_public_name = result.branch_public_name

        await next();
        return
    }
    await saveNewUser({ id, first_name, last_name, username })
    console.log(`New user saved ${id}`)
    ctx.session.saved = true
    ctx.session.telegram_name = first_name
    await next();
    return
}