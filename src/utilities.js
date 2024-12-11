
// This imported file was generated using a script
import pokemonTypeData from '../pokemonTypeData.json';

// Function to validate the team format
export function isValidTeam(team) {
    const valid =
        team &&
        typeof team === "object" && 
        Array.isArray(team.pokemons) &&
        team.pokemons.length === 6 && 
        team.pokemons.every(pokemon => typeof pokemon === "object" && pokemon !== null) &&
        typeof team.teamName === "string" && 
        team.teamName.trim().length > 0; 
    return valid;
}

// Helper function to extract Pokémon ID from URL 
export function extractPokemonIdFromUrl(url) {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? parseInt(match[1], 10) : -1; // Extract and parse ID or return -1
}

export function getPokemonTypeIds(pokemonId) {
    return pokemonTypeData[pokemonId];
}

export function pokemonIdToTypeId(pokemonId) {
    const typeIds = pokemonTypeData[pokemonId]
    return typeIds;
}