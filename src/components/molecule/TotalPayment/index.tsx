// material ui
import { Box, Grid, Typography } from "@mui/material";

// styles
import classes from "styles/Components/totalPayment.module.scss";

// types
import { FC } from "react";

// lib
import currency from "currency.js";

export const TotalPayment: FC<{ student: any; total: number }> = ({
  student,
  total,
}) => {
  return (
    <Box className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
					<Typography variant="caption">
						{`${student.first_name} ${student.last_name}`}
					</Typography>
				</Grid>
				<Grid item xs={6} textAlign='end' >
					<Typography variant="caption">{student.cohort}</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant="body2">Total a pagar</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography variant="body2" textAlign='end'>
						{total ? currency(total).format() : "$ --"}
					</Typography>
				</Grid>
			</Grid>
    </Box>
  );
};
