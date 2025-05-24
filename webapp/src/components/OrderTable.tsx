"use client";

import { FunctionComponent, useMemo } from "react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { HandledOrder } from "../types/types";
import { getHandledOrders, getQueryParam } from "../utils/api/api.utils";
//@ts-ignore
const tg = window.Telegram.WebApp;
tg.expand();

interface OrderTableProps {}

const OrderTable: FunctionComponent<OrderTableProps> = () => {
  const [orders, setOrders] = useState<HandledOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("user");
  const [clientName, setClientName] = useState<string>("all");
  const [clients, setClients] = useState<Set<string>>(new Set<string>());
  const [resp, setResp] = useState<any>();

  const totalPrice = useMemo(() => {
    return orders.reduce((acc, order) => {
      return acc + order.price;
    }, 0);
  }, [orders]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { clientsSet, orders } = await getHandledOrders();
        setClients(clientsSet);
        setOrders(orders);
        console.log(orders);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [clientName]);
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
      setUsername("Mykola");
    }
  }, []);
  return (
    <div className="w-full flex flex-col px-3">
      <div className="w-full justify-between flex items-center gap-x-4 h-16">
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
      <Table>
        <TableCaption>Список ваших замовлень.</TableCaption>
        <TableHeader className="sticky">
          <TableRow>
            <TableHead className="w-[100px]">Номер</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Замовник</TableHead>
            <TableHead className="text-right">Ціна</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.asset?.uid}</TableCell>
              <TableCell className="text-left">
                <p
                  className="rounded-sm p-1  inline-block"
                  style={{ backgroundColor: order.status.color }}
                >
                  {order.status.name}
                </p>
              </TableCell>
              <TableCell>{order.client.name}</TableCell>
              <TableCell className="text-right">{order.price}₴</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{totalPrice}₴</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default OrderTable;
