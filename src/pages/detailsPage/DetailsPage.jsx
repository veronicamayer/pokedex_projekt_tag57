import { useEffect, useState } from "react";

import Pokeball from "../../img/pokeball.png";

import { useParams } from 'react-router-dom';

const DetailsPage = () => {
    const { name } = useParams();

    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const getPokemonDetails = async () => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name}`
            );
            const data = await response.json();
            const dreamWorldImage =
                data.sprites.other.dream_world.front_default != null
                    ? data.sprites.other.dream_world.front_default
                    : data.sprites.other.home.front_default != null
                    ? data.sprites.other.home.front_default
                    : data.sprites.front_default != null
                    ? data.sprites.front_default
                    : Pokeball;

            setPokemon({
                id: `#${data.id.toString().padStart(3, "0")}`,
                name: data.name,
                image: dreamWorldImage,
                abilities: data.abilities
                    .map((ability) => ability.ability.name)
                    .join(", "),
                moves: data.moves.map((move) => move.move.name).join(", "),
                types: data.types.map((type) => type.type.name).join(", "),
            });
        };

        getPokemonDetails();
    }, [name]);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <section className="detailsPage">
            <img src={pokemon.image} alt={pokemon.name} />
            <h1>{pokemon.name}</h1>
            <p>ID: {pokemon.id}</p>
            <p>Abilities: {pokemon.abilities}</p>
            <p>Moves: {pokemon.moves}</p>
            <p>Types: {pokemon.types}</p>
        </section>
    );
};

export default DetailsPage;
