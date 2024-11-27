import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { firebaseConfig } from "/src/firebaseConfig.js";

//Init firebase db
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Define reference and data
const REF = "test";
const rf = ref(database, REF); // Use the initialized database


/*TODO
1. Create firebaseToModel, modelToFirebase, readFromFirebase, saveToFirebase, connectToFirebase
2. Try with dummy data
3. Try to implement eparate listeners for each different data
4. Done for now with empty listener list in the reaction-functionn
5. Implement per-user persistence
6. Implement Google login
7. Update security rules in firebase with userspecific rules.
*/

export function modelToPersistence(model){
    //TODO: Check model data.
    return {
        dummyData : 0 
    }
}