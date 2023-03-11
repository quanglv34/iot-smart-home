import axios, { HeadersDefaults } from "axios";
import { useAuthStore } from "../store";

const AxiosInstance = axios.create({
	baseURL: "http://192.168.1.104:3000/api/",
});

AxiosInstance.interceptors.request.use((config) => {
	const token = useAuthStore.getState().token;
	config.headers.Authorization = `Bearer ${token}`
	return config;
});

export { AxiosInstance };
export interface authenticateRequestBody {
	username: string;
	rememberMe: boolean;
	password: string;
}

export const authenticateRequest = async ({
	username,
	rememberMe,
	password,
}: authenticateRequestBody) => {
	try {
		const { data } = await AxiosInstance.post("authenticate", {
			username,
			rememberMe,
			password,
		});

		return data;
	} catch (error) {
		throw Error(error.response.data.message);
	}
};

export interface registerRequestBody {
	login: string;
	firstName: string;
	lastName: string;
	email: string;
	activated: boolean;
	langKey: string;
	authorities: Array<String>;
	password: string;
	imageUrl: string | null;
}

export const registerRequest = async (requestBody: registerRequestBody) => {
	try {
		const { data } = await AxiosInstance.post("register", requestBody);
		return data;
	} catch (error) {
		throw Error(error.response.data.message);
	}
};
