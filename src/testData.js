import { getPokemon } from './pokemonSource';

export async function getTestTeams(){
    const testTeams = [
        {
            teamName: "test1",
            pokemon1: await getPokemon(1),
            pokemon2: await getPokemon(2),
            pokemon3: await getPokemon(3),
            pokemon4: await getPokemon(4),
            pokemon5: await getPokemon(5),
            pokemon6: await getPokemon(6),
        },
        {
            teamName: "test2",
            pokemon1: await getPokemon(7),
            pokemon2: await getPokemon(8),
            pokemon3: await getPokemon(9),
            pokemon4: await getPokemon(10),
            pokemon5: await getPokemon(11),
            pokemon6: await getPokemon(12),
        }
    ];

    return testTeams;
}
