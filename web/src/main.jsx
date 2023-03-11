import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from "react-router-dom";
import "./index.css";

import AdminLayout from "./layouts/AdminLayout";
import AppLayout from "./layouts/AppLayout";
import AccountPage from "./pages/AccountPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUserListPage from "./pages/admin/AdminUserListPage";
import AppHomePage from "./pages/AppHomePage";
import AppError from "./pages/AppError";
import HomeListHomes from "./pages/HomeListHomes";
import HomeViewHome from "./pages/HomeViewHome";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuthStore } from "./store";
import RoomViewRoom from "./pages/RoomViewRoom";

const queryClient = new QueryClient();
const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <AppError />,
		element: <AppHomePage />,
	},
	{
		path: "/admin",
		errorElement: <AppError />,
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
		errorElement: <AppError />,
		element: <AppLayout/>,
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
				path: "/app/rooms",
				errorElement: <AppError />,
				children: [
					{
						path: "/app/rooms/:roomId",
						element: <RoomViewRoom />,
					},
				],
			},
			{
				path: "/app/account",
				element: <AccountPage />,
			},
		],
	},
	{
		path: "/login",
		errorElement: <AppError />,
		element: <LoginPage />,
		loader: () => {
			if (useAuthStore.getState().token) return redirect("/app");
			return null;
		},
	},
	{
		path: "/logout",
		errorElement: <AppError />,
		element: <LoginPage />,
		loader: () => {
			useAuthStore.getState().removeToken();
			return redirect("/login");
		},
	},
	{
		path: "/register",
		errorElement: <AppError />,
		element: <RegisterPage />,
	},
	{
		path: "/403",
		element: (
			<AppError message={"Your are not allowed to go to this page."} />
		),
	},
	{
		path: "*",
		element: <AppError />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
);
