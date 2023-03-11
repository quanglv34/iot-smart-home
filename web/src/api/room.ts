import { AxiosInstance } from ".";

export const fetchRoomRequest = async ({ queryKey }) => {
	const roomId = queryKey[1];
	const { data } = await AxiosInstance.get(`rooms/${roomId}`);
	return data;
};

export const fetchHomeRoomsRequest = async (params) => {
	const homeId = params[1];
	console.log('homeId=', homeId);
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