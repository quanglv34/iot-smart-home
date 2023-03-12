import { useMutation, useQuery } from "@tanstack/react-query";
import { Badge, Spinner, Table } from "flowbite-react";
import { AxiosInstance } from "../api";
import { fetchListUsers } from "../api/user";

export function UserTableList({ data, isLoading, refetch }) {
	const deleteUserMutation = useMutation({
		mutationKey: "deleteUserMutation",
		mutationFn: async (userId) => {
			const { data } = await AxiosInstance.delete(
				`/admin/users/${userId}`
			);
			refetch();
			return data;
		},
	});

	const onDeleteUser = async (userId) => {
		const data = deleteUserMutation.mutateAsync(userId);
		return data;
	};

	const activeUserMutation = useMutation({
		mutationKey: "activeUserMutation",
		mutationFn: async (user) => {
			const recordData = { ...user };
			recordData.activated = true;
			const { data } = await AxiosInstance.put("/admin/users/", {
				activated: recordData.activated,
				authorities: recordData.authorities,
				email: recordData.email,
				firstName: recordData.firstName,
				id: recordData.id,
				lastName: recordData.lastName,
				login: recordData.login,
			});
			refetch();
			return data;
		},
	});

	const onActivateUser = async (user) => {
		console.log(user);
		const data = await activeUserMutation.mutateAsync(user);
		return data;
	};

	const users = data;

	if (isLoading) {
		return <Spinner></Spinner>;
	}
	return (
		<div className="rounded-lg border">
			<Table hoverable={true} className="max-w-full overflow-y-hidden">
				<Table.Head>
					<Table.HeadCell>Username</Table.HeadCell>
					<Table.HeadCell>Created by</Table.HeadCell>
					<Table.HeadCell>First name</Table.HeadCell>
					<Table.HeadCell>Last Name</Table.HeadCell>
					<Table.HeadCell>Email</Table.HeadCell>
					<Table.HeadCell>Activated</Table.HeadCell>
					<Table.HeadCell>Roles</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Active</span>
					</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Edit</span>
					</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Delete</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y overflow-x-auto">
					{users.map((member) => (
						<Table.Row
							key={member.id}
							className="bg-white dark:border-gray-700 dark:bg-gray-800"
						>
							<Table.Cell>{member.login}</Table.Cell>
							<Table.Cell>{member.createBy}</Table.Cell>
							<Table.Cell>{member.firstName}</Table.Cell>
							<Table.Cell>{member.lastName}</Table.Cell>
							<Table.Cell>{member.email}</Table.Cell>
							<Table.Cell className="w-fit">
								<Badge
									className="w-fit whitespace-nowrap"
									color={
										member.activated ? "success" : "warning"
									}
								>
									{member.activated
										? "Activated"
										: "Not activated"}
								</Badge>
							</Table.Cell>
							<Table.Cell className="flex gap-2">
								{member.authorities &&
									member.authorities.map((role) => (
										<Badge
											key={role}
											className="w-fit"
											color={"indigo"}
										>
											{role}
										</Badge>
									))}
							</Table.Cell>
							<Table.Cell>
								<button
									className="font-medium text-red-600 hover:underline dark:text-red-500"
									onClick={() => onActivateUser(member)}
								>
									Activate
								</button>
							</Table.Cell>
							<Table.Cell>
								<button className="font-medium text-blue-600 hover:underline dark:text-blue-500">
									Edit
								</button>
							</Table.Cell>
							<Table.Cell>
								<button
									className="font-medium text-red-600 hover:underline dark:text-red-500"
									onClick={() => onDeleteUser(member.id)}
								>
									Delete
								</button>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
}
