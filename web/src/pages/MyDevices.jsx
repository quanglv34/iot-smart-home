import AppPage from "../components/AppPage";
import { DeviceList } from "../components/DeviceList";
import MyDeviceAddDeviceButton from "../components/MyDeviceAddDeviceButton";
import PropertyMemberInviteButton from "../components/PropertyMemberInviteButton";

export default function MyDevices() {
	return (
		<AppPage
			title="My Devices"
			actions={[<MyDeviceAddDeviceButton key="first" />]}
			content={<DeviceList />}
		/>
	);
}
