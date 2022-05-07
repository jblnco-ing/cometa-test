// types
import { FC } from "react";

export const TotalPayment: FC<{ student: any; total: number}> = ({
  student,
  total,
}) => {
  return (
    <div>
      <div>
        {student.name}
        {student.grade}
      </div>
      <div>Total a pagar $ {total ? total : '--'}</div>
    </div>
  );
};
