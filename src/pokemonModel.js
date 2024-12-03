import { resolvePromise } from './resolvePromise';
import { searchPokemon, getPokemon } from './pokemonSource';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, getMyPokemonTeams, removeMyPokemonTeam, saveMyPokemonTeam } from "./firebaseModel.js";
import { isValidTeam } from './utilities';

export const lowestPokemonId = 1;
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
        teamName: "team",
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
            this.allPokemon = data.results.map((pokemon) => {
                const id = this.extractPokemonIdFromUrl(pokemon.url); 
                return {
                    name: pokemon.name,
                    url: pokemon.url,
                    id: id,
                    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                };
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
        this.searchQuery = query; 
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

    //Login function for loginPresenter
    userWantsToLogin: function (onSuccess, onError) {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then(function (result) {
                console.log("Login successful:", result.user);
                model.user = result.user; 
                if (onSuccess) {
                    onSuccess(result.user); 
                }
            })
            .catch(function (error) {
                console.error("Login failed:", error);
                if (onError) {
                    onError(error); 
                }
            });
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

    //Function to fetch all user pokemon teams. Returns an array of key value pairs with the value being a pokemon team.
    getPokemonTeams() {
        if (!this.user || !this.user.uid) {
            console.error("There is no user logged in!");
            return Promise.reject("User is not logged in.");
        }
    
        //Converts the firebase format to pokemon team format.
        function convertToPokemon(firebaseTeams) {
            return Object.entries(firebaseTeams).map(([key, team]) => ({
                key, // Preserve the unique Firebase key
                teamName: team.myTeamName,
                getPokemon1: () => getPokemon(team.id1),
                getPokemon2: () => getPokemon(team.id2),
                getPokemon3: () => getPokemon(team.id3),
                getPokemon4: () => getPokemon(team.id4),
                getPokemon5: () => getPokemon(team.id5),
                getPokemon6: () => getPokemon(team.id6),
            }));
        }
    
        // Call firebase function then convert them
        return getMyPokemonTeams()
            .then(firebaseTeams => {
                if (!firebaseTeams) {
                    console.log("No teams found.");
                    return [];
                }
                return convertToPokemon(firebaseTeams);
            })
            .catch(error => {
                console.error("Error fetching teams:", error);
                throw error;
            });
    },
    

    //Function to save my pokemon team
    savePokemonTeam(team){
        if (!this.user) {
            console.error("There is no user logged in!");
            return;
        }
        if (!isValidTeam(team)) {
            console.error("Invalid team format!", team);
            return;
        }
        saveMyPokemonTeam(team);
    },

    //Function to remove a pokemon team and return a new list of teams.
    removePokemonTeam(teamIdKey){
        if(!this.user) {
            console.error("There is no user logged in!", error)
            return;
        }
        removeMyPokemonTeam(teamIdKey);
        return this.getPokemonTeams();
    },
}



export { model };

