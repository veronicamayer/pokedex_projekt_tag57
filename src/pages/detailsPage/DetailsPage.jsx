import { useEffect, useState } from "react";

import Pokeball from "../../img/pokeball.png";

import { useParams } from "react-router-dom";

import TypeButton from "../../components/typeButton/TypeButton";

import "./DetailsPage.scss";

import Header from "../../components/header/Header";

import BackButton from "../../components/backButton/BackButton";

const DetailsPage = (props) => {
    const params = useParams();
    console.log(params);

    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const getPokemonDetails = async () => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${params.id}`
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
                key: data.name,
                id: `#${data.id.toString().padStart(3, "0")}`,
                name: data.name,
                image: dreamWorldImage,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                specialattack: data.stats[3].base_stat,
                specialdefense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat,
                abilities: data.abilities
                    .map((ability) => ability.ability.name)
                    .join(", "),
                types: data.types.map((type, index) => (
                    <TypeButton
                        key={index}
                        label={type.type.name}
                        allTypes={props.allTypes}
                    />
                )),
                firsttype: data.types[0].type.name,
            });
        };

        getPokemonDetails();
    }, [params.id, props.allTypes]);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Header buttonComponent={BackButton} />
        <section className={`detailsPage detailsPage--${pokemon.firsttype}`}>
            <div>

                <article className="imgContainer">
                    <img src={pokemon.image} alt={pokemon.name} />
                    <p className="types">{pokemon.types}</p>

                </article>
                <article className="info">
                    <h1>
                        {pokemon.id} {pokemon.name}
                    </h1>
                    <div>
                        <span><h2>hp:</h2><p>{pokemon.hp}</p></span>
                        <span><h2>attack:</h2><p>{pokemon.attack}</p></span>
                        <span><h2>defense:</h2><p>{pokemon.defense}</p></span>
                        <span><h2>special-attack:</h2><p>{pokemon.specialattack}</p></span>
                        <span><h2>special-defense:</h2><p>{pokemon.specialdefense}</p></span>
                        <span><h2>speed:</h2><p>{pokemon.speed}</p></span>
                    </div>
                    <h2 className="abilities">Abilities:</h2>
                    <p>{pokemon.abilities}</p>
                </article>
            </div>
        </section>
        </>
    );
};

export default DetailsPage;
