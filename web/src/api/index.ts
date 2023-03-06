import axios, { HeadersDefaults } from "axios";
import { useAuthStore } from "../store";
const api = axios.create({
	baseURL: "http://localhost:3000/api/",
});

 interface CommonHeaderProperties extends HeadersDefaults {
	Authorization: string;
 }

api.interceptors.request.use((config) => {
	const token = useAuthStore.getState().token;
	config.headers.Authorization = `Bearer ${token}`
	return config;
});

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
		const { data } = await api.post("authenticate", {
			username,
			rememberMe,
			password,
		})
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
		const { data } = await api.post("register");
		return data;
	} catch (error) {
		throw Error(error.response.data.message);
	}
};