import { useQuery } from "@tanstack/react-query";
import { Label, TextInput, Button, Card } from "flowbite-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosInstance } from "../api";
import AppPage from "../layouts/AppPage";

export default function AccountPage() {
	const [recordData, setRecordData] = useState({
		firstName: "",
		lastName: "",
		email: "",
	});
	const userQuery = useQuery(["useQuery"], async ({ queryKey }) => {
		const { data } = await AxiosInstance.get("account");
		return data;
	});

	useEffect(() => {
		if (userQuery.data) {
			setRecordData(userQuery.data);
		}
	}, [userQuery.data]);

	const form = useFormik({
		enableReinitialize: true,
		initialValues: recordData,
		onSubmit: async (values) => {
			console.log(values)
			const { data } = await AxiosInstance.post(
				"account",
				Object.assign(
					{ ...recordData },
					{
						firstName: values.firstName,
						lastName: values.lastName,
						email: values.email,
					}
				)
			);
			return data;
		},
	});
	return (
		<AppPage>
			<AppPage.Header>
				<AppPage.HeaderTitle title="Your Account Info"></AppPage.HeaderTitle>
			</AppPage.Header>
			<Card className="!shadow-none">
				<form
					id="update-user"
					className="flex flex-col gap-4"
					onSubmit={form.handleSubmit}
				>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="firstName" value="First Name" />
						</div>
						<TextInput
							id="firstName"
							type="text"
							name="firstName"
							placeholder="Enter your first name"
							required={true}
							value={form.values.firstName}
							onChange={form.handleChange}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="lastName" value="Last Name" />
						</div>
						<TextInput
							id="lastName"
							type="text"
							name="lastName"
							placeholder="Enter your last name"
							required={true}
							value={form.values.lastName}
							onChange={form.handleChange}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="email" value="Email Address" />
						</div>
						<TextInput
							id="email"
							type="email"
							name="email"
							placeholder="name@flowbite.com"
							required={true}
							value={form.values.email}
							onChange={form.handleChange}
						/>
					</div>
					<Button
						className="mt-4"
						htmlFor="update-user"
						type="submit"
					>
						Edit
					</Button>
				</form>
			</Card>
		</AppPage>
	);
}
