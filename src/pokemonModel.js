
const lowestPokemonId = 1;
const highestPokemonId = 1025;

import { resolvePromise } from './resolvePromise';
import { searchPokemon } from './pokemonSource';

const model = {

    currentPokemonId: 100,
    searchResultPromiseState: {},
    currentTeam: 
    {
            id1 : null,
            id2 : null,
            id3 : null,
            id4 : null,
            id5 : null,
            id6 : null,
            name : "team",
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
