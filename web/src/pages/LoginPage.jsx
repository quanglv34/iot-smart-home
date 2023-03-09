import { Label, TextInput, Button, Checkbox, Card } from "flowbite-react";
import { Link, Navigate, redirect } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { authenticateRequest } from "../api";
import { useAuthStore } from "../store";

function LoginPage() {
	const { isLoading, error, isError, mutateAsync, data } = useMutation({mutationKey: 'authenticateRequest', mutationFn: authenticateRequest});
	const setAuthToken = useAuthStore((state) => state.setToken);
	const token = useAuthStore((state) => state.token);

	const formik = useFormik({
		initialValues: {
			username: "",
			rememberMe: false,
			password: "",
		},
		onSubmit: async (values) => {
			await mutateAsync({
				username: values.username,
				password: values.password,
				rememberMe: values.rememberMe,
			}).then(data => {
				setAuthToken(data.id_token)
			});
		},
	});

	if(token) {
		return <Navigate to={"/app"}></Navigate>;
	}

	return (
		<div className="mx-auto grid min-h-screen max-w-md items-center">
			<Card>
				<h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
					Login to Your Account
				</h5>
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-4"
				>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="username" value="Username" />
						</div>
						<TextInput
							id="username"
							type="text"
							name="username"
							placeholder="Your account username"
							autoComplete="username"
							value={formik.values.username}
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
							name="password"
							autoComplete="new-password"
							value={formik.values.password}
							required={true}
							onChange={formik.handleChange}
						/>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							id="rememberMe"
							name="rememberMe"
							value={formik.values.rememberMe}
							onChange={formik.handleChange}
						/>
						<Label htmlFor="rememberMe" className="font-normal">
							Remember me
						</Label>
					</div>
					<Button disabled={isLoading} className="mt-4" type="submit">
						Login
					</Button>

					<p className="text-sm">
						Don&apos;t have an account?{" "}
						<Link
							to="/register"
							className=" font-medium text-blue-700 hover:text-blue-500"
						>
							Create account
						</Link>
					</p>
				</form>
			</Card>
		</div>
	);
}

export default LoginPage;
