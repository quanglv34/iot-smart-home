import { useMutation, useQuery } from "@tanstack/react-query";
import { Label, Spinner, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { createHomeRequest, fetchHomeRequest } from "../api/home";
import HomeEditHomeButton from "../components/HomeEditHomeButton";
import RoomListRooms from "../components/RoomListRooms";
import AppPage from "../layouts/AppPage";

export default function HomeViewHome(props) {
	const { homeId } = useParams();
	const homeQuery = useQuery(["homeQuery", homeId], fetchHomeRequest);

	const { isLoading, error, isError, mutateAsync, data } = useMutation({
		mutationKey: "createHomeRequest",
		mutationFn: createHomeRequest,
	});

	const formik = useFormik({
		initialValues: homeQuery.data,
		onSubmit: async (values, { resetForm }) => {
			await mutateAsync({
				name: values.name,
				location: values.location,
			});
			props.refetch();
			resetForm();
		},
	});

	if (homeQuery.isLoading) {
		return <Spinner />;
	}

	return (
		<AppPage
			title="View Home"
			content={[
				<form
					key={"edit-home-form"}
					className="grid select-none grid-cols-2 gap-4"
					id="create-user"
					onSubmit={formik.handleSubmit}
				>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Your home name" />
						</div>
						<TextInput
							id="name"
							type="text"
							placeholder="A name for your home"
							value={formik.values.name}
							required={true}
							onChange={formik.handleChange}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="location" value="Location" />
						</div>
						<TextInput
							id="location"
							type="location"
							placeholder="Your home location"
							value={formik.values.location}
							required={true}
							onChange={formik.handleChange}
						/>
					</div>
				</form>,
				<div key={"list-rooms"}>
					<RoomListRooms rooms={data} />
				</div>,
			]}
			actions={[<HomeEditHomeButton key={1} />]}
		/>
	);
}
