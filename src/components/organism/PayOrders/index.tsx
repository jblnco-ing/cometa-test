// components
import { PayOrderItem } from "components/atom/PayOrderItem";
import { PayOrderList } from "components/molecule/PayOrderList";

// types
import { FC, ReactNode } from "react";

// lib
import dayjs from "lib/dayjs";

export const PayOrders: FC<{
  orders: any[];
  onCheckedOrder: CallableFunction;
}> = ({ orders, onCheckedOrder }) => {
  const ordersPaid: ReactNode[] = [];
  const ordersOutstanding: ReactNode[] = [];
  const ordersFuture: ReactNode[] = [];

  const onChange = (num: number, checked: boolean) => {
    onCheckedOrder(num, checked);
  };

  const setInPayOrderItem = (order: any, type: string, length: number) => (
    <PayOrderItem
      key={order.id}
      order={order}
      onChange={onChange}
      type={type}
      position={length}
    />
  );

  const isSameOrAfterMonth = (date: string) =>
    dayjs().isSameOrAfter(date, "month");

  const getAndClassifyOrders = (data: any[]) => {
    for (let index = 0; index < data.length; index++) {
      if (data[index].status === "PAID") {
        ordersPaid.push(
          setInPayOrderItem(data[index], "paid", ordersPaid.length)
        );
      } else if (isSameOrAfterMonth(data[index].due)) {
        ordersOutstanding.push(
          setInPayOrderItem(
            data[index],
            "outstanding",
            ordersOutstanding.length
          )
        );
      } else
        ordersFuture.push(
          setInPayOrderItem(data[index], "future", ordersFuture.length)
        );
    }
  };

  getAndClassifyOrders(orders);

  return (
    <div>
      <PayOrderList
        Expanded={false}
        orderTypeName="Cuotas Pagadas"
        helpText="Dale click para expandir"
      >
        {ordersPaid}
      </PayOrderList>
      <PayOrderList
        Expanded={true}
        orderTypeName="Cuotas Pendientes"
        helpText="Puedes seleccionar mas de uno"
      >
        {ordersOutstanding}
      </PayOrderList>
      <PayOrderList Expanded={true} orderTypeName="Cuotas Futuras">
        {ordersFuture}
      </PayOrderList>
    </div>
  );
};
