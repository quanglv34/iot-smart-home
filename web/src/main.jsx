import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Register from "./pages/Register";
import Error from "./pages/Error";
import AdminLayout from "./components/AdminLayout";
import AppLayout from "./components/AppLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PropertyMemberList from "./components/PropertyMemberList";
import Account from "./pages/Account";
import AllDevices from "./pages/AllDevices";
import MyDevices from "./pages/MyDevices";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Error />,
		element: <App />,
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
		element: <Login />,
	},
	{
		path: "/register",
		errorElement: <Error />,
		element: <Register />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
