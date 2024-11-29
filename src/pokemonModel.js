import { resolvePromise } from './resolvePromise';
import { searchPokemon } from './pokemonSource';

export const highestPokemonId = 1025;

const model = {

    currentPokemonId: 100,
    pokemonSearchPromiseState: {},
    currentTeam: {
        pokemon1: null,
        pokemon2: null,
        pokemon3: null,
        pokemon4: null,
        pokemon5: null,
        pokemon6: null,
        TeamName: "team",
    },

    doSearch (pokemonId) {
        const searchPromise = searchPokemon(pokemonId)
        resolvePromise(searchPromise, this.pokemonSearchPromiseState)
    },

    setCurrentPokemonId(pokemonId) {
        this.currentPokemonId = pokemonId;
    },

    setToMainPage() {
        window.location.hash = "#/main";
    },

    setToSearchPage() {
        window.location.hash = "#/search";
    },
}

export { model };

