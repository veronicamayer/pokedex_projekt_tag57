import ListItem from "../../components/listItem/ListItem";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Header from "../../components/header/Header.jsx";

import "./ListPage.scss";

import Pokeball from "../../img/pokeball.png";

import BurgerMenu from "../../components/burgerMenu/BurgerMenu";

// import DetailsPage from "../detailsPage/DetailsPage";


import menuIcon from "../../img/menu.png";
import HeaderImage from '../../img/img1.png';
import xIcon from '../../img/xVector.png';
import type from '../../img/type.png';


import TypeButton from "../../components/typeButton/TypeButton.jsx";

const ListPage = (props) => {
    const [pokemonList, setPokemonList] = useState([]);
    /*     const [isLoading, setIsLoading] = useState(true); */
    const [childData, setChildData] = useState("");
    const [selectedTypes, setSelectedTypes] = useState([]);

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
            /*             setIsLoading(false);
             */
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
    const filteredPokemonList = pokemonList.filter(
        (pokemon) =>
            pokemon.name.toLowerCase().includes(childData.toLowerCase()) &&
            (selectedTypes.length === 0 || // include all items if no types are selected
                pokemon.types
                    .split(", ")
                    .some((t) => selectedTypes.includes(t)))
    );

    console.log(filteredPokemonList);

    const childToParent = (elem) => {
        setChildData(elem);
        console.log(childData);
    };

    const allTypes = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD",
    };

    const typeButtons = Object.keys(allTypes).map((type) => (
        <>
            <TypeButton key={type} label={type} />
            <input
                type="checkbox"
                name={type}
                id={type}
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={(e) => {
                    const isChecked = e.target.checked;
                    setSelectedTypes(
                        (prevTypes) =>
                            isChecked
                                ? [...prevTypes, type] // add the type to the array if it's checked
                                : prevTypes.filter((t) => t !== type) // remove the type from the array if it's unchecked
                    );
                }}
            />
        </>
    ));

    return (
        <>
            <div className="divHeader filterTypesOn">
                
            <Header childToParent={childToParent} buttonComponent={BurgerMenu} />
        
            </div>
            <section className="listPage filterTypesOn">
                {filteredPokemonList.map((pokemon, i) => (
                    <Link to={`/details/${pokemon.name}`}>
                        <ListItem
                            key={i}
                            img_url={pokemon.image}
                            nr={pokemon.id}
                            name={pokemon.name}
                        ></ListItem>
                    </Link>
                ))}
            </section>

            <section className="checkBox filterTypesOff">
                <article>
                    <img src={HeaderImage} alt="pokemonIcon" />

                    <button
                        onClick={() => {
                            document
                                .querySelectorAll(".filterTypesOn")
                                .forEach((e) => (e.style.display = "flex"));
                            document
                                .querySelectorAll(".filterTypesOff")
                                .forEach((e) => (e.style.display = "none"));
                        }}
                    >
                        {" "}
                        <img src={xIcon} alt="xIcon" />{" "}
                    </button>
                </article>

                <article>
                    <img src={type} alt="Type" />
                </article>

                <article>
                    <div>{typeButtons}</div>

                    <button
                        onClick={() => {
                            document
                                .querySelectorAll(".filterTypesOn")
                                .forEach((e) => (e.style.display = "flex"));
                            document
                                .querySelectorAll(".filterTypesOff")
                                .forEach((e) => (e.style.display = "none"));
                        }}
                    >
                    Search
                    </button>
                </article>
            </section>
        </>
    );
};
export default ListPage;
