// const tg=window.Telegram
import OrderTable from "./components/OrderTable.tsx";
import OrdersTable from "./OrdersTable.tsx";

function App() {
  return (
    <div className="flex  justify-center h-screen pt-10 scroll-auto">
      {/* <OrdersTable/> */}
      <OrderTable></OrderTable>
    </div>
  );
}

export default App;
