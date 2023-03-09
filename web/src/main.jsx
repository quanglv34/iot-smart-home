import {
	QueryClient, QueryClientProvider
} from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import {
	createBrowserRouter,
	redirect,
	RouterProvider
} from "react-router-dom"
import "./index.css"

import AdminLayout from "./layouts/AdminLayout"
import AppLayout from "./layouts/AppLayout"
import AccountPage from "./pages/AccountPage"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminUserListPage from "./pages/admin/AdminUserListPage"
import AllDevices from "./pages/AllDevices"
import Error from "./pages/Error"
import HomeListHomes from "./pages/HomeListHomes"
import HomePage from "./pages/HomePage"
import HomeViewHome from "./pages/HomeViewHome"
import LoginPage from "./pages/LoginPage"
import MyDevices from "./pages/MyDevices"
import RegisterPage from "./pages/RegisterPage"
import { useAuthStore } from "./store"

const queryClient = new QueryClient()
const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Error />,
		element: <HomePage />,
	},
	{
		path: "/admin",
		errorElement: <Error />,
		element: <AdminLayout />,
		children: [
			{
				path: "/admin",
				element: <AdminDashboard />,
			},
			{
				path: "/admin/users",
				element: <AdminUserListPage />,
			},
		],
	},
	{
		path: "/app",
		loader: () => {
			if (!useAuthStore.getState().token) return redirect("/");
			return null;
		},
		errorElement: <Error />,
		element: <AppLayout />,
		children: [
			{
				path: "/app/homes",
				children: [
					{
						path: "/app/homes",
						element: <HomeListHomes />,
					},
					{
						path: "/app/homes/:homeId",
						element: <HomeViewHome />,
					},
				],
			},
			{
				path: "/app/account",
				element: <AccountPage />,
			},
			{
				path: "/app/devices",
				element: <AllDevices />,
			},
			{
				path: "/app/devices/my-devices",
				element: <MyDevices />,
			},
		],
	},
	{
		path: "/login",
		errorElement: <Error />,
		element: <LoginPage />,
		loader: () => {
			if (useAuthStore.getState().token) return redirect("/app");
			return null;
		},
	},
	{
		path: "/logout",
		errorElement: <Error />,
		element: <LoginPage />,
		loader: () => {
			useAuthStore.getState().removeToken();
			return redirect("/login");
		},
	},
	{
		path: "/register",
		errorElement: <Error />,
		element: <RegisterPage />,
	},
	{
		path: "/403",
		element: <Error message={"Your are not allowed to go to this page."} />,
	},
	{
		path: "*",
		element: <Error />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
)
