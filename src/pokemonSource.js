const API_URL = "https://pokeapi.co/api/v2/pokemon/";



export async function searchPokemon(pokemonId) {
    const url = `${API_URL}${pokemonId}`; // Directly use pokemonId in the URL
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
}




