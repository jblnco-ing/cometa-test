// components
import { PayOrderItem } from "components/atom/PayOrderItem";
import { PayOrderList } from "components/molecule/PayOrderList";
import { LinearProgress } from "@mui/material";

// types
import { FC, ReactNode } from "react";

// hook
import { useLoadOrdersStudent } from "hooks/useLoadOrdersStudent";

interface ClassifiedOrders {
  paid: ReactNode[];
  outstanding: ReactNode[];
  future: ReactNode[];
  [key: string]: ReactNode[];
}
const setInPayOrderItem = (
  order: any,
  index: number,
  position: number,
  onChange: CallableFunction
) => {
  return (
    <PayOrderItem
      key={order.id}
      order={order}
      onChange={(amount: number, checked: boolean) => {
        onChange(amount, checked, index);
      }}
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

  const classifiedOrders: ClassifiedOrders = {
    paid: [],
    outstanding: [],
    future: [],
  };

  const onChange = (amount: number, checked: boolean, index: number) => {
    onCheckedOrder(amount, checked);
    changeCheckNextAndPrevOrders(checked, index);
  };

  const distributeOrders = (data: any[]) => {
    for (let index = 0; index < data.length; index++) {
      const order = data[index];
      const type = order.type;
      const position = classifiedOrders[type].length;

      if (order.type === "outstanding" && position === 0 && !order.checked)
        order.disableCheck = false;

      classifiedOrders[type].push(
        setInPayOrderItem(order, index, position, onChange)
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
        {classifiedOrders.paid}
      </PayOrderList>
      <PayOrderList
        Expanded={true}
        orderTypeName="Cuotas Pendientes"
        helpText="Puedes seleccionar mas de uno"
      >
        {classifiedOrders.outstanding}
      </PayOrderList>
      <PayOrderList Expanded={true} orderTypeName="Cuotas Futuras">
        {classifiedOrders.future}
      </PayOrderList>
    </div>
  );
};
