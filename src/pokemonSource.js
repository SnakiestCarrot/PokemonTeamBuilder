import { highestPokemonId } from "./pokemonModel";

/*
    This document should make API calls to PokéAPI to be used in the model
    when fetching data from the API
*/
export async function getRandomPokemon(quantity) {
    function createPokemonPromiseCB() {
        const randomId = Math.floor(Math.random() * highestPokemonId) + 1;
        const pokemon = getPokemon(randomId);
        return pokemon;
    }
    // use CB function to generate an array of promises
    const promises = Array.from({ length: quantity }, createPokemonPromiseCB);
    // make promises in parallel using the array of promises to speed up the fetch
    const pokemonArray = await Promise.all(promises); 
    return pokemonArray; 
}


//Function that fetches pokemons from searchparams, id or name
export function getPokemon(searchParam) {
    const url = `https://pokeapi.co/api/v2/pokemon/${searchParam}`;

    function gotResponseACB(response) {
        if (!response.ok) {
            throw new Error(`Pokemon with ID "${searchParam}" not found.`);
        }
        return response.json();
    }

    function getResultACB(data) {
        return data; 
    }

    return fetch(url).then(gotResponseACB).then(getResultACB);
}




