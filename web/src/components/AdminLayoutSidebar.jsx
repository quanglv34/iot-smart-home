import { Sidebar } from "flowbite-react";
import {
	HiOutlineChartPie,
	HiOutlineInboxStack,
	HiOutlineUserCircle,
    HiOutlineHome,
} from "react-icons/hi2";

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
						<Sidebar.Item href="#" icon={HiOutlineInboxStack}>
							Device
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={HiOutlineUserCircle}>
							Account
						</Sidebar.Item>
					</Sidebar.ItemGroup>
				</Sidebar.Items>
			</Sidebar>
		</div>
	);
}