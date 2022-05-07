import apiService from "./api";

export const find = async (id:string) => {
	const res = await apiService.get(`v1/students/${id}`)
	return await res.data
};

export const orders = async (id:string) => {
	const res = await apiService.get(`v1/students/${id}/orders`)
	return await res.data
};
