import { useMutation } from "@tanstack/react-query";
import { Label, TextInput, Button, Card } from "flowbite-react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { registerRequest } from "../api";

function RegisterPage() {
	const { isLoading, error, isError, mutateAsync, data } = useMutation({
		mutationKey: "registerRequest",
		mutationFn: registerRequest,
	})

	const formik = useFormik({
		initialValues: {
			username: "",
			lastName: "",
			firstName: "",
			email: "",
			password: "",
			password_confirmation: "",
		},
		onSubmit: async (values) => {
			await mutateAsync({
				login: values.username,
				lastName: values.lastName,
				firstName: values.firstName,
				email: values.email,
				password: values.password,
			});
		},
	})

	return (
		<div className="mx-auto grid min-h-screen max-w-lg items-center">
			<Card>
				<h5 className="text-3xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">
					Create New Account
				</h5>
				<form
					className="flex flex-col gap-4"
					onSubmit={formik.handleSubmit}
				>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<div className="mb-2 block">
								<Label htmlFor="firstName" value="First name" />
							</div>
							<TextInput
								id="firstName"
								type="text"
								placeholder="Enter your first name"
								value={formik.values.firstName}
								required={true}
								onChange={formik.handleChange}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="lastName" value="Last name" />
							</div>
							<TextInput
								id="lastName"
								type="text"
								placeholder="Enter your last name"
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
							placeholder="An username for your account"
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
					<Button disabled={isLoading} className="mt-4" type="submit">
						Register
					</Button>
					<p className="text-sm">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-medium text-blue-700 hover:text-blue-500"
						>
							Login
						</Link>
					</p>
				</form>
			</Card>
		</div>
	);
}

export default RegisterPage;
