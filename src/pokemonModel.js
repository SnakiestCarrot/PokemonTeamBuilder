
const lowestPokemonId = 1;
const highestPokemonId = 1025;

import { resolvePromise } from './resolvePromise';
import { searchPokemon } from './pokemonSource';

const model = {

    currentPokemonId: 100,
    searchResultPromiseState: {},
    
    pokemonSearch () {
        const result = searchPokemon(model.currentPokemonId)
        console.log(result)
        window.location.hash="/pokemonInfo"
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
