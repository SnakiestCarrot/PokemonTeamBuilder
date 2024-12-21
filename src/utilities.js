
// This imported file was generated using a script
import pokemonTypeData from '../pokemonTypeData.json';
import { getType } from './pokemonSource';

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

// Takes a pokemon ID and returns that pokemons types, as an array of type IDs
export function pokemonIdToTypeId(pokemonId) {
    return pokemonTypeData[pokemonId]
}

export async function getTypeObjects(pokemonId) {
    const typeArr = pokemonIdToTypeId(pokemonId);
    
    async function getTypeObject(typeId) {
        return await getType(typeId);
    }

    const typeObjectArray = [];

    typeObjectArray.push(await getTypeObject(typeArr[0]))
    if (typeArr[1]) {
        typeObjectArray.push(await getTypeObject(typeArr[1]))
    }

    return typeObjectArray;
}


// Takes the types of 2 pokemon as an array of arrays, where the outer array contains 2 arrays containing the types as strings of each pokemon
// and then returns a number larger than 1 if pokemon 1 wins, 1 if its a tie and a number smaller than 1 if pokemon 2 wins
export function calculateTypeAdvantage(typesArray) {
    // Type effectiveness chart
    const typeEffectiveness = {
        normal: { rock: 0.5, ghost: 0, steel: 0.5 },
        fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
        water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
        electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
        grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
        ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
        fighting: { normal: 2, ice: 2, rock: 2, dark: 2, steel: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, ghost: 0, fairy: 0.5 },
        poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
        ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
        flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
        psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
        bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
        rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
        ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
        dragon: { dragon: 2, steel: 0.5, fairy: 0 },
        dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
        steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
        fairy: { fighting: 2, dragon: 2, dark: 2, fire: 0.5, poison: 0.5, steel: 0.5 }
    };

    function getEffectiveness(attackerTypes, defenderTypes) {
        let multiplier = 1;
        attackerTypes.forEach(attackerType => {
            defenderTypes.forEach(defenderType => {
                const effectiveness = typeEffectiveness[attackerType]?.[defenderType] || 1;
                multiplier *= effectiveness;
            });
        });
        return multiplier;
    }

    const [pokemon1Types, pokemon2Types] = typesArray;

    const pokemon1Multiplier = getEffectiveness(pokemon1Types, pokemon2Types);
    const pokemon2Multiplier = getEffectiveness(pokemon2Types, pokemon1Types);

    console.log("pokemon 1: " + pokemon1Multiplier)
    console.log("pokemon 2: " + pokemon2Multiplier)

    // If pokemon 1 wins
    if (pokemon1Multiplier > pokemon2Multiplier) return 2;

    // If pokemon 2 wins
    if (pokemon1Multiplier < pokemon2Multiplier) return 0.5;

    // If its a tie
    return 1;
}
