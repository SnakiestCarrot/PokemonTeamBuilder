import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push, remove } from "firebase/database";
import { firebaseConfig } from "/src/firebaseConfig.js";
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { model } from "./pokemonModel";
import { getPokemonsFromArray } from "./pokemonSource";

//Init firebase db
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Init authorization
const auth = getAuth(app);


export function modelToPersistence(model) {
    // Always create an array with exactly 6 slots
    const pokemonArray = new Array(6).fill(null).map((_, index) => {
        return model.currentTeam.pokemons[index]?.id || null;
    });

    const persistenceData = {
        currentPokemons: pokemonArray,
        currentTeamName: model.currentTeam.teamName || "",
        inspectPokemonId: model.currentPokemonId || null,
    };

    console.log("Persisting data to Firebase:", persistenceData);
    return persistenceData;
}


export function persistenceToModel(persistenceData, model) {
    function savePokemonTeamToModel(pokemonTeam) {
        console.log("Loaded Pokémon team before ensuring 6 slots:", pokemonTeam);

        // Enforce exactly 6 slots in the team
        const teamWithSixSlots = new Array(6).fill(null).map((_, i) => pokemonTeam[i] || null);

        // Use model.setCurrentTeam instead of directly assigning the team
        model.setCurrentTeam({
            teamName: model.currentTeam.teamName,
            pokemons: teamWithSixSlots,
        });

        console.log("Final processed Pokémon team:", model.currentTeam);
    }

    if (!persistenceData) {
        console.log("No persistence data found. Initializing default team.");
        model.setCurrentTeam({
            teamName: "",
            pokemons: new Array(6).fill(null),
        });
        model.pokemonSearchACB("");
        model.setCurrentPokemonId(null);
        return;
    }

    model.setCurrentPokemonId(persistenceData.inspectPokemonId ?? null);
    model.setCurrentTeamName(persistenceData.currentTeamName ?? "");

    const pokemonIds = persistenceData.currentPokemons || new Array(6).fill(null);

    return getPokemonsFromArray(pokemonIds)
        .then((pokemonTeam) => {
            console.log("Loaded Pokémon team:", pokemonTeam);
            savePokemonTeamToModel(pokemonTeam);
        })
        .catch((error) => {
            console.error("Error fetching Pokémon team:", error);
            model.setCurrentTeam({
                teamName: persistenceData.currentTeamName ?? "",
                pokemons: new Array(6).fill(null),
            });
        });
}



export function saveToFirebase(model) {
    if (model.user && model.ready) {
        const persistenceData = modelToPersistence(model);

        set(ref(db, `PokemonTeamBuilder/${model.user.uid}/model`), persistenceData)
            .then(() => console.log("Data successfully saved to Firebase."))
            .catch((error) => console.error("Error saving data:", error));
    }
}


export function readFromFirebase(model) {
    if (model.user) {
        model.setLoading(true); // Start loading

        function persistenceToModelACB(snapshot) {
            console.log("Persistence data from Firebase:", snapshot.val());
            return persistenceToModel(snapshot.val(), model);
        }

        function modelReadyACB() {
            model.ready = true;
            model.setLoading(false); // Finish loading
        }

        model.ready = false;
        return get(ref(db, `PokemonTeamBuilder/${model.user.uid}/model`))
            .then(persistenceToModelACB)
            .then(modelReadyACB)
            .catch((error) => {
                console.error("Error reading from Firebase:", error);
                model.setLoading(false);
            });
    }
}


export function connectToFirebase(model, watchFunction) {
    function checkModelPropertiesACB(){
        return [model.currentTeam, model.currentPokemonId];
    }
    function saveModelToFirebaseACB(){
        saveToFirebase(model);
    }
  
    function watchFunctionACB(){
        watchFunction(checkModelPropertiesACB, saveModelToFirebaseACB);
    }

    function loginOrOutACB(user) {
        model.user= user
        model.ready=false

        if (model.user) {
            readFromFirebase(model).then (() => {
                watchFunctionACB();
            }).catch((error) => {
                console.error("Error reading from Firebase:", error);
            });
        } else {
            console.log("User logged out, resetting model.");
            model.setCurrentTeam({
                teamName: "",
                pokemons: new Array(6).fill(null),
            });
            model.setCurrentPokemonId(null);
            model.pokemonSearchACB("");
        }
    }

    onAuthStateChanged(auth, loginOrOutACB);
}

//Function to save a finished pokemon team to user firebase.
export function saveMyPokemonTeam(user, team) {
    if (!user || !user.uid) {
        console.error("Error: User or User UID is not defined. Cannot save team.");
        return;
    }
    console.log("Saving team to Firebase:", team);
    const firebaseTeam = {
        id1 : team.pokemons[0].id,
        id2 : team.pokemons[1].id,
        id3 : team.pokemons[2].id,
        id4 : team.pokemons[3].id,
        id5 : team.pokemons[4].id,
        id6 : team.pokemons[5].id,
        myTeamName : team.teamName
    };
    push(ref(db, `PokemonTeamBuilder/${user.uid}/teams`), firebaseTeam)
        .then(() => {
            console.log("Team successfully saved!");
        })
        .catch(error => {
            console.error("Error saving team:", error);
        });
}

// Function to get all saved user teams from Firebase
export function getMyPokemonTeams(user) {
    if (!user || !user.uid) {
        console.error("Error: User or User UID is not defined.");
        return Promise.reject("User or UID is required to fetch teams.");
    }

    const teamsRef = ref(db, `PokemonTeamBuilder/${user.uid}/teams`);

    return get(teamsRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val(); // Return the object as is
            } else {
                console.log("No teams found for this user.");
                return {}; // Return an empty object
            }
        })
        .catch((error) => {
            console.error("Error retrieving teams from Firebase:", error);
            throw error;
        });
}


//Function to remove a specific pokemon team based on that unique key
export function removeMyPokemonTeam(user, teamId){
    if (!teamId) {
        console.error("No team ID provided for removal!");
        return;
    }
    if (!user) {
        console.error("No user provided for removal of team!");
        return;
    }
    const teamRef = ref(db, `PokemonTeamBuilder/${user.uid}/teams/${teamId}`);

    return remove(teamRef)
        .then(() => {
            console.log(`Team with ID "${teamId}" successfully removed.`);
        })
        .catch(error => {
            console.error(`Failed to remove team with ID "${teamId}":`, error);
            throw error;
        });
}

//Function to get all user pokemon teams. 
export function getAllPokemonTeams() {
    const rootRef = ref(db, `PokemonTeamBuilder`);

    // Simplify to return team data without calling getPokemon
    async function fetchAllTeams(allUsersData) {
        const allTeams = [];

        for (const [userId, userData] of Object.entries(allUsersData)) {
            if (userData.teams) {
                for (const [teamId, team] of Object.entries(userData.teams)) {
                    allTeams.push({
                        userId: userId,
                        userName: userData.info?.displayName || userId,
                        key: teamId, // Firebase team ID
                        teamName: team.myTeamName,
                        pokemonIds: [
                            team.id1, team.id2, team.id3, 
                            team.id4, team.id5, team.id6
                        ]
                    });
                }
            }
        }

        return allTeams;
    }

    return get(rootRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const allUsersData = snapshot.val();
                return fetchAllTeams(allUsersData); // Return teams with Pokemon IDs
            } else {
                console.log("No teams found for any users.");
                return [];
            }
        })
        .catch((error) => {
            console.error("Error retrieving all teams from Firebase:", error);
            throw error;
        });
}

export function setUserInformation(user) {
    try {
        set(ref(db, `PokemonTeamBuilder/${user.uid}/info`), {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        });
    } catch (error) {
        console.error("Error trying to set user information in firebase", error);
    }
}




// UI: 
// - model.user undefined: show suspense because firebase auth not initialized yet
// - model.user null: shouw "sign in" UI (a button/link that triggers signInWithPopup, see below)
// - model.user truthy: should the App (based on model.ready!) with the "sign out" UI


export { auth };
