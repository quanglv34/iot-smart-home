import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { HiOutlinePencilSquare, HiPlus } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import {
	createHomeRequest,
	fetchHomeRequest,
	editHomeRequest,
} from "../api/home";
import { fetchHomeRoomsRequest } from "../api/room";
import AppPage from "../layouts/AppPage";

export default function HomeViewHome(props) {
	const [recordData, setRecordData] = useState({});
	const { homeId } = useParams();
	const homeQuery = useQuery(["homeQuery", homeId], fetchHomeRequest);
	const homeRoomsQuery = useQuery(
		["homeQuery", homeId],
		fetchHomeRoomsRequest
	);

	useEffect(() => {
		if (homeQuery.data) {
			setRecordData(homeQuery.data);
		}
	}, [homeQuery.data]);

	const { isLoading, error, isError, mutateAsync, data } = useMutation({
		mutationKey: "createHomeRequest",
		mutationFn: createHomeRequest,
	});

	const editHomeForm = useFormik({
		enableReinitialize: true,
		initialValues: recordData,
		onSubmit: async (values) => {
			console.log(values);
		},
	});

	if (homeQuery.isLoading || homeRoomsQuery.isLoading) {
		return <Spinner />;
	}

	return (
		<div>
			<AppPage
				title="View Home"
				content={
					<div>
						<form
							className="grid select-none grid-cols-2 gap-4"
							id="view-home-form"
							onSubmit={editHomeForm.handleSubmit}
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
									value={editHomeForm.values.name}
									required={true}
									onChange={editHomeForm.handleChange}
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
									value={editHomeForm.values.location}
									required={true}
									onChange={editHomeForm.handleChange}
								/>
							</div>
						</form>

						<section></section>
					</div>
				}
				actions={[
					<HomeEditHomeButton
						homeId={homeId}
						data={recordData}
						key={1}
					/>,
					<HomeAddRoomButton key={2} />,
				]}
			/>
		</div>
	);
}

function HomeAddRoomButton(props) {
	let [showModal, setShowModal] = useState(false);

	const { isLoading, error, isError, mutateAsync, data } = useMutation({
		mutationKey: "createHomeRequest",
		mutationFn: createHomeRequest,
	});

	const formik = useFormik({
		initialValues: {
			name: "",
			location: "",
		},
		onSubmit: async (values, { resetForm }) => {
			await mutateAsync({
				name: values.name,
				location: values.location,
			});
			props.refetch();
			setShowModal(false);
			resetForm();
		},
	});
	return (
		<React.Fragment>
			<Button color="gray" size="sm" onClick={() => setShowModal(true)}>
				Add room
				<HiPlus className="ml-2 h-4 w-4" />
			</Button>
			<Modal
				dismissible={true}
				show={showModal}
				onClose={() => setShowModal(false)}
			>
				<Modal.Header>
					<span className="font-bold">Add room</span>
				</Modal.Header>
				<Modal.Body>
					<form
						className="flex select-none flex-col gap-4"
						id="create-room-form"
						onSubmit={formik.handleSubmit}
					>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="name" value="Your home name" />
							</div>
							<TextInput
								id="name"
								type="text"
								placeholder="A name for your room"
								value={formik.values.name}
								required={true}
								onChange={formik.handleChange}
							/>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						disabled={isLoading}
						form="create-room-form"
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
				params: {homeId},
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
