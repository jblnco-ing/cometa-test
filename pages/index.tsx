// main tools
import { useState } from "react";

// components
import { TotalPayment } from "components/molecule/TotalPayment";
import { Header } from "components/organism/Layout";
import { PayOrders } from "components/organism/PayOrders";

// material
import { Container } from "@mui/material";
import Fab from "@mui/material/Fab";

// styles
import classes from "styles/Home/homePage.module.scss";

// types
import type { NextPage } from "next";

// services
import * as studentService from "services/student";

// lib
import currency from "currency.js";

const Home: NextPage = ({ student, orders }: any) => {
  const [total, setTotal] = useState(0);

  const sumOrSubtracTotal = (num: number, isSum = false) => {
    setTotal(
      isSum
        ? currency(total).add(num).value
        : currency(total).subtract(num).value
    );
  };

  return (
    <>
      <Header schoolName={student?.school.name} />
      <Container maxWidth="sm">
        <div className={classes.col}>
          <TotalPayment student={student} total={total} />
        </div>
        <div className={classes.col}>
          <PayOrders studentId={student.id} onCheckedOrder={sumOrSubtracTotal} />
        </div>
      </Container>
      <Container maxWidth="sm" className={classes.container}>
        {!!total && (
          <Fab className={classes.fab} variant="extended">
            IR A PAGAR
          </Fab>
        )}
      </Container>
    </>
  );
};

export async function getServerSideProps() {
  const testStudentId = "3b35fb50-3d5e-41b3-96d6-c5566141fab0";
  const student = await studentService.find(testStudentId);

  return { props: { student } };
}
export default Home;
