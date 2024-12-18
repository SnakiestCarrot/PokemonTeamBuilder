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

    testTeams[0].pokemons[0] = await getPokemon(1);
    testTeams[0].pokemons[1] = await getPokemon(2);
    testTeams[0].pokemons[2] = await getPokemon(3);
    testTeams[0].pokemons[3] = await getPokemon(4);
    testTeams[0].pokemons[4] = await getPokemon(5);
    testTeams[0].pokemons[5] = await getPokemon(6);

    testTeams[1].pokemons[0] = await getPokemon(7);
    testTeams[1].pokemons[1] = await getPokemon(8);
    testTeams[1].pokemons[2] = await getPokemon(9);
    testTeams[1].pokemons[3] = await getPokemon(10);
    testTeams[1].pokemons[4] = await getPokemon(11);
    testTeams[1].pokemons[5] = await getPokemon(12);

    return testTeams;
}
