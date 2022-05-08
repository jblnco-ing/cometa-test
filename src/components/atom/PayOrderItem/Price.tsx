// types
import { FC } from "react";

// components
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Checkbox, IconButton } from "@mui/material";

// lib
import currency from "currency.js";

export const Price: FC<{
  order: any;
  type: string;
  position: number;
  discount?: number;
  onChange: CallableFunction;
}> = ({ order, type, position, discount, onChange }) => {
  if (type === "paid")
    return (
      <IconButton color="primary" aria-label="mostrar pago" component="span">
        <ArrowForwardIosIcon />
      </IconButton>
    );

  const isDue = order.status === "DUE";
  const isEarn = type === "future" && position !== 0;
  const decPrice = currency(order.price);

  const getFinalPrice = () => {
    if (isDue) return decPrice.add(order.interest).value;
    if (isEarn) return decPrice.subtract(discount || 0).value;
    return decPrice.value;
  };
  const finalPrice = getFinalPrice();

  return (
    <>
      {isEarn && <span>{currency(finalPrice).format()}</span>}
      <span>{decPrice.format()}</span>
      {isDue && <span>{`Interés: ${currency(order.interest).format()}`}</span>}
      {isEarn && <span>{`Ahorras: ${currency(discount || 0).format()}`}</span>}
      <Checkbox onChange={(_, checked) => onChange(finalPrice, checked)} />
    </>
  );
};
