import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push, remove } from "firebase/database";
import { firebaseConfig } from "/src/firebaseConfig.js";
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { model } from "./pokemonModel";

//Init firebase db
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Init authorization
const auth = getAuth(app);


export function modelToPersistence(model) {
    return 
    {
        //TODO 
    };
}

export function persistenceToModel(persistenceData, model) {
    //TODO peristenceToModel depends on if there is data in 
    //firebase. Look at dinnerplanner.
}

export function saveToFirebase(model) {
    // saveToFirebase: 
    // -----------------
    // do nothing if model.user falsy
    // otherwise write to the same path as above, 
    // depending on model.ready as usual
    if (model.user) {
        if (model.ready) {
            set(ref(db,"PokemonTeamBuilder/"+model.user.uid), modelToPersistence(model));
        }
    } else {
        //TODO: wipe data??
    }
}

export function readFromFirebase(model) {
// readFromFirebase: 
// -----------------
// do nothing if model.user falsy (maybe wipe the model data)
// otherwise read from "path/"+model.user.uid
// manage model.ready as 
    if (model.user) {
        function persistenceToModelACB(snapshot) {
            return persistenceToModel(snapshot.val(), model);
        }
    
        function modelReadyACB() {
            model.ready = true;
        }
    
        model.ready = false;
        return get(ref(db, "PokemonTeamBuilder/"+model.user.uid)).then(persistenceToModelACB).then(modelReadyACB);
    } else {
        //TODO: Wipe data?
    }
}

export function connectToFirebase(model, watchFunction) {
    function checkModelPropertiesACB(){
        
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

        if (user) {
            readFromFirebase(model).then (() => {
                watchFunctionACB();
            }).catch((error) => {
                console.error("Error reading from Firebase:", error);
            });
        } else {
            //TODO: wipe data?? Or set to default?
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





// UI: 
// - model.user undefined: show suspense because firebase auth not initialized yet
// - model.user null: shouw "sign in" UI (a button/link that triggers signInWithPopup, see below)
// - model.user truthy: should the App (based on model.ready!) with the "sign out" UI


export { auth };
