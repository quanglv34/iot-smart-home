import { AxiosInstance } from ".";

export const fetchHomeRoomsRequest = async (params) => {
	const homeId = params[0];
	const { data } = await AxiosInstance.get("rooms", {
		params: {
			homeId,
		},
	});
	return data;
};
