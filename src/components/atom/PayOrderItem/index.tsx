// types
import { FC } from "react";

// components
import { Price } from "./Price";

// lib
import dayjs from "lib/dayjs";

export const PayOrderItem: FC<{
  order: any;
  onChange: CallableFunction;
  type: string;
  position: number;
}> = ({ order, onChange, type, position }) => {
  const date = dayjs(order.due).format("D [de] MMM");

  const getDateText = () => {
    if (type === "paid") return `Pagado el ${date}`;

    if (type === "future") if (position !== 0) return `Ahorra hasta el ${date}`;

    if (type === "outstanding")
      if (order.status === "DUE") return `Vencido el ${date}`;

    return `Vence el ${date}`;
  };

  return (
    <div>
      <div>
        <p>{order.name}</p>
        <span>{getDateText()}</span>
      </div>
      <div>
        <Price
          order={order}
          type={type}
          position={position}
          onChange={onChange}
          discount={100}
        />
      </div>
    </div>
  );
};
