// types
import { FC } from "react";

export const TotalPayment: FC<{ student: any; total: number}> = ({
  student,
  total,
}) => {
  return (
    <div>
      <div>
        {`${student.first_name} ${student.last_name}`}
        {student.cohort}
      </div>
      <div>Total a pagar $ {total || '--'}</div>
    </div>
  );
};
