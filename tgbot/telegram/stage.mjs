import { createOrderScene } from "./scenes/scene.new-order.mjs";
import { selectAssetSubscene } from "./scenes/subscenes/new-order/subscene.select-asset.mjs";
import { createRemonlineId } from "./scenes/scene.new-remonline-id.mjs";
import { editUserScene } from "./scenes/scene.user-edit-scene.mjs";
import { getOrdersScene } from "./scenes/scene.get-orders.mjs";
import { newAssetSubscene } from "./scenes/subscenes/new-order/subscene.new-asset.mjs";
import { Scenes } from "telegraf";

export const stage = new Scenes.Stage([
  createRemonlineId,
  createOrderScene,
  editUserScene,
  getOrdersScene,
  selectAssetSubscene,
  newAssetSubscene,
]);
