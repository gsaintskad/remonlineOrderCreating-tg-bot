import { createOrderScene } from "./scenes/scene.new-order.mjs";
import { selectAssetSubscene } from "./scenes/subscenes/new-order/subscene.select-asset.mjs";
import { createRemonlineId } from "./scenes/scene.new-remonline-id.mjs";
import { editUserScene } from "./scenes/scene.user-edit-scene.mjs";
import { getOrdersScene } from "./scenes/scene.get-orders.mjs";
import { newAssetSubscene } from "./scenes/subscenes/new-order/subscene.new-asset.mjs";
import { Scenes } from "telegraf";
import { selectMalfunctionSubscene } from "./scenes/subscenes/new-order/subscene.select-malfunction.mjs";

const mainScenes = [
  createRemonlineId,
  createOrderScene,
  editUserScene,
  getOrdersScene,
];
const subscenes = [
  selectAssetSubscene,
  newAssetSubscene,
  selectMalfunctionSubscene,
];

export const stage = new Scenes.Stage([...mainScenes, ...subscenes]);
