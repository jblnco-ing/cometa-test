//lib
import dayjs from "dayjs";

//hook
import { useEffect, useState } from "react";
import * as studentService from "services/student";

export const useLoadOrdersStudent = (studentId: string) => {
  const [orders, setOrders] = useState<any[]>([]);
  const isSameOrAfterMonth = (date: string) =>
    dayjs().isSameOrAfter(date, "month");

  const changeCheckNextAndPrevOrders = (checked: boolean, index: number) => {
    orders[index].checked = checked;
    const nextIndex = index + 1;
    const prevIndex = index - 1;
    if (nextIndex < orders.length) orders[nextIndex].disableCheck = !checked;
    if (prevIndex >= 0) orders[prevIndex].disableCheck = checked;
    setOrders([...orders]);
  };

  useEffect(() => {
    const getAndClassifyOrders = async (studentId: string) => {
      const newOrders = await studentService.getOrders(studentId);
      for (let index = 0; index < newOrders.length; index++) {
        if (newOrders[index].status === "PAID") {
          newOrders[index].type = "paid";
        } else if (isSameOrAfterMonth(newOrders[index].due)) {
          newOrders[index].type = "outstanding";
        } else newOrders[index].type = "future";
        newOrders[index].disableCheck = true;
        newOrders[index].checked = false;
      }
      setOrders(newOrders);
    };
    getAndClassifyOrders(studentId);
  }, [studentId]);

  return { orders, changeCheckNextAndPrevOrders };
};
