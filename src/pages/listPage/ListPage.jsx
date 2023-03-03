import ListItem from "../../components/listItem/ListItem";

import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header.jsx";
import "./ListPage.scss";

import Pokeball from "../../img/pokeball.png";
import Header from "../../components/header/Header";

const ListPage = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [childData, setChildData] = useState('')

    const fetchPokemon = async (limit, offset) => {
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
            );
            const data = await response.json();
            const results = data.results;

            const pokemonData = await Promise.all(
                results.map(async (result) => {
                    const response = await fetch(result.url);
                    const data = await response.json();
                    /* not all pokemon entries have all images, this tries out several possible entries and if all are empty a default image is used (pokeball) */
                    const dreamWorldImage =
                        data.sprites.other.dream_world.front_default != null
                            ? data.sprites.other.dream_world.front_default
                            : data.sprites.other.home.front_default != null
                                ? data.sprites.other.home.front_default
                                : data.sprites.front_default != null
                                    ? data.sprites.front_default
                                    : Pokeball;
                    return {
                        /* format the id as #00x */
                        id: `#${data.id.toString().padStart(3, "0")}`,
                        name: data.name,
                        image: dreamWorldImage,
                        abilities: data.abilities
                            .map((ability) => ability.ability.name)
                            .join(", "),
                        moves: data.moves
                            .map((move) => move.move.name)
                            .join(", "),
                        types: data.types
                            .map((type) => type.type.name)
                            .join(", "),
                    };
                })
            );

            setPokemonList((prevList) => [...prevList, ...pokemonData]);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    /* initial fetch  */
    useEffect(() => {
        fetchPokemon(1300, 0);
    }, []);

    /* batch fetches */
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setIsLoading(true);
    //         const offset = pokemonList.length;
    //         fetchPokemon(20, offset);
    //     }, 100);

    //     return () => clearInterval(interval);
    // }, [pokemonList]);

    /* search */
    const filteredPokemonList = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(childData.toLowerCase())
    );

    const childToParent = (elem) => {
        setChildData(elem)
        console.log(childData);
    }

    // const handleSearch = (event) => {
    //     setSearchTerm(event.target.value);
    // };

    return (
        <div className="pokemon-grid">
            <div className="search-bar">
                <Header childToParent={childToParent}/>
                {/* <input
                    type="text"
                    placeholder="Search Pokemon"
                    value={searchTerm}
                    onChange={handleSearch}
                /> */}
            </div>
            {filteredPokemonList.map((pokemon, i) => (
                <ListItem
                    key={i}
                    img_url={pokemon.image}
                    nr={pokemon.id}
                    name={pokemon.name}
                ></ListItem>
            ))}
        </div>
    );
};
export default ListPage;
