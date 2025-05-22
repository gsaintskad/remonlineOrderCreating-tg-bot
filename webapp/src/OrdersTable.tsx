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
    //@ts-ignore
    const tg = window.Telegram.WebApp; // Ensure tg is defined

    const authenticateAndFetchOrders = async () => {
      if (!tg || !tg.initData) {
        setError("Telegram Web App data not available.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Step 1: Authenticate with the backend
        console.log("Sending initData for verification:", tg.initData);
        const authResponse = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain", // As expected by your express.text() middleware
          },
          body: tg.initData,
        });

        const authResult = await authResponse.json();
        setResp(authResponse); // You might want to store authResponse or authResult

        if (!authResponse.ok || !authResult.success) {
          throw new Error(authResult.error || "Authentication failed");
        }

        console.log("Authentication successful, user data:", authResult.user);
        // Optionally, you can store authResult.user in state if needed

        // Step 2: Fetch orders if authentication was successful
        const remonlineId = getQueryParam("remonline_id"); // Assuming getQueryParam is defined
        if (!remonlineId) {
          throw new Error("Remonline ID not found in query parameters.");
        }

        console.log(`Workspaceing orders for remonline_id: ${remonlineId}`);
        const ordersResponse = await fetch(`/api/order/${remonlineId}`, {
          method: "GET",
        });

        if (!ordersResponse.ok) {
          const errorData = await ordersResponse.json();
          throw new Error(errorData.error || "Failed to fetch orders");
        }

        const ordersData = await ordersResponse.json();
        console.log("Orders data received:", ordersData);

        // Process orders (ensure ordersData.orders.data exists)
        const fetchedOrders: Order[] = [];
        const clientsSet = new Set<string>();

        if (ordersData.orders && ordersData.orders.data) {
          ordersData.orders.data.forEach((order: any) => {
            // Use a more specific type for 'order' if available
            const orderDataItem: Order = {
              id: order.id,
              client: {
                name: `${order.client.first_name} ${order.client.last_name}`,
              },
              status: { color: order.status.color, name: order.status.name },
              price: order.price,
              // Ensure asset and custom_fields exist before accessing nested properties
              asset: {
                uid: order.asset?.uid || order.custom_fields?.f6728287,
                model:
                  `${order.asset?.color || ""} ${order.asset?.brand || ""} ${order.asset?.name || ""}`.trim(), // Use 'name' or similar for model description
              },
            };
            fetchedOrders.push(orderDataItem);
            clientsSet.add(orderDataItem.client.name);
          });
        } else {
          console.warn(
            "Orders data is not in the expected format:",
            ordersData
          );
        }

        setClients(clientsSet);
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Error in authenticateAndFetchOrders:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    // Assuming getQueryParam is a function you have to get URL parameters
    // e.g., const getQueryParam = (param) => new URLSearchParams(window.location.search).get(param);

    if (tg && tg.initData) {
      // Only run if tg.initData is available
      authenticateAndFetchOrders();
    } else {
      // Handle cases where tg or tg.initData might not be immediately available
      console.warn("Telegram WebApp SDK not ready or no initData.");
      // You might want to set up a listener for when the SDK is ready if it's asynchronous
      // For example, if tg.ready() is used:
      // tg.ready(); // Call this if not already called
      // Then, perhaps re-trigger or wait. For simplicity, this example assumes initData is available on load.
      setLoading(false);
      setError(
        "Telegram data not available. Ensure the app is opened within Telegram."
      );
    }
  }, [clientName]); // Keep clientName if it's used for filtering *after* fetching or other side effects.
  // If remonline_id can change and trigger a refetch, add it to dependencies.
  // If tg.initData itself could change and should trigger a refetch (unlikely for a single session),
  // you might consider adding it, but be cautious of stable references.

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
