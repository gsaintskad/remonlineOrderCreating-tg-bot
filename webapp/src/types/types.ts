export interface HandledOrder {
  id: number;
  price: number;
  client: { name: string };
  status: { name: string; color: string };
  asset: { uid: string; model: string }; // Car Number
}
