// types
import { FC } from "react";

//components
import { Checkbox } from "@mui/material";

//lib
import dayjs from 'lib/dayjs'

export const PayOrderItem: FC<{ order: any }> = ({ order }) => {
	
	const date = dayjs(order.due).format("D [de] MMM") 
	const isDue = true
	return (
		<div>
			<div>
				<p>{order.name}</p>
				<span>{`${isDue?'Vence':'Vencido'} el ${date}`}</span>
			</div>
			<div>
				<span>{order.price}</span>
				<Checkbox />
			</div>
		</div>
	);
};