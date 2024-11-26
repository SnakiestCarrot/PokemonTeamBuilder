
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




