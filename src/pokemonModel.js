import { resolvePromise } from './resolvePromise';
import { searchPokemon } from './pokemonSource';

export const highestPokemonId = 1025;
import { searchPokemon, getPokemon } from './pokemonSource';

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

    allPokemon : [], // Full list of Pokémon
    pokemonResultPromiseSate: {},
    filteredPokemon : [], // Filtered list based on search
    searchQuery : "", //searchquery for filtering pokemon

    //Function to load all pokemons from website 
    loadAllPokemon() {
    const promise = getPokemon("?limit=100000"); // Fetch all Pokémon names

    resolvePromise(promise, this.pokemonResultPromiseSate);
    promise
        .then((data) => {
            // Filter out invalid entries by checking if the URL includes a valid ID
            this.allPokemon = data.results.filter((pokemon) => {
                const id = this.extractPokemonIdFromUrl(pokemon.url);
                return id >= lowestPokemonId && id <= highestPokemonId; 
            });

            this.filteredPokemon = this.allPokemon; // Initially display all valid Pokémon
        })
        .catch((error) => {
            console.error("Error fetching Pokémon list:", error);
        }); 
    },

    // Helper function to extract Pokémon ID from URL 
    extractPokemonIdFromUrl(url) {
        const match = url.match(/\/pokemon\/(\d+)\//);
        return match ? parseInt(match[1], 10) : -1; // Extract and parse ID or return -1
    },

    //Function to filter out right pokemon based on searchQuery
    filterPokemon(query) {
        this.searchQuery = query; // Update the search query
        const lowerQuery = query.toLowerCase();

        // Filter Pokémon whose names start with the query
        this.filteredPokemon = this.allPokemon.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(lowerQuery)
        );
    },

    // Search for a Pokémon by ID or name, filters out right result
    pokemonSearchACB(text) {
        this.searchQuery = text;
        this.filterPokemon(text); 
    },

    doSearch (pokemonId) {
        const searchPromise = searchPokemon(pokemonId);
        resolvePromise(searchPromise, this.pokemonSearchPromiseState);
        console.log(this.pokemonSearchPromiseState)
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

model.doSearch = model.doSearch.bind(model);

export { model };

