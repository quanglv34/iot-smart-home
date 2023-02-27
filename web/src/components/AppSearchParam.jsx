import { useState, useEffect } from "react";
import useBreadList from "../hooks/useBreadList";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const AppSearchParam = () => {
	const [location, setLocation] = useState("Seattle, WA");
	const [animal, setAnimal] = useState("");
	const [breed, setBreed] = useState("");
	const [pets, setPets] = useState([]);
    const [breeds] = useBreadList(animal)

	useEffect(() => {
		requestPets();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function requestPets() {
		const res = await fetch(
			`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
		);

		const data = await res.json();
		setPets(data.pets);
	}

	return (
		<div>
			<form
				className="flex flex-col"
				onSubmit={(e) => {
					e.preventDefault();
					requestPets();
				}}
			>
				<label className="mt-3" htmlFor="location">
					Location:
					<input
						id="location"
						type="text"
						value={location}
						placeholder="Location"
						onChange={(e) => setLocation(e.target.value)}
					></input>
				</label>
				<label className="mt-3" htmlFor="animal">
					Animal
					<select
						id="animal"
						value={animal}
						onChange={(e) => setAnimal(e.target.value)}
					>
						<option value="">Choose an animal</option>
						{ANIMALS.map((animal) => (
							<option key={animal}>{animal}</option>
						))}
					</select>
					<p>{animal}</p>
				</label>
				<label className="mt-3" htmlFor="bread">
					Bread
					<select
						id="bread"
						value={breed}
						onChange={(e) => setBreed(e.target.value)}
					>
						<option value="">Choose a breed</option>
						{breeds.map((breed) => (
							<option key={breed}>{breed}</option>
						))}
					</select>
					<p>{breed}</p>
				</label>
				<button type="submit">Submit</button>
			</form>
			{pets.map((pet) => (
				<div className="flex flex-row space-x-4" key={pet.id}>
					<div>{pet.name}</div>
					<div>{pet.animal}</div>
					<div>{pet.breed}</div>
				</div>
			))}
		</div>
	);
};

export default AppSearchParam;
