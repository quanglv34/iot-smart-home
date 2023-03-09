import { Outlet } from "react-router-dom";
import AdminLayoutHeader from "./AdminLayoutHeader";
import AdminLayoutSidebar from "./AdminLayoutSidebar";

export default function AdminLayout() {
	return (
		<div className="flex select-none flex-row">
			<AdminLayoutSidebar />
			<div className="h-fit w-full">
				<Outlet />
			</div>
		</div>
	);
}
