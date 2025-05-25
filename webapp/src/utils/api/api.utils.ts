import { HandledOrder } from "../../types/types";
import { ServiceOrder } from "../../types/ApiOrder.type";

interface getOrdersProps {
  remonline_id: number;
}
export function getQueryParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
export const getHandledOrders = async (): Promise<{
  clientsSet: Set<string>;
  orders: HandledOrder[];
}> => {
  //@ts-ignore
  const tg = window.Telegram.WebApp; // Ensure tg is defined

  if (!tg || !tg.initData) {
    return {
      clientsSet: new Set<string>(),
      orders: [] as HandledOrder[],
    };
  }

  // Step 1: Authenticate with the backend
  console.log("Sending initData for verification:", tg.initData);
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain", // As expected by your express.text() middleware
    },
    body: tg.initData,
  });

  const { orders: serviceResp } = await response.json();
  const { data: serviceOrders } = serviceResp;

  const clientsSet = new Set<string>();
  const orders: HandledOrder[] = [];
  //@ts-ignore
  serviceOrders.forEach((order: ServiceOrder) => {
    const orderData: HandledOrder = {
      id: order.id,
      client: {
        name: order.client.name,
      },
      status: { color: order.status.color, name: order.status.name },
      price: order.price,
      asset: {
        uid: order.custom_fields?.f6728287 || order.asset?.uid,
        model: `${order.asset.color} ${order.asset.brand} ${order.asset}`,
      },
    };
    orders.push(orderData);
    clientsSet.add(orderData.client.name);
  });

  return {
    clientsSet: clientsSet || new Set<string>(),
    orders: orders || [],
  };
};
// export const getHandledOrders = async ({ remonline_id }: getOrdersProps) => {
//   const response = await fetch(
//     `http://localhost:3000/api/order/${getQueryParam("remonline_id")}`,
//     {
//       method: "GET",
//     }
//   );
//   if (!response.ok) throw new Error("Failed to fetch orders");

//   const data: HandledOrder[] = await response.json();
//   console.log(data);
//   const orders: HandledOrder[] = [];
//   const clientsSet = new Set<string>();
//   //@ts-ignore
//   data.orders.data.forEach((order: ServiceOrder) => {
//     const orderData: HandledOrder = {
//       id: order.id,
//       client: {
//         name: order.client.name,
//       },
//       status: { color: order.status.color, name: order.status.name },
//       price: order.price,
//       asset: {
//         uid: order.custom_fields?.f6728287 || order.asset?.uid,
//         model: `${order.asset.color} ${order.asset.brand} ${order.asset}`,
//       },
//     };
//     // if(clientName==='all'){
//     // }
//     // if(clientName===orderData.client.name){
//     //     orders.push(orderData);
//     // }
//     orders.push(orderData);
//     clientsSet.add(orderData.client.name);
//   });
//   return { orders, clientsSet };
// };
