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

// gets pokemon species, used for flavor text 
export function getPokemonSpecies(searchParam) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${searchParam}`;
    console.log(`Fetching species with URL: ${url}`); // Log the API URL

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Pokemon species with ID or name "${searchParam}" not found.`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Fetched species data:", data); // Log the data received
            return data;
        })
        .catch((error) => {
            console.error("Error fetching species:", error);
            throw error; // Ensure errors propagate up
        });
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

//Function that fetches pokemons from searchparams, id or name
export function getType(searchParam) {
    const url = `https://pokeapi.co/api/v2/type/${searchParam}`;

    function gotResponseACB(response) {
        if (!response.ok) {
            throw new Error(`Type with ID "${searchParam}" not found.`);
        }
        return response.json();
    }

    function getResultACB(data) {
        return data; 
    }

    return fetch(url).then(gotResponseACB).then(getResultACB);
}

export function getPokemonsFromArray(pokemonArray) {
    if (!Array.isArray(pokemonArray)) {
        console.error("getPokemonsFromArray: Expected an array but received:", pokemonArray);
        return Promise.resolve(new Array(6).fill(null));
    }

    return Promise.all(
        pokemonArray.map(function (id) {
            if (id) {
                return getPokemon(id); // Fetch Pokémon for valid IDs
            } else {
                return null; // Keep null for empty slots
            }
        })
    );
}


