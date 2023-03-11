import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { HiOutlineCalendarDays, HiOutlinePencilSquare, HiOutlineUserCircle, HiOutlineViewColumns, HiPlus, HiXMark } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import {
	editHomeRequest, fetchHomeRequest
} from "../api/home";
import { createRoomRequest, deleteRoomRequest, fetchHomeRoomsRequest } from "../api/room";
import AppPage from "../layouts/AppPage";



export default function HomeViewHome(props) {
	const [recordData, setRecordData] = useState({ name: "", location: "" });
	const { homeId } = useParams();
	const homeQuery = useQuery(["fetchHomeRequest", homeId], fetchHomeRequest);
	const homeRoomsQuery = useQuery(
		["fetchHomeRoomsRequest", homeId],
		fetchHomeRoomsRequest
	);

	useEffect(() => {
		if (homeQuery.data) {
			setRecordData(homeQuery.data);
		}
	}, [homeQuery.data]);

	const editHomeForm = useFormik({
		enableReinitialize: true,
		initialValues: recordData,
		onSubmit: async (values) => {
			console.log(values);
		},
	});

	const rooms = homeRoomsQuery.data ?? [];

	const deleteRoomMutation = useMutation({
		mutationKey: "deleteRoomRequest",
		mutationFn: deleteRoomRequest,
	});

	const onDeleteRoom = async (recordId) => {
		await deleteRoomMutation.mutateAsync(recordId);
		await homeRoomsQuery.refetch();
	};


	if (homeQuery.isLoading || homeRoomsQuery.isLoading) {
		return <Spinner />;
	}

	return (
		<AppPage>
			<AppPage.Header>
				<AppPage.HeaderTitle>
					<h1 className="block text-4xl font-bold capitalize">
						View Home
						<span className="mt-2 flex flex-row items-center text-sm font-normal text-gray-500">
							<HiOutlineViewColumns className="mr-1 inline-block h-5 w-5" />
							Home ID: {homeId}
						</span>
					</h1>
				</AppPage.HeaderTitle>
				<AppPage.HeaderActions>
					<HomeEditHomeButton
						homeId={homeId}
						data={recordData}
						key={1}
					/>
					,
					<HomeAddRoomButton
						key={2}
						homeId={homeId}
						refetch={homeRoomsQuery.refetch}
					/>
				</AppPage.HeaderActions>
			</AppPage.Header>
			<div className="space-y-8">
				<section>
					<h2 className="mb-2 text-2xl font-semibold">Info</h2>
					<Card className="!shadow-none">
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
					</Card>
				</section>
				<section className="">
					<div>
						<h2 className="mb-2 text-2xl font-semibold">Rooms</h2>
						<div className="divide-y overflow-clip rounded-lg border shadow-sm">
							{rooms.map((record) => (
								<div
									key={record.id}
									className="text-md  flex flex-row justify-between bg-white px-6 py-5  hover:bg-gray-300/5"
								>
									<Link
										key={record.id}
										className="block grow hover:cursor-pointer"
										to={`/app/rooms/${record.id}`}
									>
										<div>
											<h2 className="mb-4 text-base font-semibold leading-none text-blue-500">
												{record.name}
											</h2>
											<div className="space-y-2 text-sm font-light">
												<div className="flex flex-row space-x-5">
													<span className="flex flex-row items-start gap-1 text-gray-700">
														<HiOutlineUserCircle className="h-5 w-5" />
														{record.createdBy}
													</span>
													<span className="flex flex-row items-start gap-1 text-gray-700">
														<HiOutlineCalendarDays className="h-5 w-5" />
														{new Date(
															record.createdDate
														).toDateString()}
													</span>
												</div>
											</div>
										</div>
									</Link>

									<div className="flex items-start leading-none">
										{deleteRoomMutation.isLoading ? (
											<Spinner size={"sm"} />
										) : (
											<button
												onClick={() =>
													onDeleteRoom(record.id)
												}
												className="rounded-full p-1 text-gray-700 hover:bg-gray-500/5"
											>
												<HiXMark className="h-4 w-4" />
											</button>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</div>
		</AppPage>
	);
}

function HomeAddRoomButton(props) {
	let [showModal, setShowModal] = useState(false);

	const { isLoading, error, isError, mutateAsync, data } = useMutation({
		mutationKey: "createRoomRequest",
		mutationFn: createRoomRequest,
	});

	const formik = useFormik({
		initialValues: {
			name: "",
		},
		onSubmit: async (values, { resetForm }) => {
			await mutateAsync({
				params: { homeId: props.homeId },
				body: {
					name: values.name,
				},
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
