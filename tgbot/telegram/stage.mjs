import { createOrderScene } from "./telegram/scenes/scene.new-order.mjs";
import { selectAssetSubscene } from "./telegram/scenes/subscenes/new-order/subscene.select-asset.mjs";
import { createRemonlineId } from "./telegram/scenes/scene.new-remonline-id.mjs";
import { editUserScene } from "./telegram/scenes/scene.user-edit-scene.mjs";
import { getOrdersScene } from "./telegram/scenes/scene.get-orders.mjs";
import { newAssetSubscene } from "./telegram/scenes/subscenes/new-order/subscene.new-asset.mjs";
import { Scenes } from "telegraf";

export const stage = new Scenes.Stage([
  createRemonlineId,
  createOrderScene,
  editUserScene,
  getOrdersScene,
  selectAssetSubscene,
  newAssetSubscene,
]);
