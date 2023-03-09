import { useQuery } from "@tanstack/react-query";
import { Badge, Spinner, Table } from "flowbite-react";
import { fetchListUsers } from "../api/user";

export function UserTableList() {
	const { data, isLoading } = useQuery(["users"], fetchListUsers);

	console.log(data);
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
								<a
									href="/tables"
									className="font-medium text-blue-600 hover:underline dark:text-blue-500"
								>
									Edit
								</a>
							</Table.Cell>
							<Table.Cell>
								<button className="font-medium text-red-600 hover:underline dark:text-red-500">
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
