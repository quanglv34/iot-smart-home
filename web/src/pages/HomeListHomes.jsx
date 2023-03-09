import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import { fetchUserHomes } from "../api/home";
import HomeAddHomeButton from "../components/HomeAddHomeButton";
import { HomeListHomesTable } from "../components/HomeListHomesTable";
import AppPage from "../layouts/AppPage";

export default function HomeListHomes() {
	const { data, isLoading, refetch } = useQuery(["users"], fetchUserHomes);
	if (isLoading) {
		return <Spinner/>;
	}
	return (
		<AppPage
			title="Home"
			content={<HomeListHomesTable homes={data} refetch={refetch} />}
			actions={[<HomeAddHomeButton key={1} refetch={refetch} />]}
		/>
	);
}
