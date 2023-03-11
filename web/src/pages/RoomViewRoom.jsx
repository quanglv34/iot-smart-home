import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React, { useEffect, useReducer, useState } from "react";
import { HiOutlinePencilSquare, HiOutlineViewColumns } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { AxiosInstance } from "../api";
import { fetchRoomRequest } from "../api/room";
import RoomViewRoomController from "../components/RoomViewRoomController";
import AppPage from "../layouts/AppPage";

function controllerReducer(controllerId, action) {
	switch (action.type) {
		case "changed": {
			return action.id;
		}
		default: {
			throw Error("Unknown action: " + action.type);
		}
	}
}

const RoomViewRoom = () => {
	const { roomId } = useParams();
	const [recordData, setRecordData] = useState({
		name: "",
		location: "",
	});

	const roomControllersQuery = useQuery(
		["fetchRoomControllers", roomId],
		async (params) => {
			const roomId = params[1];
			const { data } = await AxiosInstance.get("controllers", {
				params: { roomId },
			});
			console.log("room=", data);
			return data;
		}
	);

	const controllers = roomControllersQuery.data ?? [];

	const roomQuery = useQuery(["fetchRoomRequest", roomId], fetchRoomRequest);

	useEffect(() => {
		if (roomQuery.data) {
			setRecordData(roomQuery.data);
		}
	}, [roomQuery.data]);

	const initialControllerId = controllers[0]?.id ?? null;

	const [currentControllerId, dispatch] = useReducer(
		controllerReducer,
		initialControllerId
	);

	const handleChangeControllerId = (id) => {
		dispatch({
			type: "changed",
			id: id,
		});
	};

	useEffect(() => {
		dispatch({
			type: "changed",
			id: initialControllerId,
		});
	}, [initialControllerId]);

	return (
		<AppPage>
			<div className="space-y-12">
				<AppPage.Header>
					<AppPage.HeaderTitle>
						<h1 className="block text-4xl font-bold capitalize">
							View Room
							<span className="mt-2 flex flex-row items-center text-sm font-normal text-gray-500">
								<HiOutlineViewColumns className="mr-1 inline-block h-5 w-5" />
								Room ID: {roomId}
							</span>
						</h1>
					</AppPage.HeaderTitle>
					<AppPage.HeaderActions>
						<EditRoomButton />
					</AppPage.HeaderActions>
					{/* <AppPage.HeaderActions>Hello</AppPage.HeaderActions> */}
				</AppPage.Header>
				<RoomViewRoomController
					handleChangeControllerId={handleChangeControllerId}
					roomId={roomId}
					controllerId={currentControllerId}
					controllers={controllers}
					roomControllersQuery={roomControllersQuery}
				></RoomViewRoomController>
			</div>
		</AppPage>
	);
};

export default RoomViewRoom;

function EditRoomButton(props) {
	let [showModal, setShowModal] = useState(false);

	const homeId = props.homeId;

	const { isLoading, error, isError, mutateAsync, data } = useMutation({
		mutationKey: "editHomeRequest",
		mutationFn: () => null,
	});

	const recordData = {
		name: "",
		location: "",
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: recordData,
		onSubmit: async (values) => {
			console.log("values=", {
				name: values.name,
				location: values.location,
			});
			await mutateAsync({
				params: { homeId },
				body: {
					name: values.name,
					location: values.location,
				},
			});
			props.refetch();
			setShowModal(false);
		},
	});

	return (
		<React.Fragment>
			<Button size="sm" onClick={() => setShowModal(true)}>
				Edit room
				<HiOutlinePencilSquare className="ml-2 h-4 w-4" />
			</Button>
			<Modal
				dismissible={true}
				show={showModal}
				onClose={() => setShowModal(false)}
			>
				<Modal.Header>
					<span className="font-bold">Add home</span>
				</Modal.Header>
				<Modal.Body>
					<form
						className="flex select-none flex-col gap-4"
						id="edit-home-form"
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
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						disabled={isLoading}
						form="edit-home-form"
						type="submit"
						size="sm"
					>
						{isLoading && (
							<div className="mr-2">
								<Spinner size="sm" light={true} />
							</div>
						)}
						Edit
					</Button>
					<Button
						size="sm"
						color="gray"
						onClick={() => setShowModal(false)}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	);
}
