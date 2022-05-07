// material ui
import { Avatar, Grid, Typography } from "@mui/material";

// styles
import classes from "styles/Layout/header.module.scss";

// types
import { FC } from "react";

export const Header: FC<{ schoolName: string }> = ({ schoolName }) => {
  return (
    <Grid container columnSpacing={1} className={classes.container}>
      <Grid item>
        <Avatar className={classes.avatar}>{schoolName.charAt(0)}</Avatar>
      </Grid>
      <Grid item>
        <Typography variant="h6">{schoolName}</Typography>
      </Grid>
    </Grid>
  );
};
