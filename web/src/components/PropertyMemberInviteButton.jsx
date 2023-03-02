import React, { useState } from "react";
import { Button, Modal, TextInput, Spinner } from "flowbite-react";
import { HiEnvelope  } from "react-icons/hi2";


export default function PropertyMemberInviteButton() {

	let [showModel, setShowModel] = useState(false)

    return (
		<React.Fragment>
			<Button size="sm" onClick={() => setShowModel(true)}>Invite a Member</Button>
			<Modal
				dismissible={true}
				show={showModel}
				onClose={() => setShowModel(false)}
			>
				<Modal.Header>Invite a Member</Modal.Header>
				<Modal.Body>
					<div className="">
						<TextInput
							id="email4"
							type="email"
							icon={HiEnvelope}
							helperText={
								"Your friends will receive and invitation. Remind them to check for new invitation."
							}
							placeholder="Your friend email address"
							required={true}
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button size="sm" onClick={() => setShowModel(false)}>
						<div className="mr-2">
							<Spinner size="sm" light={true} />
						</div>
						Send
					</Button>
					<Button
						size="sm"
						color="gray"
						onClick={() => setShowModel(false)}
					>
						<div className="mr-2">
							<Spinner size="sm" light={true} />
						</div>
						Send & Create another
					</Button>
					<Button
						size="sm"
						color="gray"
						onClick={() => setShowModel(false)}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	)
}