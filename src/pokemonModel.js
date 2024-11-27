
const lowestPokemonId = 1;
const highestPokemonId = 1025;

import { resolvePromise } from './resolvePromise';
import { searchPokemon } from './pokemonSource';

const model = {

    currentPokemonId: 100,
    searchResultPromiseState: {},
    currentTeam: 
    {
            pokemon1 : null,
            pokemon2 : null,
            pokemon3 : null,
            pokemon4 : null,
            pokemon5 : null,
            pokemon6 : null,
            TeamName : "team",
    },


    pokemonSearch () {
        const result = searchPokemon(model.currentPokemonId)
        console.log(result)
    },

    setCurrentPokemonId(pokemonId){
        if (pokemonId && (pokemonId !== this.currentPokemonId)) {
            this.currentPokemonId = pokemonId;
        }
    },

    setToMainPage () {
        window.location.hash="#/main"
    },

    setToSearchPage () {
        window.location.hash="#/search"
    },
}


export { model };
