// types
import { FC } from "react";

//components
import { PayOrderItem } from "components/atom/PayOrderItem";
import { PayOrderList } from "components/molecule/PayOrderList";

//lib
import dayjs from 'lib/dayjs'

export const PayOrders: FC<{ orders: any[], onCheckedOrder: CallableFunction }> = ({ orders, onCheckedOrder }) => {

	const classifiedOrders: any = {
		ordersPaid: [],
		ordersOutstanding: [],
		ordersFuture: []
	}

	const onChange = (num: number, checked: boolean) => {
		onCheckedOrder(num, checked)
	}
	const setInPayOrderItem = (order: any) => <PayOrderItem key={order.id} order={order} onChange={onChange} />
	const isSameOrAfterMonth = (date: string) => dayjs().isSameOrAfter(date, 'month')

	const getAndClassifyOrders = (data: any[]) => {
		for (let index = 0; index < data.length; index++) {
			if (data[index].status === 'PAID') {
				classifiedOrders.ordersPaid.push(setInPayOrderItem(data[index]))
			} else if (isSameOrAfterMonth(data[index].due)) {
				classifiedOrders.ordersOutstanding.push(setInPayOrderItem(data[index]))
			} else classifiedOrders.ordersFuture.push(setInPayOrderItem(data[index]))
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