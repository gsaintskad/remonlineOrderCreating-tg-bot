import {Markup, Scenes} from "telegraf";
import {ua} from "../../translate.mjs";
import {getOrders} from "../../remonline/remonline.utils.mjs";

const webAppUrl="https://da0e-83-25-239-178.ngrok-free.app/";
export const getOrdersScene = new Scenes.WizardScene(
    process.env.GET_ORDERS_SCENE,
    async (ctx) => {
        console.log("open web_app...",ctx.session.remonline_id);
        ctx.reply(
            ua.getOrders.initText,

            Markup.inlineKeyboard([
                [Markup.button.webApp(ua.getOrders.openOrderListBtn, `${webAppUrl}/?remonline_id=${ctx.session.remonline_id}`)],
            ])
        );
        return ctx.wizard.next();
    },
    async (ctx) => {
        const response=await getOrders();
        console.log(response);
        return ctx.wizard.next();
    },
    async (ctx) => {
        const { data, from } = ctx.update?.callback_query || {}
        if(data==='open_web_app'){
            // console.log("open web_app...",            ctx.wizard.userData.remonlin_id);
            // ctx.wizard.userData.remonlin_id;
            return ctx.wizard.next();
        }
    }
)