import { Label, TextInput, Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

function Register() {
	return (
		<div className="mx-auto grid min-h-screen max-w-sm items-center">
			<Card>
				<h5 className="text-3xl font-bold capitalize tracking-tight text-gray-900 dark:text-white">
					Register New Account
				</h5>
				<form className="flex flex-col gap-4">
					<div>
						<div className="mb-2 block">
							<Label
								htmlFor="name1"
								value="Name"
							/>
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
							<Label
								htmlFor="email1"
								value="Email Address"
							/>
						</div>
						<TextInput
							id="email1"
							type="email"
							placeholder="name@flowbite.com"
							required={true}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label
								htmlFor="password1"
								value="Password"
							/>
						</div>
						<TextInput
							id="password1"
							type="password"
							required={true}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label
								htmlFor="password2"
								value="Confirm Password"
							/>
						</div>
						<TextInput
							id="password2"
							type="password"
							required={true}
						/>
					</div>
					<Button className="mt-4" type="submit">
						Create
					</Button>
					<p className="text-sm">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-medium text-blue-700 hover:text-blue-500"
						>
							Login now
						</Link>
					</p>
				</form>
			</Card>
		</div>
	);
}

export default Register;
