import { Sidebar } from "flowbite-react";
import {
	HiOutlineChartPie,
	HiOutlineInboxStack,
	HiOutlineUserCircle,
    HiOutlineArrowRightOnRectangle,
	HiOutlineUserGroup
} from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function AdminLayoutSidebar() {
    return (
		<div className="sticky left-0 top-0 z-50 h-screen w-fit shrink-0 border-r">
			<Sidebar>
				<Sidebar.Logo href="#" img="/vite.svg" imgAlt="Flowbite logo">
					Flowbite
				</Sidebar.Logo>
				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<Sidebar.Item href="#" icon={HiOutlineChartPie}>
							Dashboard
						</Sidebar.Item>
						<Link to={"/admin/users"}>
							<Sidebar.Item
								as={"span"}
								icon={HiOutlineInboxStack}
							>
								Device
							</Sidebar.Item>
						</Link>
						<Link to={"/admin/users"}>
							<Sidebar.Item
								as={"span"}
								icon={HiOutlineUserGroup}
							>
								User
							</Sidebar.Item>
						</Link>
						<Sidebar.Collapse
							icon={HiOutlineUserCircle}
							label="My Account"
						>
							<Link to={"/logout"}>
								<Sidebar.Item
									as={"span"}
									icon={HiOutlineArrowRightOnRectangle}
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