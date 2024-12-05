import { getPokemon } from './pokemonSource';

export async function getTestTeams(){
    const testTeams = [
        {
            teamName : "test1",
            pokemons : new Array(6)
        },
        {
            teamName: "test2",
            pokemons : new Array(6)
        }
    ];

    

    return testTeams;
}
