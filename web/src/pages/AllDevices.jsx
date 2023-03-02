import AppPage from "../components/AppPage";
import { DeviceList } from "../components/DeviceList";
import PropertyMemberInviteButton from "../components/PropertyMemberInviteButton";

export default function AllDevices() {
    return (
		<AppPage
			title="All Devices"
			actions={[<PropertyMemberInviteButton key="first" />]}
			content={<DeviceList />}
		/>
	);
}