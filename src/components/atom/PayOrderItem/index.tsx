// components
import { Price } from "./Price";
import { Grid, Typography } from "@mui/material";

// types
import { FC } from "react";

// lib
import dayjs from "lib/dayjs";

export const PayOrderItem: FC<{
  order: any;
  onChange: CallableFunction;
  position: number;
  enableCheck?: boolean;
}> = ({ order, onChange, position }) => {
  const date = dayjs(order.due).format("D [de] MMM");

  const getDateText = () => {
    if (order.type === "paid") return `Pagado el ${date}`;

    if (order.type === "future" && position !== 0)
      return `Ahorra hasta el ${date}`;

    if (order.type === "outstanding" && order.status === "DUE")
      return `Vencido el ${date}`;

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
          position={position}
          onChange={onChange}
          discount={100}
        />
      </Grid>
    </Grid>
  );
};
