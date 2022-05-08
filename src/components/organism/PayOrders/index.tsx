// components
import { PayOrderItem } from "components/atom/PayOrderItem";
import { PayOrderList } from "components/molecule/PayOrderList";

// types
import { FC, ReactNode, useEffect, useState } from "react";

// lib
import dayjs from "lib/dayjs";
import { useLoadOrdersStudent } from "hooks/useLoadOrdersStudent";
import { LinearProgress } from "@mui/material";

const setInPayOrderItem = (
  order: any,
  index: number,
  position: number,
  onChange: CallableFunction
) => {
  if (order.type === "outstanding" && position === 0 && !order.checked)
    order.disableCheck = false;
  return (
    <PayOrderItem
      key={order.id}
      order={order}
      onChange={(price: number, checked: boolean) => {
        onChange(price, checked, index);
      }}
      type={order.type}
      position={position}
    />
  );
};

export const PayOrders: FC<{
  onCheckedOrder: CallableFunction;
  studentId: string;
}> = ({ onCheckedOrder, studentId }) => {
  const { orders, changeCheckNextAndPrevOrders } =
    useLoadOrdersStudent(studentId);

  const ordersPaid: ReactNode[] = [];
  const ordersOutstanding: ReactNode[] = [];
  const ordersFuture: ReactNode[] = [];

  const onChange = (num: number, checked: boolean, index: number) => {
    onCheckedOrder(num, checked);
    changeCheckNextAndPrevOrders(checked, index);
  };

  const distributeOrders = (data: any[]) => {
    for (let index = 0; index < data.length; index++) {
      if (data[index].type === "paid")
        ordersPaid.push(
          setInPayOrderItem(data[index], index, ordersPaid.length, onChange)
        );
      if (data[index].type === "outstanding")
        ordersOutstanding.push(
          setInPayOrderItem(
            data[index],
            index,
            ordersOutstanding.length,
            onChange
          )
        );
      if (data[index].type === "future")
        ordersFuture.push(
          setInPayOrderItem(data[index], index, ordersFuture.length, onChange)
        );
    }
  };

  distributeOrders(orders);

  if (!orders)
    return (
      <>
        <div>Cargando Cuotas ...</div>
        <div>
          <LinearProgress />
        </div>
      </>
    );

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
