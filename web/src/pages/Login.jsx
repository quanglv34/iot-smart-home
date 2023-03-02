import { Label, TextInput, Button, Checkbox, Card } from "flowbite-react";
import { Link } from "react-router-dom";

function Login() {
    return (
		<div className="mx-auto grid min-h-screen max-w-sm items-center">
			<Card>
				<h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
					Login to Your Account
				</h5>
				<form className="flex flex-col gap-4">
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
					<div className="flex items-center gap-2">
						<Checkbox  id="remember" />
						<Label htmlFor="remember" className="font-normal">
							Remember me
						</Label>
					</div>
					<Button className="mt-4" type="submit">
						Login
					</Button>

					<p className="text-sm">
						Don&apos;t have an account?{" "}
						<Link
							to="/register"
							className=" font-medium text-blue-700 hover:text-blue-500"
						>
							Register now
						</Link>
					</p>
				</form>
			</Card>
		</div>
	);
}

export default Login;