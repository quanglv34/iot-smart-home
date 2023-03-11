import React, { useState } from "react";
import {
	Button,
	Modal,
	TextInput,
	Spinner,
	Label,
	Checkbox,
} from "flowbite-react";
import { HiEnvelope } from "react-icons/hi2";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { registerRequest } from "../api";
import { UserRole } from "../store";

export default function AdminUserCreateUserButton({ refetch}) {
	let [showModel, setShowModel] = useState(false);

	const { isLoading, error, isError, mutateAsync, data } = useMutation({
		mutationKey: "registerRequest",
		mutationFn: registerRequest,
	});

	const formik = useFormik({
		initialValues: {
			username: "",
			lastName: "",
			firstName: "",
			email: "",
			roles: [UserRole.ROLE_USER],
			password: "",
			password_confirmation: "",
		},
		onSubmit: async (values, { resetForm }) => {
			await mutateAsync({
				login: values.username,
				lastName: values.lastName,
				firstName: values.firstName,
				email: values.email,
				password: values.password,
				authorities: values.roles,
			});
			refetch();
			resetForm();
						setShowModel(false);

		},
	});

	return (
		<React.Fragment>
			<Button size="sm" onClick={() => setShowModel(true)}>
				Create user
			</Button>
			<Modal
				dismissible={true}
				show={showModel}
				onClose={() => setShowModel(false)}
			>
				<Modal.Header>
					<span className="font-bold">Create new user</span>
				</Modal.Header>
				<Modal.Body>
					<form
						className="flex select-none flex-col gap-4"
						id="create-user"
						onSubmit={formik.handleSubmit}
					>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<div className="mb-2 block">
									<Label
										htmlFor="firstName"
										value="First name"
									/>
								</div>
								<TextInput
									id="firstName"
									type="text"
									placeholder="Enter user first name"
									value={formik.values.firstName}
									required={true}
									onChange={formik.handleChange}
								/>
							</div>
							<div>
								<div className="mb-2 block">
									<Label
										htmlFor="lastName"
										value="Last name"
									/>
								</div>
								<TextInput
									id="lastName"
									type="text"
									placeholder="Enter user last name"
									value={formik.values.lastName}
									required={true}
									onChange={formik.handleChange}
								/>
							</div>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="username" value="Username" />
							</div>
							<TextInput
								id="username"
								type="text"
								placeholder="An username for user account"
								value={formik.values.username}
								required={true}
								onChange={formik.handleChange}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="email" value="Email Address" />
							</div>
							<TextInput
								id="email"
								type="email"
								placeholder="name@flowbite.com"
								value={formik.values.email}
								required={true}
								onChange={formik.handleChange}
							/>
						</div>
						<div className="flex flex-row gap-4" id="checkbox">
							<Label> Role</Label>
							<div className="flex items-center gap-2">
								<Checkbox
									disabled
									defaultChecked={true}
									value={UserRole.ROLE_USER}
									name="roles"
									id="roles"
									onChange={formik.handleChange}
								/>
								<Label htmlFor="roles">User</Label>
								<Checkbox
									value={UserRole.ROLE_ADMIN}
									name="roles"
									id="roles"
									onChange={formik.handleChange}
								/>
								<Label htmlFor="roles">Administration</Label>
							</div>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="password" value="Password" />
							</div>
							<TextInput
								id="password"
								type="password"
								value={formik.values.password}
								required={true}
								onChange={formik.handleChange}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label
									htmlFor="password_confirmation"
									value="Confirm Password"
								/>
							</div>
							<TextInput
								id="password_confirmation"
								type="password"
								value={formik.values.password_confirmation}
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
