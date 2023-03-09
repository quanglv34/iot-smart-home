import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import { useParams } from "react-router-dom";
import { fetchHomeRoomsRequest } from "../api/room";
import HomeAddHomeButton from "../components/HomeAddHomeButton";
import { HomeListHomesTable } from "../components/HomeListHomesTable";
import AppPage from "../layouts/AppPage";

export default function RoomListRooms() {
    const {homeId} = useParams
	const { data, isLoading, refetch } = useQuery(
		["users", homeId],
		fetchHomeRoomsRequest
	);
	if (isLoading) {
		return <Spinner />;
	}
	return (
		<AppPage
			title="Rooms"
			content={<HomeListHomesTable homes={data} refetch={refetch} />}
			actions={[<HomeAddHomeButton key={1} refetch={refetch} />]}
		/>
	);
}
