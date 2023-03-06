import create from "zustand"
import { persist } from "zustand/middleware"

type AuthStore = {
    token: String,
}

type AuthAction = {
    setToken: (token: string) => void
}

export const useAuthStore = create<AuthStore & AuthAction>() (
    persist(
        (set) => ({
            token: "",
            setToken: (token) => set((state) => ({token: token})),
        }),
        { name: "global", getStorage: () => localStorage}
    )
)