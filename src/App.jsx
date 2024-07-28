import axios from "axios";
import { useEffect, useState } from "react";

/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

function App() {
	const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {

        const sortedArray = [...response.data.results];

        sortedArray.sort((a, b) => {
          
          return a.name.localeCompare(b.name)
        })

        setList(sortedArray)
      });
	});

	return (
		<>
			<h3>Desafio: Consuma API do Pokemon </h3>
			<h1>Pokemon API</h1>
			<hr />
			{list.map((item) => (
				<Pokemon key={item.name} data={item} />
			))}
		</>
	);
}

const Pokemon = ({ data }) => {
	const [pokemonData, setPokemonData] = useState(null);

	useEffect(() => {
		axios.get(data.url).then((response) => setPokemonData(response.data));
	}, []);

	if (pokemonData === null) {
		return <div>-</div>;
	}

	return (
		<div style={{ alignItems: "center", display: "flex" }}>
			<img
				style={{ marginLeft: 10 }}
				src={pokemonData.sprites.front_default}
				alt={`Pokemon ${pokemonData.name}`}
			/>
			<b>{pokemonData.name}</b> - EXP {pokemonData.base_experience}
			<hr />
		</div>
	);
};

export default App;
