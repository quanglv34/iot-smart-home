import AppPage from "./AppPage";
import PropertyMemberInviteButton from "./PropertyMemberInviteButton";
import { Table } from "flowbite-react";


export default function PropertyMemberList() {
    const members = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
    ]

    return (
		<AppPage
			title="All members"
			actions={[
				<PropertyMemberInviteButton key="first" />,
			]}
			content={
				<div className="border rounded-lg">
					<Table hoverable={true}>
						<Table.Head>
							<Table.HeadCell>Product name</Table.HeadCell>
							<Table.HeadCell>Color</Table.HeadCell>
							<Table.HeadCell>Category</Table.HeadCell>
							<Table.HeadCell>Price</Table.HeadCell>
							<Table.HeadCell>
								<span className="sr-only">Edit</span>
							</Table.HeadCell>
						</Table.Head>
						<Table.Body className="divide-y">
							{members.map((member) => (
								<Table.Row
									key={member.id}
									className="bg-white dark:border-gray-700 dark:bg-gray-800"
								>
									<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
										Apple MacBook Pro 1
									</Table.Cell>
									<Table.Cell>Sliver</Table.Cell>
									<Table.Cell>Laptop</Table.Cell>
									<Table.Cell>$2999</Table.Cell>
									<Table.Cell>
										<a
											href="/tables"
											className="font-medium text-blue-600 hover:underline dark:text-blue-500"
										>
											Edit
										</a>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</div>
			}
		></AppPage>
	);
}