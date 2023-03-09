import AppPage from "../layouts/AppPage";
import { DeviceList } from "../components/DeviceList";
import MyDeviceAddDeviceButton from "../components/MyDeviceAddDeviceButton";

export default function MyDevices() {
	return (
		<AppPage
			title="My Devices"
			actions={[<MyDeviceAddDeviceButton key="first" />]}
			content={<DeviceList />}
		/>
	);
}
