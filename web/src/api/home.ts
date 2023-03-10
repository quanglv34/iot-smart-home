import { Axios } from "axios";
import { AxiosInstance } from ".";

export const fetchUserHomes = async () => {
	const { data } = await AxiosInstance.get("/homes");
	return data;
};

export const createHomeRequest = async (body) => {
	const { data } = await AxiosInstance.post("homes", body);
	return data;
};

export const deleteHomeRequest = async (id) => {
	const { data } = await AxiosInstance.delete(`homes/${id}`);
	return data;
};

export const fetchHomeRequest = async ({ queryKey }) => {
	const homeId = queryKey[1];
	const { data } = await AxiosInstance.get(`homes/${homeId}`);
	return data;
};

export const editHomeRequest = async ({params, body}) => {
	const { data } = await AxiosInstance.put(`homes/${params.homeId}`, body);
	return data;
};
