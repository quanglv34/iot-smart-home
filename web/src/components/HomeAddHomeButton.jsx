import { useMutation } from "@tanstack/react-query";
import {
    Button, Label, Modal, Spinner, TextInput
} from "flowbite-react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { HiPlus } from "react-icons/hi2";
import { createHomeRequest } from "../api/home";

export default function HomeAddHomeButton(props) {
	let [showModel, setShowModel] = useState(false);

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
            setShowModel(false);
			resetForm();
		},
	});

	return (
		<React.Fragment>
			<Button size="sm" onClick={() => setShowModel(true)}>
				Add home
				<HiPlus className="ml-2 h-4 w-4" />
			</Button>
			<Modal
				dismissible={true}
				show={showModel}
				onClose={() => setShowModel(false)}
			>
				<Modal.Header>
					<span className="font-bold">Add home</span>
				</Modal.Header>
				<Modal.Body>
					<form
						className="flex select-none flex-col gap-4"
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
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						disabled={isLoading}
						form="create-user"
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
						onClick={() => setShowModel(false)}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	);
}
