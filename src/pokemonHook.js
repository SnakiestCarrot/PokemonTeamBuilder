import { useState, useEffect } from "react";
import { getRandomPokemon } from "./pokemonSource";

export function fetchRandomPokemon(quantity) {
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState(null);

    function effectCB() {
        fetchPokemon();
    }

    function handleSuccess(data) {
        setPokemonList(data); 
    }

    function handleError(error) {
        console.error("Error fetching Pokémon:", error);
        setError(error); 
    }

    function fetchPokemon() {
        getRandomPokemon(quantity)
            .then(handleSuccess)
            .catch(handleError);
    }

    useEffect(effectCB, [quantity]);

    return { pokemonList, error };
}
