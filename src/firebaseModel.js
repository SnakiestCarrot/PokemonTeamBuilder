import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push, remove } from "firebase/database";
import { firebaseConfig } from "/src/firebaseConfig.js";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
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
export function saveMyPokemonTeam(team) {
    const firebaseTeam = {
        id1 : team.pokemon1.id,
        id2 : team.pokemon2.id,
        id3 : team.pokemon3.id,
        id4 : team.pokemon4.id,
        id5 : team.pokemon5.id,
        id6 : team.pokemon6.id,
        myTeamName : team.teamName
    };
    push(ref(db, `PokemonTeamBuilder/${model.user.uid}/teams`), firebaseTeam)
        .then(() => {
            console.log("Team successfully saved!");
        })
        .catch(error => {
            console.error("Error saving team:", error);
        });
}

//Function to get all saved user teams from firebase.
export function getMyPokemonTeams(){
    const teamsRef = ref(db, `PokemonTeamBuilder/${model.user.uid}/teams`);

    return get(teamsRef)
        .then(snapshot => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No teams found for this user.");
                return {};
            }
        })
        .catch(error => {
            console.error("Error retrieving teams:", error);
            throw error;
        });
}

//Function to remove a specific pokemon team based on that unique key
export function removeMyPokemonTeam(teamId){
    if (!teamId) {
        console.error("No team ID provided for removal!");
        return;
    }
    const teamRef = ref(db, `PokemonTeamBuilder/${model.user.uid}/teams/${teamId}`);

    return remove(teamRef)
        .then(() => {
            console.log(`Team with ID "${teamId}" successfully removed.`);
        })
        .catch(error => {
            console.error(`Failed to remove team with ID "${teamId}":`, error);
            throw error;
        });
}


// UI: 
// - model.user undefined: show suspense because firebase auth not initialized yet
// - model.user null: shouw "sign in" UI (a button/link that triggers signInWithPopup, see below)
// - model.user truthy: should the App (based on model.ready!) with the "sign out" UI


export { auth };
