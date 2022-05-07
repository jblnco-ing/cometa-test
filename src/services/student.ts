//lib
import api from "lib/api";

export const find = async (id: string) => {
  const res = await api.get(`v1/students/${id}`);
  return await res.data;
};

export const orders = async (id: string) => {
  const res = await api.get(`v1/students/${id}/orders`);
  return await res.data;
};
