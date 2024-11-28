import { highestPokemonId } from "./pokemonModel"

/*
    This document should make API calls to PokéAPI to be used in the model
    when fetching data from the API
*/

const API_URL = "https://pokeapi.co/api/v2/pokemon/";



export async function searchPokemon(pokemonId) {
    const url = `${API_URL}${pokemonId}`; 
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
}

export async function getRandomPokemon(quantity) {
    let pokemonArray = [];
    for (let i = 0; i < quantity; i++) {
        const randomId = Math.floor(Math.random() * highestPokemonId) + 1; // antar att lowestPokemonId alltid är 1
        const pokemonData = await searchPokemon(randomId);
        pokemonArray.push(pokemonData);
    }
    return pokemonArray; // Return the full array
}



