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
	HiOutlineInbox
} from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function AppLayoutSidebar() {
    return (
		<div className="sticky left-0 top-0 z-50 h-screen w-fit shrink-0 border-r">
			<Sidebar>
				<Sidebar.Logo img="/vite.svg" imgAlt="Flowbite logo">
					Flowbite
				</Sidebar.Logo>
				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<Sidebar.Item icon={HiOutlineChartPie}>
							Dashboard
						</Sidebar.Item>
						<Sidebar.Collapse
							icon={HiOutlineSquares2X2}
							label="Property"
						>
							<Sidebar.Item
							
								icon={HiOutlineBuildingOffice2}
							>
								All Properties
							</Sidebar.Item>
							<Sidebar.Item icon={HiOutlineHome}>
								My Properties
							</Sidebar.Item>
							<Sidebar.Item icon={HiOutlineTruck}>
								Invited Properties
							</Sidebar.Item>
						</Sidebar.Collapse>
						<Sidebar.Collapse
							icon={HiOutlineInboxStack}
							label="Device"
						>
							<Sidebar.Item icon={HiOutlineServerStack}>
								<Link to="/app/devices">All Devices</Link>
							</Sidebar.Item>
							<Sidebar.Item icon={HiOutlineServer}>
								<Link to="/app/devices/my-devices">My Devices</Link>
							</Sidebar.Item>
							<Sidebar.Item icon={HiOutlineInbox}>
								<Link to="/app/devices/invited-devices">Invited Devices</Link>
							</Sidebar.Item>
						</Sidebar.Collapse>
						<Sidebar.Item icon={HiOutlineUserCircle}>
							<Link to="/app/account">Account</Link>
						</Sidebar.Item>
					</Sidebar.ItemGroup>
				</Sidebar.Items>
			</Sidebar>
		</div>
	);
}