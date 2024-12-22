import { resolvePromise } from './resolvePromise';
import { getPokemon, getPokemonSpecies, getRandomPokemon, getType } from './pokemonSource';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, getAllPokemonTeams, getMyPokemonTeams, removeMyPokemonTeam, saveMyPokemonTeam, setUserInformation, likeTeam, getLikedTeams, getLeaderboard, updateLeaderBoard, updateEditedPokemonTeam } from "./firebaseModel.js";
import { isValidTeam, extractPokemonIdFromUrl, pokemonIdToTypeId, getTypeObjects, calculateTypeAdvantage } from './utilities';
import pokemonTypeData from '../pokemonTypeData.json';

export const lowestPokemonId = 1;
export const highestPokemonId = 1025;

const model = {
    user: null,
    isDropdownVisible: false, //profile menu
    randomPokemonList: [], //random pokemon displayed at main page
    loading: false, //loading firebase info

    fetchCounts: {}, // förhindrar oändliga api calls för samma id, finns säkert ett bättre sätt men idk

    currentTeam: {
        pokemons: new Array(6),
        teamName: ""
    },

    editTeam: {
        pokemons: new Array(6),
        teamName: ""
    },

    currentTeamFull : false,
    editTeamFull : false,
    currentPokemonId: null,
    currentPokemonPromiseState : {},
    currentPokemonSpeciesPromiseState: {},
    allPokemon : [], // Full list of Pokémon
    pokemonResultPromiseState : {},
    filteredPokemon : [], // Filtered list based on search
    searchQuery : "", //searchquery for filtering pokemon
    myTeams : [], //user specific teams
    allUserTeams : [], //all teams in database
    likedTeams: {}, // Keeps track of teams the user has liked or disliked

    //Initializes the application state when reactive model is created.
    init() {
        this.loadRandomPokemonList(4);
        this.loadAllPokemon();
        this.loadAllTeams();
        this.getNewMinigamePokemons();
        this.loadLeaderboard();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user; // Set the user
                this.loadMyTeams(); // Load user-specific teams
                this.loadLikedTeams();
            }   
        });
    },

    setLoading(isLoading) {
        this.loading = isLoading;
    },

    setCurrentPokemonId(pokemonId) {
        this.currentPokemonId = pokemonId;
    },

    setCurrentTeam(team) {
        this.currentTeam = team;
    },

    setEditTeam(team){
        this.editTeam = team;
    },

    async loadInspectPokemon(pokemonId) {
        try {
            this.setCurrentPokemonId(pokemonId);
            const currentPokemonPromise = getPokemon(pokemonId);
            resolvePromise(currentPokemonPromise, this.currentPokemonPromiseState);
            const resolvedData = await currentPokemonPromise;
        } catch (error) {
            console.error("Error in loadInspectPokemon:", error);
        }
    },


    //Loads random pokemon in randomPokemonList for mainpage.
    async loadRandomPokemonList(quantity) {
        if (this.randomPokemonList.length > 0) {
            return;
        }
        try {
            const pokemonList = await getRandomPokemon(quantity); // Assuming getRandomPokemon returns a Promise
            this.randomPokemonList = pokemonList; // Update with resolved list
        } catch (error) {
            console.error("Failed to fetch Pokémon:", error);
        }
    },

    //Loads all user team on login.
    async loadMyTeams() {
        try {
            const myTeamsList = await this.getUserPokemonTeams();
            this.myTeams = myTeamsList;
        } catch (error) {
            console.error("Failed to load my teams", error);
        }
    },

    //Loads all firebase teams
    async loadAllTeams() {
        try {
            const allUserTeamsList = await this.getAllUserPokemonTeams();
            this.allUserTeams = allUserTeamsList;
        } catch (error) {
            console.error("Failed to load all user teams", error);
        }
    },

    //Function to load all pokemons from website 
    loadAllPokemon() {
        if (this.allPokemon.length > 0) {
            return;
        }

        const cachedData = localStorage.getItem("allPokemon");
        if (cachedData) {
            this.allPokemon = JSON.parse(cachedData);
            this.filteredPokemon = this.allPokemon;
            return;
        }

        const promise = getPokemon("?limit=100000");
        resolvePromise(promise, this.pokemonResultPromiseState);
        promise
            .then((data) => {
                this.allPokemon = data.results.map((pokemon) => {
                    const id = extractPokemonIdFromUrl(pokemon.url);
                    return {
                        name: pokemon.name,
                        url: pokemon.url,
                        id: id,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                    };
                });

                this.filteredPokemon = this.allPokemon;
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
    userWantsToLogin() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                model.user = result.user;
                setUserInformation(this.user);
                this.loadMyTeams();
                window.location.hash = "#/teamBuilder";
            })
            .catch((error) => {
                console.error("Login failed:", error);
            });

    },

    //Function to logout
    userWantsToLogout() {
        signOut(auth)
            .then(() => {
                this.user = null; // Ensure user state is reset
                window.location.hash = "#";
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });

        this.myTeams = null;
    },

    async doPokemonInspect(pokemonId) {
        // this is called from the teambuilder presenter that gets called from the view
        // this should set the current pokemon ID and then change to pokemon inspect page
        await this.loadInspectPokemon(pokemonId);
        window.location.hash = "#/inspect";
    },

    async getTypeObject(typeId) {
        return await getType(typeId);
    },

    async addPokemonByIdToTeam(pokemonId) {
        const index = this.currentTeam.pokemons.findIndex(pokemon => pokemon == null);

        // Means that the currentTeam is full (6 pokemon)
        if (index === -1) {
            this.currentTeamFull = true;
            return;
        }

        const pokemon = await getPokemon(pokemonId);

        const tempTeam = { ...this.currentTeam };

        tempTeam.pokemons[index] = pokemon;

        this.currentTeam = tempTeam;

        if (index === -1) {
            this.currentTeamFull = true;
        }
    },

    removePokemonAtIndexFromTeam(index) {
        const tempTeam = { ...this.currentTeam };
        tempTeam.pokemons[index] = null;
        this.currentTeam = tempTeam;
        this.currentTeamFull = false;
    },

    async setCurrentPokemonAtIndex(index, pokemonId) {
        try {
            const pokemon = await getPokemon(pokemonId);
            const newTeamObject = { ...this.currentTeam };
            newTeamObject.pokemons[index] = pokemon;
            this.currentTeam = newTeamObject;
        } catch (error) {
            console.error("Failed to set pokemon", error);
        }
    },

    setCurrentTeamName(newName) {
        if (newName.length > 32) {
            return;
        }
        const newTeamObject = { ...this.currentTeam };
        newTeamObject.teamName = newName;
        this.currentTeam = newTeamObject;
    },

    //Function to fetch all user pokemon teams. Returns an array of key value pairs with the value being a pokemon team.
    async getUserPokemonTeams() {
        if (!this.user || !this.user.uid) {
            console.error("There is no user logged in!");
            return Promise.reject("User is not logged in.");
        }

        //Converts the firebase format to pokemon team format.
        function convertToPokemon(firebaseTeams) {
            return Promise.all(
                Object.entries(firebaseTeams).map(async ([key, team]) => {
                    const pokemonIds = [team.id1, team.id2, team.id3, team.id4, team.id5, team.id6];

                    const pokemons = await Promise.all(pokemonIds.map(id => getPokemon(id)));

                    return {
                        key: key, // Use the Firebase key
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
                    return [];
                }
                return convertToPokemon(firebaseTeams);
            })
            .catch(error => {
                console.error("Error fetching teams:", error);
                throw error;
            });
    },

    async getAllUserPokemonTeams() {
        try {
            // Fetch all teams (with IDs only)
            const allTeams = await getAllPokemonTeams();

            // Convert teams by fetching Pokémon details
            const teamsWithPokemons = await Promise.all(
                allTeams.map(async (team) => {
                    const pokemons = await Promise.all(
                        team.pokemonIds.map(id => getPokemon(id)) // Fetch Pokemon details
                    );

                    return {
                        userId: team.userId,
                        userName: team.userName,
                        key: team.key,
                        teamName: team.teamName,
                        pokemons: pokemons,
                        likes: team.likes,
                    };
                })
            );
            return teamsWithPokemons;
        } catch (error) {
            console.error("Error fetching Pokémon details for all teams:", error);
            throw error;
        }
    },

    async loadLikedTeams() {
        try {
            const likedTeamsList = await getLikedTeams(this.user);
            this.likedTeams = likedTeamsList;
        } catch (error) {
            console.error("Failed to load liked teams", error);
        }
    },

    //Function to toggle likes on team. Both saves the result to firebase and toggles locally.
    async toggleLikeTeam(teamId, teamAuthorId) {
        if (!this.user) {
            console.error("User must be logged in to like/dislike teams.");
            return;
        }
    
        const isLiked = this.likedTeams[teamId] || false;
        const newLikedState = !isLiked;
    
        try {
            await likeTeam(this.user.uid, teamId, newLikedState, teamAuthorId);
    
            this.likedTeams[teamId] = newLikedState;
    
            const team = this.allUserTeams.find((t) => t.key === teamId);
            if (team) {
                team.likes = (team.likes || 0) + (newLikedState ? 1 : -1);
            }
            await this.loadLikedTeams();
        } catch (error) {
            console.error("Failed to toggle like for team:", error);
        }
    },
    
    
    
    //Function to save my pokemon team
    savePokemonTeam() {
        if (!this.user) {
            console.error("There is no user logged in!");
            return;
        }
        if (!isValidTeam(this.currentTeam)) {
            console.error("Invalid team format!", this.currentTeam);
            return;
        }
        saveMyPokemonTeam(this.user, this.currentTeam);
        this.loadMyTeams();

        const emptyTeam = {
            pokemons: new Array(6),
            teamName: ""
        };
        this.currentTeam = emptyTeam;
    },

    //Function to remove a pokemon team and return a new list of teams.
    async removePokemonTeam(teamIdKey) {
        if (!this.user) {
            console.error("There is no user logged in!", error)
            return;
        }

        try {
            await removeMyPokemonTeam(this.user, teamIdKey);
            this.loadMyTeams();
        }
        catch (error) {
            console.error("Couldn't remove team:", error);
            throw error;
        }
    },

    async editPokemonTeam(team) {
        window.location.hash = "#/teameditor";
        this.editTeam = team;
    },

    removePokemonAtIndexFromEditTeam(index) {
        const tempTeam = { ...this.editTeam };
        tempTeam.pokemons[index] = null;
        this.editTeam = tempTeam;
        //this.currentTeamFull = false;
    },

    setEditTeamName(newName) {
        if (newName.length > 32) {
            return;
        }
        const newTeamObject = { ...this.editTeam };
        newTeamObject.teamName = newName;
        this.editTeam = newTeamObject;
    },

    async addPokemonByIdToEditTeam(pokemonId) {
        const index = this.editTeam.pokemons.findIndex(pokemon => pokemon == null);

        // Means that the currentTeam is full (6 pokemon)
        if (index === -1) {
            this.editTeamFull = true;
            return;
        }

        const pokemon = await getPokemon(pokemonId);

        const tempTeam = { ...this.editTeam };

        tempTeam.pokemons[index] = pokemon;

        this.editTeam = tempTeam;

        if (index === -1) {
            this.editTeamFull = true;
        }
    },

    saveEditedPokemonTeam() {
        if (!this.user) {
            console.error("There is no user logged in!");
            return;
        }
        if (!isValidTeam(this.editTeam)) {
            console.error("Invalid team format!", this.editTeam);
            return;
        }
        updateEditedPokemonTeam(this.user, this.editTeam);
        this.loadMyTeams();

        const emptyTeam = {
            pokemons: new Array(6),
            teamName: ""
        };
        this.editTeam = emptyTeam;
        window.location.hash = "#/teams";
    },


    async fetchPokemonSpecies(pokemonSpeciesId) {
        try {
            const currentPokemonSpeciesPromise = getPokemonSpecies(pokemonSpeciesId);
            resolvePromise(currentPokemonSpeciesPromise, this.currentPokemonSpeciesPromiseState);
    
            // Await to ensure the fetch completes
            await currentPokemonSpeciesPromise;
        } catch (error) {
            console.error("Error in fetchPokemonSpecies:", error);
        }
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

    // Minigame stuff
    minigameIsStarted : false,
    minigamePokemons : [],
    minigameBufferPokemons: [],
    minigameTypeAdvantage: null,
    minigameCurrentScore: 0,
    minigameLastChoiceWasCorrect: true,
    highscore: new Array(10),

    async startMinigame() {
        this.minigameCurrentScore = 0;
        this.minigameLastChoiceWasCorrect = true;
        this.minigameIsStarted = true
        await this.getNewMinigamePokemons();
    },

    endMinigame() {
        this.minigameIsStarted = false;
        this.minigameLastChoiceWasCorrect = false;
    },

    minigameCorrectChoice() {
        // if statement to fix bug
        if (this.minigameLastChoiceWasCorrect) {
            this.getNewMinigamePokemons();
            this.minigameLastChoiceWasCorrect = true;
            this.minigameCurrentScore++;
        }
    },

    minigameWrongChoice() {
        this.minigameLastChoiceWasCorrect = false;
        if (this.minigameCurrentScore > 0) {
            this.updateHighScoreLeaderboard();
        }
    },

    // choice = 0 if first pokemon, 2 if tie and 1 if second pokemon
    minigameChoosePokemon(choice) {
        choice
        if (this.minigameTypeAdvantage > 1 && choice === 0) {
            this.minigameCorrectChoice();
        } else if (this.minigameTypeAdvantage === 1 && choice === 2) {
            this.minigameCorrectChoice();
        } else if (this.minigameTypeAdvantage < 1 && choice === 1) {
            this.minigameCorrectChoice();
        } else {
            this.minigameWrongChoice();
        }
    },

    async getNewMinigamePokemons() {

        function getNames(typeObject) {
            return typeObject.name;
        }

        this.minigamePokemons = this.minigameBufferPokemons;

        this.minigameBufferPokemons = await getRandomPokemon(2);

        const minigamePokemonTypeArray = [];

        const firstPokemonTypes = await getTypeObjects(this.minigamePokemons[0].id)
        const secondPokemonTypes = await getTypeObjects(this.minigamePokemons[1].id)
       
        const firstPokemonTypeName = firstPokemonTypes.map(getNames)
        const secondPokemonTypeName = secondPokemonTypes.map(getNames)

        minigamePokemonTypeArray.push(firstPokemonTypeName)
        minigamePokemonTypeArray.push(secondPokemonTypeName)
        
        const typeAdvantage = calculateTypeAdvantage(minigamePokemonTypeArray);

        this.minigameTypeAdvantage = typeAdvantage;
    },

    //Updates the leaderboard if user is logged in
    async updateHighScoreLeaderboard() {
        if (!this.user) {
            console.error("User is not logged in!");
            return;
        }
        try {
            await updateLeaderBoard(this.user, this.minigameCurrentScore);
            await this.loadLeaderboard();
        } catch (error) {
            console.error("Failed to update leaderboard:", error);
        }
    },
    

    //Loads the leaderboard from firebase
    async loadLeaderboard() {
        try {
            const leaderboard = await getLeaderboard();
            this.highscore = leaderboard; 
            console.log("Fetched leaderboard successfully:", leaderboard);
        } catch (error) {
            console.error("Failed to fetch the leaderboard:", error);
        }
    },
    
    
}



export { model };

