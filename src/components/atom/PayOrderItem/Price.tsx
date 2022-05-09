// components
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Checkbox, Grid, IconButton, Typography } from "@mui/material";

// types
import { FC } from "react";

// lib
import currency from "currency.js";

export const Price: FC<{
  order: any;
  position: number;
  discount?: number;
  onChange: CallableFunction;
}> = ({ order, position, discount, onChange }) => {
  if (order.type === "paid")
    return (
      <Grid container justifyContent="end" alignItems="center" textAlign="end">
        <Grid item>
          <IconButton
            color="primary"
            aria-label="mostrar pago"
            component="span"
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
    );

  const isDue = order.status === "DUE";
  const isEarn = order.type === "future" && position !== 0;
  const decPrice = currency(order.price);

  const getFinalPrice = () => {
    if (isDue) return decPrice.add(order.interest).value;
    if (isEarn) return decPrice.subtract(discount || 0).value;
    return decPrice.value;
  };
  const finalPrice = getFinalPrice();

  return (
    <Grid container justifyContent="end" alignItems="center" textAlign="end">
      <Grid item>
        <Grid container columnSpacing={1}>
          <Grid item xs={12} sm={isEarn ? 6 : 12}>
            <Typography
              variant="body2"
              color={isEarn ? "secondary" : ""}
              style={{ textDecoration: isEarn ? "line-through" : "none" }}
            >
              {decPrice.format()}
            </Typography>
          </Grid>
          {isEarn && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                {currency(finalPrice).format()}
              </Typography>
            </Grid>
          )}
        </Grid>
        {isDue && (
          <Typography variant="caption">{`Interés: ${currency(
            order.interest
          ).format()}`}</Typography>
        )}
        {isEarn && (
          <Typography variant="caption">{`Ahorras: ${currency(
            discount || 0
          ).format()}`}</Typography>
        )}
      </Grid>
      <Grid item>
        <Checkbox
          disabled={order.disableCheck}
          onChange={(_, checked) => onChange(finalPrice, checked)}
        />
      </Grid>
    </Grid>
  );
};
