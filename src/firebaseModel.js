import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { firebaseConfig } from "/src/firebaseConfig.js";

//Init firebase db
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


/*TODO
1. Create modelToPersistence, persistenceToModel, readFromFirebase, saveToFirebase, connectToFirebase
2. Try with dummy data
3. Try to implement eparate listeners for each different data
4. Done for now with empty listener list in the reaction-functionn
5. Implement per-user persistence
6. Implement Google login
7. Update security rules in firebase with userspecific rules.
*/

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
