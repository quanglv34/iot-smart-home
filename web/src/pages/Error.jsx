import { Link, useRouteError } from "react-router-dom";

export default function Error(props) {
	const error = useRouteError();
	console.error(error);

	return (
		<div
			id="error-page"
			className="flex flex-col min-h-screen justify-center text-center space-y-4"
		>
			<h1 className="text-6xl font-bold">Oops!</h1>
			<p className="text-xl text-gray-700">
				{props.message ?? 'Sorry, an unexpected error has occurred.'}
			</p>
			<Link to="/" className="inline-block text-base font-medium text-blue-500 hover:text-blue-700">
				Back to home
			</Link>
		</div>
	);
}
