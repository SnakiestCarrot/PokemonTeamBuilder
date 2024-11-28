import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue, child } from "firebase/database";
import { firebaseConfig } from "/src/firebaseConfig.js";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

//Init firebase db
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Init authorization
const auth = getAuth(app);


export function modelToPersistence(model) {
    // Transform the pokemon object to its id
    function transformToPokemonId(pokemonObject) {
        if (pokemonObject && pokemonObject.id) {
            return pokemonObject.id; 
        }
        return null;
    }

    // Transform and sort the team
    function transformAndSortTeam(team) {
        // Convert currentTeam object to an array of [key, value] pairs
        const transformedTeam = Object.entries(team)  // Converts the object into an array of [key, value] pairs
            .map(function(entry) {  
                return transformToPokemonId(entry[1]); 
            })
            .filter(function(id) {  
                return id !== null;  
            })
            .sort(function(a, b) {  
                return a - b; 
            });

        return transformedTeam;
    }

    return {
        currentPokemonSearchId: model.currentPokemonId,
        currentTeamBuilt: transformAndSortTeam(model.currentTeam) // Use transformAndSortTeam for the currentTeam
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

// UI: 
// - model.user undefined: show suspense because firebase auth not initialized yet
// - model.user null: shouw "sign in" UI (a button/link that triggers signInWithPopup, see below)
// - model.user truthy: should the App (based on model.ready!) with the "sign out" UI


export { auth };
