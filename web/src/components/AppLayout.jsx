import { Outlet } from "react-router-dom";
import AppLayoutHeader from "./AppLayoutHeader";
import AppLayoutSidebar from "./AppLayoutSidebar";

export default function AppLayout() {
	return (
		<div className="flex flex-row">
			<AppLayoutSidebar />
			<div className="h-fit w-full">
				<AppLayoutHeader />
				<Outlet />
			</div>
		</div>
	)
}
