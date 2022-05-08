// components
import { PayOrderItem } from "components/atom/PayOrderItem";
import { PayOrderList } from "components/molecule/PayOrderList";

// types
import { FC, ReactNode, useEffect, useState } from "react";

// lib
import dayjs from "lib/dayjs";
import * as studentService from "services/student";

export const PayOrders: FC<{
  onCheckedOrder: CallableFunction;
  studentId: string;
}> = ({ onCheckedOrder, studentId }) => {
  const ordersPaid: ReactNode[] = [];
  const ordersOutstanding: ReactNode[] = [];
  const ordersFuture: ReactNode[] = [];

  const [orders, setOrders] = useState<any[]>([]);

  const getAndClassifyOrders = async (studentId:string) => {
    const newOrders = await studentService.getOrders(studentId);
    for (let index = 0; index < newOrders.length; index++) {
      if (newOrders[index].status === "PAID") {
        newOrders[index].type = "paid";
      } else if (isSameOrAfterMonth(newOrders[index].due)) {
        newOrders[index].type = "outstanding";
      } else newOrders[index].type = "future";
      newOrders[index].disableCheck = true;
      newOrders[index].checked = false;
    }
    setOrders(newOrders);
  };

  const onChange = (num: number, checked: boolean, index: number) => {
    onCheckedOrder(num, checked);
    changeCheckNextAndPrevOrders(checked, index);
  };

  const changeCheckNextAndPrevOrders = (checked: boolean, index: number) => {
    orders[index].checked = checked;
    const nextIndex = index + 1;
    const prevIndex = index - 1;
    if (nextIndex < orders.length) orders[nextIndex].disableCheck = !checked;
    if (prevIndex >= 0) orders[prevIndex].disableCheck = checked;
    setOrders([...orders]);
  };

  const setInPayOrderItem = (order: any, index: number, length: number) => {
    if (order.type === "outstanding" && length === 0 && !order.checked)
      order.disableCheck = false;
    return (
      <PayOrderItem
        key={order.id}
        order={order}
        onChange={(num: number, checked: boolean) => {
          onChange(num, checked, index);
        }}
        type={order.type}
        position={length}
      />
    );
  };

  const isSameOrAfterMonth = (date: string) =>
    dayjs().isSameOrAfter(date, "month");

  const distributeOrders = (data: any[]) => {
    for (let index = 0; index < data.length; index++) {
      if (data[index].type === "paid")
        ordersPaid.push(
          setInPayOrderItem(data[index], index, ordersPaid.length)
        );
      if (data[index].type === "outstanding")
        ordersOutstanding.push(
          setInPayOrderItem(data[index], index, ordersOutstanding.length)
        );
      if (data[index].type === "future")
        ordersFuture.push(
          setInPayOrderItem(data[index], index, ordersFuture.length)
        );
    }
  };

  useEffect(() => {
    getAndClassifyOrders(studentId);
  }, []);

  distributeOrders(orders);

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
