import { keyboardText } from "../../translate.mjs";
import { Markup } from "telegraf";

export const mainKeyboard = (() => {
  const buttons = [[keyboardText.newAppointment]];
  return Markup.keyboard(buttons).oneTime(true).resize(true);
})();

export const listKeyboard = (buttons) => {
  return Markup.keyboard(buttons).oneTime(false).resize(true);
};
const nextKeyborad = (() => {
  const buttons = [["Далі", "Назад"]];
  return Markup.keyboard(buttons).oneTime(true).resize(true);
})();
export const turnBackKeyboard=(()=>{
    const buttons = [["Повернутися назад"]];
  return Markup.keyboard(buttons).oneTime(true).resize(true);

})()