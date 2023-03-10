import { AxiosInstance } from ".";

export const fetchRoomRequest = async (params) => {
	const roomId = params[1];
	const { data } = await AxiosInstance.get(`rooms/${roomId}`);
	return data;
};

export const fetchHomeRoomsRequest = async (params) => {
	const homeId = params[1];
	console.log(homeId);
	const { data } = await AxiosInstance.get("rooms",  {
		params: {
			homeId: homeId,
		}
	});
	return data;
};

export const createRoomRequest = async ({ params, body }) => {
	const { data } = await AxiosInstance.post("rooms", body, {
		params
	});
};

export const deleteRoomRequest = async (roomId) => {
	const { data } = await AxiosInstance.delete(`rooms/${roomId}`);
}