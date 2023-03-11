import { Badge } from "flowbite-react";
import { HiOutlineQrCode } from "react-icons/hi2";
import { ControllerItemType } from "../api/controller";

export default function ControllerItemCard(props) {
	const item = props.item ?? null;
	return (
		<div className="divide-y rounded-lg border border-gray-200 !shadow-none">
			<div className="item flex flex-row items-start justify-between space-y-2 px-5 py-3">
				<div>
					<h2 className="mb-1 text-xl font-semibold uppercase tracking-wider">
						{item.type}
					</h2>
					<div className="text-gray-400 flex flex-row items-center gap-1">
						<HiOutlineQrCode></HiOutlineQrCode>
						{item.id}
					</div>
				</div>
				<div>
					<Badge size={"lg"} className="w-fit">
						{item.category}
					</Badge>
				</div>
			</div>
			<div className="p-5">
				{(() => {
					switch (item.category) {
						case ControllerItemType.DEVICE:
							return (
								<ControllerItemCardDevice
									item={item}
								></ControllerItemCardDevice>
							);
						case ControllerItemType.SENSOR:
							return (
								<ControllerItemCardSensor
									item={item}
								></ControllerItemCardSensor>
							);
						default:
							return (
								<div className="rounded-lg border p-4">
									Unknown item
								</div>
							);
					}
				})()}
			</div>
		</div>
	);
}

function ControllerItemCardDevice({ item }) {
	return (
		<div>
			STATUS {item.status}
		</div>
	);
}

function ControllerItemCardSensor({ item }) {
	return (
		<div className="!shadow-none">
			<h2>{item.type}</h2>
			{item.id}
		</div>
	);
}
