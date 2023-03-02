import { Label, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import AppPage from "../components/AppPage";

export default function Account() {
	return (
		<AppPage
			title="Your Account Info"
			content={
				<div>
					<form className="flex flex-col gap-4">
						<div>
							<div className="mb-2 block">
								<Label htmlFor="name1" value="Name" />
							</div>
							<TextInput
								id="name1"
								type="text"
								placeholder="Enter your full name"
								required={true}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="email1" value="Email Address" />
							</div>
							<TextInput
								id="email1"
								type="email"
								placeholder="name@flowbite.com"
								required={true}
							/>
						</div>
						<Button className="mt-4" type="submit">
							Create
						</Button>

					</form>
				</div>
			}
		/>
	);
}