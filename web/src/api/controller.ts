import { AxiosInstance } from ".";

export enum ControllerItemType {
	DEVICE = "DEVICE",
	SENSOR = "SENSOR",
}

export const fetchControllerSensorsRequest = async ({ queryKey }) => {
	const controllerId = queryKey[1];
	const { data } = await AxiosInstance.get("sensors/", {
		params: {
			controllerId,
		},
	});
	return data.map((item) => {
		item.category = ControllerItemType.SENSOR;
		return item;
	});
};

export const fetchControllerDevicesRequest = async ({ queryKey }) => {
	const controllerId = queryKey[1];
	const { data } = await AxiosInstance.get("devices/", {
		params: {
			controllerId,
		},
	});
	return data.map((item) => {
		item.category = ControllerItemType.DEVICE;
		return item;
	});
};

export const deleteControllerRequest = async ({ params }) => {
	const controllerId = params.controllerId;
	const { data } = await AxiosInstance.delete(`controllers/${controllerId}`);
	return data;
};
