import { useQuery } from "@tanstack/react-query";
import { Button, Card, Label, Modal, Spinner, Tabs, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
	HiOutlineCpuChip,
	HiOutlineInbox,
	HiOutlinePencilSquare,
	HiOutlineViewColumns,
} from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { fetchRoomRequest } from "../api/room";
import AppPage from "../layouts/AppPage";

const RoomViewRoom = () => {
	const { roomId } = useParams();
	const [recordData, setRecordData] = useState({
		name: "",
		location: "",
	});

	const roomQuery = useQuery(["fetchRoomRequest", roomId], fetchRoomRequest);
	useEffect(() => {
		if (roomQuery.data) {
			setRecordData(roomQuery.data);
		}
	}, [roomQuery.data]);

	const editRoomForm = useFormik({
		enableReinitialize: true,
		initialValues: recordData,
		onSubmit: async (values) => {
			console.log(values);
		},
	});

	return (
		<AppPage>
			<div className="space-y-8">
				<AppPage.Header>
					<AppPage.HeaderTitle>
						<h1 className="block text-4xl font-bold capitalize">
							View Room
							<span className="mt-1 flex flex-row items-center text-sm font-normal text-gray-500">
								<HiOutlineViewColumns className="mr-1 inline-block h-5 w-5" />
								Room ID: {roomId}
							</span>
						</h1>
					</AppPage.HeaderTitle>
					{/* <AppPage.HeaderActions>Hello</AppPage.HeaderActions> */}
				</AppPage.Header>
				<section>
					<h2 className="mb-2 text-2xl font-semibold">Info</h2>
					<Card className="shadow-none">
						<form
							className="grid select-none grid-cols-2 gap-4"
							id="view-home-form"
							onSubmit={editRoomForm.handleSubmit}
						>
							<div>
								<div className="mb-2 block">
									<Label
										htmlFor="name"
										value="Your home name"
									/>
								</div>
								<TextInput
									disabled
									id="name"
									type="text"
									placeholder="A name for your home"
									value={editRoomForm.values.name}
									required={true}
									onChange={editRoomForm.handleChange}
								/>
							</div>
							<div>
								<div className="mb-2 block">
									<Label
										htmlFor="location"
										value="Location"
									/>
								</div>
								<TextInput
									disabled
									id="location"
									type="location"
									placeholder="Your home location"
									value={editRoomForm.values.location}
									required={true}
									onChange={editRoomForm.handleChange}
								/>
							</div>
						</form>
					</Card>
				</section>
				<section>
					<h2 className="mb-2 text-2xl font-semibold">
						Device & Sensor
					</h2>
					<Tabs.Group
						aria-label="Tabs with underline"
						style="underline"
					>
						<Tabs.Item title="Device" icon={HiOutlineInbox}>
							
						</Tabs.Item>
						<Tabs.Item
							active={true}
							title="Sensor"
							icon={HiOutlineCpuChip}
						>
							
						</Tabs.Item>
					</Tabs.Group>
				</section>
			</div>
		</AppPage>
	);
};

export default RoomViewRoom;

function HomeEditHomeButton(props) {
	let [showModal, setShowModal] = useState(false);

	const homeId = props.homeId;

	const { isLoading, error, isError, mutateAsync, data } = useMutation({
		mutationKey: "editHomeRequest",
		mutationFn: editHomeRequest,
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: props.data,
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
				Edit home
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
						Create
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
