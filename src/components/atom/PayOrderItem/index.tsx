// components
import { Price } from "./Price";

// types
import { FC } from "react";

// lib
import dayjs from "lib/dayjs";
import { Grid, Typography } from "@mui/material";

export const PayOrderItem: FC<{
  order: any;
  onChange: CallableFunction;
  type: string;
  position: number;
  enableCheck?: boolean;
}> = ({ order, onChange, type, position, enableCheck }) => {
  const date = dayjs(order.due).format("D [de] MMM");

  const getDateText = () => {
    if (type === "paid") return `Pagado el ${date}`;

    if (type === "future") if (position !== 0) return `Ahorra hasta el ${date}`;

    if (type === "outstanding")
      if (order.status === "DUE") return `Vencido el ${date}`;

    return `Vence el ${date}`;
  };

  return (
    <Grid container justifyContent="space-between" mb={2}>
      <Grid item>
        <Typography variant="body2">{order.name}</Typography>
        <Typography variant="caption">{getDateText()}</Typography>
      </Grid>
      <Grid item xs>
        <Price
          order={order}
          type={type}
          position={position}
          onChange={onChange}
          discount={100}
        />
      </Grid>
    </Grid>
  );
};
