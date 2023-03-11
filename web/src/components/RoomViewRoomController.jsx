import { useMutation, useQuery } from "@tanstack/react-query";
import {
	Badge,
	Button,
	Label,
	Modal,
	Spinner,
	Tabs,
	TextInput,
} from "flowbite-react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
	HiOutlineCpuChip,
	HiOutlineInbox,
	HiOutlinePlusCircle,
	HiOutlineServerStack,
	HiOutlineViewColumns,
	HiXMark,
} from "react-icons/hi2";
import { AxiosInstance } from "../api";
import {
	deleteControllerRequest,
	fetchControllerDevicesRequest,
	fetchControllerSensorsRequest,
} from "../api/controller";
import AppPage from "../layouts/AppPage";
import ControllerItemCard from "./ControllerItemCard";

const RoomViewRoomController = (props) => {
	const controllers = props.controllers;
	const controllerId = props.controllerId;
	const roomId = props.roomId;
	const roomControllersQuery = props.roomControllersQuery;

	const deleteControllerMutation = useMutation({
		mutationKey: "deleteControllerMutation",
		mutationFn: deleteControllerRequest,
	});

	const onDeleteController = async (controllerId) => {
		await deleteControllerMutation.mutateAsync({
			params: {
				controllerId,
			},
		});
		roomControllersQuery.refetch();
	};

	const devicesQuery = useQuery(
		["devicesQuery/" + controllerId, controllerId],
		fetchControllerDevicesRequest
	);
	const sensorsQuery = useQuery(
		["sensorsQuery/" + controllerId, controllerId],
		fetchControllerSensorsRequest
	);

	const handleChangeControllerId = props.handleChangeControllerId;

	const devices = devicesQuery.data ?? [];
	const sensors = sensorsQuery.data ?? [];

	useEffect(() => {
		console.log("changed controllerId=", controllerId);
	}, [controllerId]);

	return (
		<>
			<section>
				<div className="mb-4 flex flex-row justify-between gap-2 self-start">
					<h2 className="text-2xl font-semibold">Controller</h2>
				</div>
				<div className="">
					<ul className="grid grid-cols-3 gap-4">
						{controllers.map((controller, index) => (
							<li
								className={`relative flex h-24 items-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:cursor-pointer hover:bg-gray-300/5 hover:text-blue-700  focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 ${
									controllerId == controller.id &&
									" text-blue-700"
								}`}
								key={controller.id}
							>
								<button
									onClick={() =>
										handleChangeControllerId(controller.id)
									}
									className="w-full px-5 py-2 text-left font-semibold"
								>
									Controller {index + 1}
									<div className="overflow-clip text-sm font-normal">
										<p>
											<span className="font-semibold">
												UUID:
											</span>{" "}
											{controller.uuid}
										</p>
										<p>
											<span className="font-semibold">
												ID:
											</span>{" "}
											{controller.id}
										</p>
									</div>
								</button>
								<div className="absolute right-0 top-0 flex items-start pt-2 pr-3 leading-none">
									{/* {deleteHomeMutation.isLoading ? (
										<Spinner size={"sm"} />
									) : (
										<button
											onClick={() =>
												onDeleteHome(record.id)
											}
											className="rounded-full p-1 text-gray-700 hover:bg-gray-500/5"
										>
											<HiXMark className="h-4 w-4" />
										</button>
									)} */}
									<button
										disabled={
											deleteControllerMutation.isLoading
										}
										onClick={() =>
											onDeleteController(controller.id)
										}
										className="rounded-full text-gray-700 hover:bg-gray-500/5"
									>
										<HiXMark className="h-4 w-4" />
									</button>
								</div>
							</li>
						))}
						<li
							className={`focus:ring-blue-700} h-24 rounded-lg border border-gray-200 bg-white text-gray-500 hover:cursor-pointer hover:bg-gray-300/5  hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2`}
						>
							<AddControllerButton
								refetch={roomControllersQuery.refetch}
							></AddControllerButton>
						</li>
					</ul>
				</div>
			</section>
			<section>
				<div className="mb-4 flex flex-row justify-between gap-2 self-start">
					<h2 className="text-2xl font-semibold">
						Device & Sensor
						<span className="mt-2 flex flex-row items-center text-sm font-normal text-gray-500">
							<HiOutlineViewColumns className="mr-1 inline-block h-5 w-5" />
							Controller ID:{" "}
							{controllerId ??
								"Please select or create a controller"}
						</span>
					</h2>
					<AppPage.HeaderActions>
						<AddDeviceButton refetch={devicesQuery.refetch} />
						<AddSensorButton refetch={sensorsQuery.refetch} />
					</AppPage.HeaderActions>
				</div>
				<Tabs.Group aria-label="Tabs with underline" style="underline">
					<Tabs.Item
						className="!p-0"
						active={true}
						title={
							<>
								<span className="mr-3">All</span>
								<Badge color="info">
									{devices.length + sensors.length}
								</Badge>
							</>
						}
						icon={HiOutlineServerStack}
					>
						<DevicesAndSensorsList
							items={[...devices, ...sensors]}
						></DevicesAndSensorsList>
					</Tabs.Item>
					<Tabs.Item
						title={
							<>
								<span className="mr-3">Device</span>
								<Badge color="info">{devices.length}</Badge>
							</>
						}
						icon={HiOutlineInbox}
					>
						<DevicesAndSensorsList
							items={devices}
						></DevicesAndSensorsList>
					</Tabs.Item>
					<Tabs.Item
						title={
							<>
								<span className="mr-3">Sensor</span>
								<Badge color="info">{sensors.length}</Badge>
							</>
						}
						icon={HiOutlineCpuChip}
					>
						<DevicesAndSensorsList
							items={sensors}
						></DevicesAndSensorsList>
					</Tabs.Item>
				</Tabs.Group>
			</section>
		</>
	);
};

export default RoomViewRoomController;

function DevicesAndSensorsList({ items }) {
	return (
		<div className="grid grid-flow-row gap-4">
			{items.map((item) => {
				return (
					<ControllerItemCard
						key={item.id}
						item={item}
					></ControllerItemCard>
				);
			})}
		</div>
	);
}

function AddControllerButton({ refetch }) {
	let [showModal, setShowModal] = useState(false);

	const createControllerMutation = useMutation({
		mutationKey: "createControllerRequest",
		mutationFn: async ({ uuid }) => {
			const { data } = await AxiosInstance.post("controllers", {
				uuid,
			});
			return data;
		},
	});

	const createControllerForm = useFormik({
		initialValues: {
			uuid: "",
		},
		onSubmit: async (values, { resetForm }) => {
			await createControllerMutation.mutateAsync({
				uuid: values.uuid,
			});
			refetch();
			setShowModal(false);
			resetForm();
		},
	});

	return (
		<>
			<button
				onClick={() => setShowModal(true)}
				className="flex h-full w-full flex-row items-center justify-center px-5 py-2 "
			>
				<HiOutlinePlusCircle className="mr-2 h-6 w-6" />
				Add controller
			</button>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<Modal.Header>
					<span className="font-bold">Add controller</span>
				</Modal.Header>
				<Modal.Body>
					<form
						className="flex select-none flex-col gap-4"
						id="create-controller"
						onSubmit={createControllerForm.handleSubmit}
					>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="uuid" value="Controller UUID" />
							</div>
							<TextInput
								id="uuid"
								type="text"
								placeholder="An UUID for your controller"
								value={createControllerForm.values.uuid}
								required={true}
								onChange={createControllerForm.handleChange}
							/>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						disabled={createControllerMutation.isLoading}
						form="create-controller"
						type="submit"
						size="sm"
					>
						{createControllerMutation.isLoading && (
							<div className="mr-2">
								<Spinner size="sm" light={true} />
							</div>
						)}
						Create
					</Button>
					<Button
						size="sm"
						color="gray"
						onClick={() => {
							setShowModal(false);
							createControllerForm.resetForm();
							createControllerMutation.reset();
						}}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

function AddDeviceButton({ refetch }) {
	let [showModal, setShowModal] = useState(false);

	const createControllerMutation = useMutation({
		mutationKey: "createControllerRequest",
		mutationFn: async ({ type, pin, status }) => {
			const { data } = await AxiosInstance.post("devices", {
				type,
				pin,
				status,
			});
			return data;
		},
	});

	const form = useFormik({
		initialValues: {
			type: "",
			pin: "",
		},
		onSubmit: async (values, { resetForm }) => {
			const data = await createControllerMutation.mutateAsync({
				type: values.type,
				pin: values.pin,
				status: "OFF",
			});
			console.log("device Data=", data);
			refetch();
			setShowModal(false);
			resetForm();
		},
	});

	const onCloseModal = () => {
		setShowModal(false);
		form.resetForm();
		createControllerMutation.reset();
	};

	return (
		<>
			<Button size={"sm"} color="gray" onClick={() => setShowModal(true)}>
				<HiOutlinePlusCircle className="mr-2 h-5 w-5" />
				Add device
			</Button>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<Modal.Header>
					<span className="font-bold">Add controller</span>
				</Modal.Header>
				<Modal.Body>
					<form
						className="flex select-none flex-col gap-4"
						id="create-device"
						onSubmit={form.handleSubmit}
					>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="type" value="Device Type" />
							</div>
							<TextInput
								id="type"
								type="text"
								name="type"
								placeholder="Device Type"
								value={form.values.type}
								required={true}
								onChange={form.handleChange}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="pin" value="Device PIN" />
							</div>
							<TextInput
								id="pin"
								type="text"
								name="pin"
								placeholder="Device PIN"
								value={form.values.pin}
								required={true}
								onChange={form.handleChange}
							/>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						disabled={createControllerMutation.isLoading}
						form="create-device"
						type="submit"
						size="sm"
					>
						{createControllerMutation.isLoading && (
							<div className="mr-2">
								<Spinner size="sm" light={true} />
							</div>
						)}
						Create
					</Button>
					<Button size="sm" color="gray" onClick={onCloseModal}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

function AddSensorButton({refetch}) {
	let [showModal, setShowModal] = useState(false);

	const createControllerMutation = useMutation({
		mutationKey: "createControllerRequest",
		mutationFn: async ({ type, pin }) => {
			const { data } = await AxiosInstance.post("sensors", {
				type,
				pin,
			});
			return data;
		},
	});

	const onCloseModal = () => {
		createControllerForm.resetForm();
		createControllerMutation.reset();
		setShowModal(false);
	};

	const createControllerForm = useFormik({
		initialValues: {
			type: "",
			pin: "",
		},
		onSubmit: async (values, { resetForm }) => {
			await createControllerMutation.mutateAsync({
				type: values.type,
				pin: values.pin,
			});
			resetForm();
			refetch();
			setShowModal(false);
		},
	});

	return (
		<>
			<Button size={"sm"} color="gray" onClick={() => setShowModal(true)}>
				<HiOutlineCpuChip className="mr-2 h-5 w-5" />
				Add sensor
			</Button>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<Modal.Header>
					<span className="font-bold">Add controller</span>
				</Modal.Header>
				<Modal.Body>
					<form
						className="flex select-none flex-col gap-4"
						id="create-sensor"
						onSubmit={createControllerForm.handleSubmit}
					>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="type" value="Sensor Type" />
							</div>
							<TextInput
								id="type"
								type="text"
								name="type"
								placeholder="Sensor Type"
								value={createControllerForm.values.type}
								required={true}
								onChange={createControllerForm.handleChange}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="pin" value="Sensor PIN" />
							</div>
							<TextInput
								id="pin"
								type="text"
								name="pin"
								placeholder="Sensor PIN"
								value={createControllerForm.values.pin}
								required={true}
								onChange={createControllerForm.handleChange}
							/>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						disabled={createControllerMutation.isLoading}
						form="create-sensor"
						type="submit"
						size="sm"
					>
						{createControllerMutation.isLoading && (
							<div className="mr-2">
								<Spinner size="sm" light={true} />
							</div>
						)}
						Create
					</Button>
					<Button size="sm" color="gray" onClick={onCloseModal}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
