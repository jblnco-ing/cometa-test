// types
import { FC } from "react";

// lib
import currency from "currency.js";

export const TotalPayment: FC<{ student: any; total: number }> = ({
  student,
  total,
}) => {
  return (
    <div>
      <div>
        {`${student.first_name} ${student.last_name}`}
        {student.cohort}
      </div>
      <div>Total a pagar {total ? currency(total).format() : "$ --"}</div>
    </div>
  );
};
