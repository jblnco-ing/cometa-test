import { useState } from "react";

// components
import { TotalPayment } from "components/molecule/TotalPayment";
import { Header } from "components/organism/Layout";
import { PayOrders } from "components/organism/PayOrders";

// types
import type { NextPage } from "next";

//services
import * as studentService from "services/student";

const Home: NextPage = ({ student, orders }: any) => {
	const [total, setTotal] = useState(0)
	
	const sumOrSubtracTotal = (num: number, sum = false) => {
		setTotal(sum ? (total + num) : (total - num))
	}
	
	return (
		<>
			<Header schoolName={student?.school.name} />
			<div>
				<TotalPayment student={student} total={total} />
			</div>
			<PayOrders orders={orders} onCheckedOrder={sumOrSubtracTotal} />
		</>
	);
};

export async function getServerSideProps() {
	const testStudentId = '3b35fb50-3d5e-41b3-96d6-c5566141fab0'
	const student = await studentService.find(testStudentId)
	const orders = await studentService.orders(testStudentId)

	return { props: { student, orders } }
}
export default Home;
