import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { React, useState } from "react";
import {
	HiOutlineCalendarDays,
	HiOutlineMap,
	HiOutlineUserCircle,
	HiPlus,
	HiXMark,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import {
	createHomeRequest,
	deleteHomeRequest,
	fetchUserHomes,
} from "../api/home";
import AppPage from "../layouts/AppPage";

export default function HomeListHomes() {
	const userHomesQuery = useQuery(["users"], fetchUserHomes);

	const deleteHomeMutation = useMutation({
		mutationKey: "deleteHomeRequest",
		mutationFn: deleteHomeRequest,
	});

	const onDeleteHome = async (recordId) => {
		await deleteHomeMutation.mutateAsync(recordId);
		await userHomesQuery.refetch();
	};

	if (userHomesQuery.isLoading) {
		return <Spinner />;
	}
	return (
		<AppPage
			title="Home"
			content={
				<div className="divide-y overflow-clip rounded-lg border shadow-sm">
					{userHomesQuery.data.map((record) => (
						<div
							key={record.id}
							className="text-md  flex flex-row justify-between bg-white px-6 py-5  hover:bg-gray-300/5"
						>
							<Link
								key={record.id}
								className="block grow hover:cursor-pointer"
								to={`${record.id}`}
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
										<div>
											<span className="flex basis-full flex-row items-start gap-1 text-gray-700">
												<HiOutlineMap className="h-5 w-5" />
												{record.location}
											</span>
										</div>
									</div>
								</div>
							</Link>

							<div className="flex items-start leading-none">
								{deleteHomeMutation.isLoading ? (
									<Spinner size={"sm"} />
								) : (
									<button
										onClick={() => onDeleteHome(record.id)}
										className="rounded-full p-1 text-gray-700 hover:bg-gray-500/5"
									>
										<HiXMark className="h-4 w-4" />
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			}
			actions={<CreateHomeButton userHomesQuery={userHomesQuery} />}
		/>
	);
}

function CreateHomeButton(props) {
		let [showModal, setShowModal] = useState(false);

	const createHomeMutation = useMutation({
		mutationKey: "createHomeRequest",
		mutationFn: createHomeRequest,
	});

	const createHomeForm = useFormik({
		initialValues: {
			name: "",
			location: "",
		},
		onSubmit: async (values, { resetForm }) => {
			await createHomeMutation.mutateAsync({
				name: values.name,
				location: values.location,
			});
			props.userHomesQuery.refetch();
			setShowModal(false);
			resetForm();
		},
	});

	return (
		<div>
			<Button size="sm" onClick={() => setShowModal(true)}>
				Add home
				<HiPlus className="ml-2 h-4 w-4" />
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
						id="create-user"
						onSubmit={createHomeForm.handleSubmit}
					>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="name" value="Your home name" />
							</div>
							<TextInput
								id="name"
								type="text"
								placeholder="A name for your home"
								value={createHomeForm.values.name}
								required={true}
								onChange={createHomeForm.handleChange}
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
								value={createHomeForm.values.location}
								required={true}
								onChange={createHomeForm.handleChange}
							/>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						disabled={createHomeMutation.isLoading}
						form="create-user"
						type="submit"
						size="sm"
					>
						{createHomeMutation.isLoading && (
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
		</div>
	);
}
