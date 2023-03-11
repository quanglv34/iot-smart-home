import { Sidebar } from "flowbite-react";
import {
	HiOutlineChartPie,
	HiOutlineInboxStack,
	HiOutlineUserCircle,
	HiOutlineHome,
	HiOutlineSquares2X2,
	HiOutlineBuildingOffice2,
	HiOutlineTruck,
	HiOutlineServerStack,
	HiOutlineServer,
	HiOutlineInbox,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useAuthStore, UserRole } from "../store";

export default function AppLayoutSidebar() {
	const hasAdminRole = useAuthStore().user?.authorities?.find(
		(role) => role === UserRole.ROLE_ADMIN
	);
	console.log("hasAdminRole", hasAdminRole);
	return (
		<div className="sticky left-0 top-0 z-50 h-screen w-fit shrink-0 border-r">
			<Sidebar>
				<Sidebar.Logo
					href="/"
					as={"span"}
					img="/vite.svg"
					imgAlt="Flowbite logo"
				>
					Flowbite
				</Sidebar.Logo>

				<Sidebar.Items>
					<Sidebar.ItemGroup>
						{hasAdminRole && (
							<Link to={"/admin"}>
								<Sidebar.Item
									as={"span"}
									icon={HiOutlineChartPie}
								>
									Admin Panel
								</Sidebar.Item>
							</Link>
						)}
						<Link to="/app/homes">
							<Sidebar.Item as={"span"} icon={HiOutlineHome}>
								Home
							</Sidebar.Item>
						</Link>
						<Sidebar.Collapse
							icon={HiOutlineUserCircle}
							label="Account"
						>
							<Link to="/app/account">
								<Sidebar.Item
									as={"span"}
									icon={HiOutlineServerStack}
								>
									My Info
								</Sidebar.Item>
							</Link>
							<Link to="/logout">
								<Sidebar.Item
									as={"span"}
									icon={HiOutlineServer}
								>
									Logout
								</Sidebar.Item>
							</Link>
						</Sidebar.Collapse>
					</Sidebar.ItemGroup>
				</Sidebar.Items>
			</Sidebar>
		</div>
	);
}
