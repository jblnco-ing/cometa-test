// types
import { FC } from "react";

// components
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Checkbox, Grid, IconButton, Typography } from "@mui/material";

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
		<Grid container>
			<Grid item>
				{isEarn && <Typography>{currency(finalPrice).format()}</Typography>}
				<Typography variant="body2" >{decPrice.format()}</Typography>
				{isDue && <Typography variant="caption" >{`Interés: ${currency(order.interest).format()}`}</Typography>}
				{isEarn && <Typography variant="caption">{`Ahorras: ${currency(discount || 0).format()}`}</Typography>}
			</Grid>
			<Grid item>
      	<Checkbox onChange={(_, checked) => onChange(finalPrice, checked)} />
			</Grid>
		</Grid>
    </>
  );
};
