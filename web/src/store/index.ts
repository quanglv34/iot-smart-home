import create from "zustand";
import { persist } from "zustand/middleware";
import { AxiosInstance } from "../api";

type AuthStore = {
	token: String;
	user: Object | null;
};

export enum UserRole {
	ROLE_ADMIN = "ROLE_ADMIN",
	ROLE_USER = "ROLE_USER",
}

type AuthAction = {
	setToken: (token: string) => Promise<boolean>;
	removeToken: (token: string) => void;
};

const useAuthStore = create<AuthStore & AuthAction>()(
	persist(
		(set) => ({
			token: "",
			user: null,
			setToken: async (token) => {
				set((state) => ({ token: token }));
				const { data } = await AxiosInstance.get("/account");
				set((state) => ({ user: data }));
				return data;
			},
			removeToken: () => set((state) => ({ token: "" })),
		}),
		{ name: "global", getStorage: () => localStorage }
	)
);

export { useAuthStore };
