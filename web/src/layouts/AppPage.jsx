export default function AppPage({title, actions ,content}) {
    return (
		<div className="max-w-4xl mx-auto py-16">
			<div className="flex flex-row justify-between items-center mb-8">
				<h1 className="text-4xl font-bold capitalize">{title ? title : null}</h1>
				<div className="grid gap-2 grid-flow-col">
                    { !actions ? null : actions}
                </div>
			</div>
			<div>{content}</div>
		</div>
	);
}