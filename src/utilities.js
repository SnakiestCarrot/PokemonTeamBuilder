
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

// Takes a pokeAPI type object, returns an array of the type IDs that type does double damage to.
export function getDoubleDamageFromTypeArray(type) {

    function getTypeId(type) {
        return extractPokemonIdFromUrl(type.url);
    }
    const doubleDamageArray = [];
    doubleDamageArray = type.damage_relations.double_damage_from.map(getTypeId);
    return doubleDamageArray;
}

export function calculatePokemonTypeAdvantage(pokemonTypeArray) {
    const typeName = pokemonTypeArray[0][0].name;

    console.log(typeName)

    function getDamageTo(type) {
        return extractDamageToEffectiveness(type.damage_relations);
    }

    const firstPokemonEffectivenessArray = pokemonTypeArray[0].map(getDamageTo)
    
    Object.entries(firstPokemonEffectivenessArray[0]).forEach(([type, value]) => {
        if (firstPokemonEffectivenessArray[1] && firstPokemonEffectivenessArray[1][type]) {
            firstPokemonEffectivenessArray[0][type] = firstPokemonEffectivenessArray[0][type]*firstPokemonEffectivenessArray[1][type]
        }
    });

    if (firstPokemonEffectivenessArray[1]) {
        Object.entries(firstPokemonEffectivenessArray[1]).forEach(([type, value]) => {
            if (!firstPokemonEffectivenessArray[0][type]) {
                firstPokemonEffectivenessArray[0][type] = firstPokemonEffectivenessArray[1][type]
            }
        });
    }
    

    console.log(firstPokemonEffectivenessArray[0])

}   

function extractDamageToEffectiveness(damageRelations) {
    const effectiveness = {};

    function setMultiplier(typesArray, multiplier) {
        typesArray.forEach(typeObj => {
            const typeName = typeObj.name; 
            effectiveness[typeName] = multiplier; 
        });
    }

    setMultiplier(damageRelations.double_damage_to, 2);
    setMultiplier(damageRelations.half_damage_to, 0.5);
    setMultiplier(damageRelations.no_damage_to, 0);

    return effectiveness;
}

function calculateTypeAdvantage(type1, type2) {
    for (let i = 0; i < type1.damage_relations.double_damage_to.length; i++) {
        
    }
}

