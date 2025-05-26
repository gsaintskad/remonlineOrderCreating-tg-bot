import express from 'express';
import cors from 'cors';
import {
  getOrdersViaReqParams,
  getOrdersWithTGAuth,
} from './modules/order-list.mjs';

const initAPI = async () => {
  const app = express();
  app.use(cors());
  app.get('/api/order/:remonline_id', getOrdersViaReqParams);
  app.post('/api/orders', express.text({ type: '*/*' }), getOrdersWithTGAuth);
  app.use(express.json());
  return { app };
};
export default initAPI;
