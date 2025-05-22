"use client";

import { useEffect, useState } from "react";

interface Order {
  id: number;
  price: number;
  client: { name: string };
  status: { name: string; color: string };
  asset: { uid: string; model: string }; // Car Number
}
//@ts-ignore
const tg = window.Telegram.WebApp;
tg.expand();
console.log({ tg });
function getQueryParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// // Retrieve remonline_id when the Mini App opens
// const remonlineId = getQueryParam("remonline_id");

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("boba");
  const [clientName, setClientName] = useState<string>("all");
  const [clients, setClients] = useState<Set<string>>(new Set<string>());
  const [resp, setResp] = useState<any>();

  useEffect(() => {
    const tg = window.Telegram.WebApp;

    const authenticateAndFetchOrders = async () => {
      if (!tg || !tg.initData) {
        setError("Telegram Web App data not available.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log(
          "Sending initData for verification and order fetching:",
          tg.initData
        );
        const response = await fetch("/api/orders", {
          // Эндпоинт остается тот же
          method: "POST",
          headers: {
            "Content-Type": "text/plain", // Отправляем initData как обычный текст
          },
          body: tg.initData, // Тело запроса - это сама строка initData
        });

        setResp(response); // Сохраняем объект Response

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || "Authentication or order fetching failed"
          );
        }

        console.log(
          "Authentication successful, user data from server:",
          result.user
        );
        console.log("Orders data received directly:", result.orders);

        // Обработка заказов из result.orders
        const fetchedOrders: Order[] = [];
        const clientsSet = new Set<string>();

        if (result.orders && result.orders.data) {
          result.orders.data.forEach((order: any) => {
            // Уточните тип 'order', если возможно
            const orderDataItem: Order = {
              id: order.id,
              client: {
                name: `${order.client.first_name} ${order.client.last_name}`,
              },
              status: { color: order.status.color, name: order.status.name },
              price: order.price,
              asset: {
                uid: order.asset?.uid || order.custom_fields?.f6728287,
                model:
                  `${order.asset?.color || ""} ${order.asset?.brand || ""} ${order.asset?.name || ""}`.trim(),
              },
            };
            fetchedOrders.push(orderDataItem);
            clientsSet.add(orderDataItem.client.name);
          });
        } else {
          console.warn(
            "Orders data is not in the expected format or missing in the response:",
            result.orders
          );
          if (
            result.message === "User authenticated, but failed to fetch orders."
          ) {
            setError(
              "Не удалось загрузить заказы, хотя аутентификация прошла успешно."
            );
          } else if (!result.orders) {
            console.log("Нет заказов для отображения.");
          }
        }

        setClients(clientsSet);
        setOrders(fetchedOrders);
        // setUser(result.user); // Если нужно сохранить данные пользователя
      } catch (err) {
        console.error("Error in authenticateAndFetchOrders:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    if (tg && tg.initData) {
      authenticateAndFetchOrders();
    } else {
      console.warn("Telegram WebApp SDK not ready or no initData.");
      setLoading(false);
      setError(
        "Telegram data not available. Ensure the app is opened within Telegram."
      );
    }
  }, [clientName]); // Зависимость clientName остается, если она используется для фильтрации или других действий *после* загрузки.
  // Если remonline_id (теперь это telegram_id) был основной причиной для перезапуска эффекта,
  // и он не меняется в течение сессии Mini App, то его не нужно было бы включать в зависимости.
  // tg.initData обычно стабилен.
  useEffect(() => {
    //@ts-ignore
    const tg = window.Telegram.WebApp;
    tg.expand(); // Optional: Expands the Web App to full screen

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
      setUsername(
        `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`
      );
    } else {
      console.log("User data is not available");
      setUsername("boba");
    }
  }, []);

  if (loading)
    return <p className="text-center text-lg font-medium">Loading orders...</p>;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen  flex-col">
        <div className="w-full justify-between flex">
          <h2 className="text-2xl text-blue-600 font-semibold mb-4 text-center">
            hey, {username})
          </h2>

          <button
            onClick={() => window.location.reload()}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Refresh Orders
          </button>
        </div>
        <p className="text-center text-red-500">
          Error: {error}
          Скорее всего нужно поднять сервер:(
        </p>
        <p>{JSON.stringify(resp)}</p>
      </div>
    );

  return (
    <div className="p-6 mx-auto max-w-5xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Orders List</h2>

      <div className="w-full justify-between flex">
        <h2 className="text-2xl text-blue-600 font-semibold mb-4 text-center">
          hey, {username})
        </h2>
        {/*<div>*/}

        {/*    <label className="text-lg font-medium">Filter by Client:</label>*/}
        {/*    <select*/}
        {/*        value={clientName}*/}
        {/*        onChange={(e) => setClientName(e.target.value)}*/}
        {/*        className="px-3 py-2 rounded-md border bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500"*/}
        {/*    >*/}
        {/*        {Array.from(clients).map((client) => (*/}
        {/*            <option key={client} value={client}>{client}</option>*/}
        {/*        ))}*/}
        {/*    </select>*/}
        {/*</div>*/}
        <button
          onClick={() => window.location.reload()}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Refresh Orders
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border shadow-md">
        <table className="w-full border-collapse bg-white">
          {/* Table Header */}
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Order Status</th>
              <th className="py-3 px-6 text-left">Car Number</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-700 text-sm font-light">
            {orders.map((order, index) => (
              // index<15&&
              <tr
                key={order.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-6">{order.id}</td>
                <td className="py-3 px-6">{order.price}</td>
                <td className="py-3 px-6">{order.client.name}</td>
                <td className="py-3 px-6">
                  <span
                    className="px-3 py-1 rounded-full text-white text-xs"
                    style={{ backgroundColor: order.status.color }}
                  >
                    {order.status.name}
                  </span>
                </td>
                <td className="py-3 px-6">
                  {order.asset.uid}
                  {/*{order.asset.model}*/}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
