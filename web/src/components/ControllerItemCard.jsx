import { Badge } from "flowbite-react";
import { HiOutlineQrCode } from "react-icons/hi2";
import { ControllerItemType } from "../api/controller";
import { Chart, registerables } from "chart.js";
import { Chart as ReactChartJs } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import { pusher } from "../modules/pusher";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "../api";

export default function ControllerItemCard(props) {
	const item = props.item ?? null;
	return (
		<div className="divide-y rounded-lg border border-gray-200 !shadow-none">
			<div className="item flex flex-row items-start justify-between space-y-2 px-5 py-3">
				<div>
					<h2 className="mb-1 text-xl font-semibold uppercase tracking-wider">
						{item.type}
					</h2>
					<div className="flex flex-row items-center gap-1 text-gray-400">
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
									refetch={props.refetch}
								></ControllerItemCardDevice>
							);
						case ControllerItemType.SENSOR:
							return (
								<ControllerItemCardSensor
									item={item}
									refetch={props.refetch}
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

function ControllerItemCardDevice({ item, refetch }) {
	useEffect(() => {
		console.log('created pusher')
		const channel = pusher.subscribe(`private-device_${item.id}`);
		channel.bind("update-status", async (data) => {
			refetch();
			console.log("updated " + item.id);
		});
		return () => {
			pusher.subscribe(`private-device_${item.id}`);
		};
	}, []);

	return (
		<div>
			<p>
				<span>ID: </span> {item.id}
			</p>
			<p>
				<span>Type: </span>
				{item.type}
			</p>
			<p>
				<span>Pin: </span>
				{item.pin}
			</p>
			<div>STATUS {item.status}</div>
		</div>
	);
}

function ControllerItemCardSensor({ item, refetch }) {
	useEffect(() => {
				console.log("created pusher");

		const channel = pusher.subscribe(`private-sensor_${item.id}`);
		channel.bind("update", async (data) => {
			refetch();
			console.log("updated " + item.id);
		});
		return () => {
			pusher.unsubscribe(`private-sensor_${item.id}`);
		};
	}, []);
	const logs = item.logs;
	const latestLog = logs[logs.length - 1];
	const latestLogDescription = latestLog?.description
		? JSON.parse(latestLog?.description)
		: {};
	const properties = Object.keys(latestLogDescription) ?? {};

	const filteredLog = logs.slice(logs.length - 10, logs.length);

	return (
		<div className="!shadow-none">
			<div className="mb-8">
				<p>
					<span>ID: </span> {item.id}
				</p>
				<p>
					<span>Type: </span>
					{item.type}
				</p>
				<p>
					<span>Pin: </span>
					{item.pin}
				</p>
			</div>
			<div className="grid gap-8">
				{properties.map((property) => {
					const data = {
						labels: filteredLog.map(
							(log) =>
								String(
									new Date(log.createdDate).getHours()
								).padStart(2, 0) +
								":" +
								String(
									new Date(log.createdDate).getMinutes()
								).padStart(2, 0) +
								":" +
								String(
									new Date(log.createdDate).getSeconds()
								).padStart(2, 0)
						),
						datasets: [
							{
								id: 1,
								label: "",
								data: filteredLog.map(
									(log) =>
										JSON.parse(log.description)[property]
								),
							},
						],
					};
					return (
						<div key={property}>
							<div className="flex flex-row justify-between">
								<span className="text-lg font-bold uppercase text-blue-700">
									{property}
								</span>
								<Badge size="lg">
									{/* {() => {
								if(isNaN(latestLogDescription[property])) {
									return (
										<>{latestLogDescription[property]}</>
									);
								} else {
									return (
										<>
											{Math.round(
												latestLogDescription[property]
											)}
										</>
									);
								}

							}} */}
									{parseFloat(
										latestLogDescription[property]
									).toFixed(2)}
								</Badge>
							</div>
							<div className="m-5">
								<ReactChartJs
									key={`${item.id}-property`}
									type="bar"
									data={data}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
