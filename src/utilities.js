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