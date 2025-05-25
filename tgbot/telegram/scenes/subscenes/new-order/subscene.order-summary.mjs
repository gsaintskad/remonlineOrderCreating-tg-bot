import { Scenes } from "telegraf";
import { orderSummaryStepSequence } from "./steps/stepsequence.order-summary.mjs";
export const orderSummarySubscene = new Scenes.WizardScene(
  process.env.ORDER_SUMMARY_SUBSCENE,
  ...orderSummaryStepSequence,
);
