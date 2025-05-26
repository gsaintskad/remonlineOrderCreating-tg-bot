import express from 'express';
import {
  getOrdersViaReqParams,
  getOrdersWithTGAuth,
} from './modules/order-list.mjs';

const initAPI = ({ app }) => {
  app.get('/api/order/:remonline_id', getOrdersViaReqParams);
  app.post('/api/orders', express.text({ type: '*/*' }), getOrdersWithTGAuth);
};
export default initAPI;
