import { resolvePromise } from './resolvePromise';
import { getPokemon, getRandomPokemon } from './pokemonSource';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, getMyPokemonTeams, removeMyPokemonTeam, saveMyPokemonTeam } from "./firebaseModel.js";
import { isValidTeam, extractPokemonIdFromUrl, pokemonIdToTypeId } from './utilities';
import { getTestTeams } from './testData.js';
import pokemonTypeData from '../pokemonTypeData.json';

export const lowestPokemonId = 1;
export const highestPokemonId = 1025;

const model = {
    user : null,

    isDropdownVisible : false,

    currentPokemon: null,
    currentPokemonId: 100,
    pokemonSearchPromiseState: {},
    currentTeam: {
        pokemons : new Array(6),
        teamName : ""
    },

    allPokemon : [], // Full list of Pokémon
    pokemonResultPromiseSate: {},
    filteredPokemon : [], // Filtered list based on search
    searchQuery : "", //searchquery for filtering pokemon
    randomPokemonList: [],
    testTeams: [],

    init(){
        this.loadRandomPokemonList(4);
        this.loadAllPokemon();
        this.loadTestPokemonTeams();
    },

    setCurrentPokemonId (pokemonId) {
        this.currentPokemonId = pokemonId;
    },

    //Loads random pokemon in randomPokemonList for mainpage.
    async loadRandomPokemonList(quantity) {
        if (this.randomPokemonList.length > 0) {
            console.log("Using already loaded random pokemon");
            return;
        }

        try {
            const pokemonList = await getRandomPokemon(quantity); // Assuming getRandomPokemon returns a Promise
            this.randomPokemonList = pokemonList; // Update with resolved list
        } catch (error) {
            console.error("Failed to fetch Pokémon:", error);
        }
    },

    //Test function to get teams for myTeams display.
    async loadTestPokemonTeams(){
        if (this.testTeams.length > 0) {
            console.log("Using already loaded test teams");
            return;
        }

        try {
            const testTeamList = await getTestTeams(); 
            this.testTeams = testTeamList; 
        } catch (error) {
            console.error("Failed to get test teams:", error);
        }
    },

    //Function to load all pokemons from website 
    loadAllPokemon() {
        if (this.allPokemon.length > 0) {
            console.log("Using cached Pokémon data from memory");
            return;
        }
    
        // Check if Pokémon data is cached in localStorage
        const cachedData = localStorage.getItem("allPokemon");
        if (cachedData) {
            console.log("Using cached Pokémon data from localStorage");
            this.allPokemon = JSON.parse(cachedData);
            this.filteredPokemon = this.allPokemon;
            return;
        }
    
        // Fetch data from API if no cache exists
        console.log("Fetching Pokémon data from API...");
        const promise = getPokemon("?limit=100000"); // Fetch all Pokémon names

        resolvePromise(promise, this.pokemonResultPromiseSate);
        promise
            .then((data) => {
                // Filter out invalid entries by checking if the URL includes a valid ID
                this.allPokemon = data.results.map((pokemon) => {
                    const id = extractPokemonIdFromUrl(pokemon.url); 
                    return {
                        name: pokemon.name,
                        url: pokemon.url,
                        id: id,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                    };
                });

                this.filteredPokemon = this.allPokemon; // Initially display all valid Pokémon
            })
            .catch((error) => {
                console.error("Error fetching Pokémon list:", error);
            }); 
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
    userWantsToLogin(){
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Login successful:", result.user);
                model.user = result.user; 
            })
            .catch((error) => {
                console.error("Login failed:", error);
        });
    },

    //Function to logout
    userWantsToLogout() {
        signOut(auth)
            .then(() => {
                console.log("Logout successful");
                this.user = null; // Ensure user state is reset
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    },

    async doPokemonInspect (pokemonId) {
        // this is called from the teambuilder presenter that gets called from the view
        // this should set the current pokemon ID and then change to pokemon inspect page
        this.setCurrentPokemonId(pokemonId);
        const pokemon = await getPokemon(this.currentPokemonId);
        this.currentPokemon = pokemon;
        window.location.hash = "#/inspect";
    },

    async addPokemonByIdToTeam(pokemonId) {
        const index = this.currentTeam.pokemons.findIndex(pokemon => pokemon == null);
    
        // Means that the currentTeam is full (6 pokemon)
        if (index === -1) {
            console.error("No available slots in the current team.");
            return;
        }

        const pokemon = await getPokemon(pokemonId);

        const tempTeam = {...this.currentTeam};

        tempTeam.pokemons[index] = pokemon;

        this.currentTeam = tempTeam;
    },

    removePokemonAtIndexFromTeam (index) {
        const tempTeam = {...this.currentTeam};
        tempTeam.pokemons[index] = null;
        this.currentTeam = tempTeam;
    },

    async setCurrentPokemonAtIndex(index, pokemonId) {
        try {
            const pokemon = await getPokemon(pokemonId);
            const newTeamObject = {...this.currentTeam};
            newTeamObject.pokemons[index] = pokemon;
            this.currentTeam = newTeamObject;
        } catch (error) {
            console.error("Failed to set pokemon", error);
        }  
    },

    removeCurrentPokemonAtIndex(index) {
        this.currentTeam.pokemons[index] = null;
    },

    setCurrentTeamName (newName) {
        if (newName.length > 32) {
            return;
        } 
        const newTeamObject = {...this.currentTeam};
        newTeamObject.teamName = newName;
        this.currentTeam = newTeamObject;
    },

    //Function to fetch all user pokemon teams. Returns an array of key value pairs with the value being a pokemon team.
    async getPokemonTeams() {
        if (!this.user || !this.user.uid) {
            console.error("There is no user logged in!");
            return Promise.reject("User is not logged in.");
        }
    
        //Converts the firebase format to pokemon team format.
        function convertToPokemon(firebaseTeams) {
            return Promise.all(
                Object.values(firebaseTeams).map(async ([key, team]) => {

                    const pokemonIds = [team.id1, team.id2, team.id3, team.id4, team.id5, team.id6];
                    
                    const pokemons = await Promise.all(pokemonIds.map(id => getPokemon(id)));
    
                    return {
                        key : key,
                        teamName: team.myTeamName, 
                        pokemons: pokemons,     
                    };
                })
            );
        }
    
        // Call firebase function then convert them
        return getMyPokemonTeams(this.user)
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
    savePokemonTeam(){
        if (!this.user) {
            console.error("There is no user logged in!");
            return;
        }
        if (!isValidTeam(this.currentTeam)) {
            console.error("Invalid team format!", this.currentTeam);
            return;
        }
        console.log("User before saving team:", this.user); // Debug log
        saveMyPokemonTeam(this.user, this.currentTeam);
    },

    //Function to remove a pokemon team and return a new list of teams.
    removePokemonTeam(teamIdKey){
        if(!this.user) {
            console.error("There is no user logged in!", error)
            return;
        }
        removeMyPokemonTeam(this.user, teamIdKey);
        return this.getPokemonTeams();
    },
    
    toggleDropDown() {
        this.isDropdownVisible = !this.isDropdownVisible;
    },

    closeDropDown() {
        this.isDropdownVisible = false;
    },

    getCurrentPokemonTypeIds() {
        return pokemonIdToTypeId(this.currentPokemonId);
    },
}



export { model };

