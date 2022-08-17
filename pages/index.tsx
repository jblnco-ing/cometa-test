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

const Home: NextPage = () => {
  

  return (
    <>
      <Header schoolName='Pepe' />
      <Container maxWidth="sm">
        <div className={classes.col}>
          QUE hace
        </div>
        <div className={classes.col}>
          HOLa
        </div>
      </Container>
      <Container maxWidth="sm" className={classes.container}>
          <Fab className={classes.fab} variant="extended">
            IR A PAGAR
          </Fab>
      </Container>
    </>
  );
};

export default Home;
