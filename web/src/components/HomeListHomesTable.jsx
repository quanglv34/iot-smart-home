import { useMutation } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import {
	HiOutlineCalendarDays,
	HiOutlineMap,
	HiOutlineUserCircle,
	HiXMark,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { deleteHomeRequest } from "../api/home";

export function HomeListHomesTable(props) {
	const deleteHomeMutation = useMutation({
		mutationKey: "deleteHomeRequest",
		mutationFn: deleteHomeRequest,
	});

	const data = props.homes;

	const onDeleteHome = async (recordId) => {
		await deleteHomeMutation.mutateAsync(recordId);
		await props.refetch();
	};
	const records = data;

	if (records.length == 0) {
		return (
			<div className="text-lg text-gray-400">
				You have no home yet. Click Add home to start creating new home.
			</div>
		);
	}
	return (
		<div className="divide-y overflow-clip rounded-lg border shadow-sm">
			{records.map((record) => (
				<div
					key={record.id}
					className="text-md  flex flex-row justify-between bg-white px-4 py-3  hover:bg-gray-300/5"
				>
					<Link
						key={record.id}
						className="block grow hover:cursor-pointer"
						to={`${record.id}`}
					>
						<div>
							<h2 className="mb-2 text-base font-semibold leading-none text-blue-500">
								{record.name}
							</h2>
							<div className="flex flex-row gap-5 text-sm font-light">
								<span className="flex flex-row items-center gap-1 text-gray-700">
									<HiOutlineUserCircle className="h-5 w-5" />
									{record.createdBy}
								</span>
								<span className="flex flex-row items-center gap-1 text-gray-700">
									<HiOutlineCalendarDays className="h-5 w-5" />
									{new Date(
										record.createdDate
									).toDateString()}
								</span>
								<span className="flex flex-row items-center gap-1 text-gray-700">
									<HiOutlineMap className="h-5 w-5" />
									{record.location}
								</span>
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
	);
}
