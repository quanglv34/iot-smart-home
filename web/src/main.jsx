import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from "react-router-dom";
import {
	QueryClient,
	useQuery,
	QueryClientProvider,
} from "@tanstack/react-query";
import "./index.css";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Error from "./pages/Error";
import AdminLayout from "./components/AdminLayout";
import AppLayout from "./components/AppLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PropertyMemberList from "./components/PropertyMemberList";
import Account from "./pages/Account";
import AllDevices from "./pages/AllDevices";
import MyDevices from "./pages/MyDevices";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store";

const queryClient = new QueryClient();
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
		],
	},
	{
		path: "/app",
		errorElement: <Error />,
		element: <AppLayout />,
		children: [
			{
				path: "/app/properties",
				element: <PropertyMemberList />,
				children: [
					{
						path: "/app/properties/:propertyId/members",
						element: <PropertyMemberList />,
					},
				],
			},
			{
				path: "/app/account",
				element: <Account />,
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
);
