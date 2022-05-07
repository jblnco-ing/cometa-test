// types
import { FC } from "react";

//components
import { PayOrderItem } from "components/atom/PayOrderItem";
import { PayOrderList } from "components/molecule/PayOrderList";

//lib
import dayjs from 'lib/dayjs'

export const PayOrders: FC<{ orders: any[] }> = ({ orders }) => {

	const classifiedOrders: any = {
		ordersPaid: [],
		ordersOutstanding: [],
		ordersFuture: []
	}
	const setInPayOrderItem = (order: any) => <PayOrderItem key={order.id} order={order} />
	const isSameOrAfterMonth = (date: string) => dayjs().isSameOrAfter(date, 'month')

	const getAndClassifyOrders = (orders: any[]) => {
		for (let index = 0; index < orders.length; index++) {
			if (orders[index].status === 'PAID') {
				classifiedOrders.ordersPaid.push(setInPayOrderItem(orders[index]))
			} else if (isSameOrAfterMonth(orders[index].due)) {
				classifiedOrders.ordersOutstanding.push(setInPayOrderItem(orders[index]))
			} else classifiedOrders.ordersFuture.push(setInPayOrderItem(orders[index]))
		}
	}

	getAndClassifyOrders(orders)

	return (
		<div>
			<PayOrderList orderTypeName="Cuotas Pagadas">
				{classifiedOrders.ordersPaid}
			</PayOrderList>
			<PayOrderList orderTypeName="Cuotas Pendientes">
				{classifiedOrders.ordersOutstanding}
			</PayOrderList>
			<PayOrderList orderTypeName="Cuotas Futuras">
				{classifiedOrders.ordersFuture}
			</PayOrderList>
		</div>
	);
};