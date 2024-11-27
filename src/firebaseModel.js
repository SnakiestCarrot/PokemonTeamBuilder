import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { firebaseConfig } from "/src/firebaseConfig.js";

//Init firebase db
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Define reference and data
const REF = "test";
const rf = ref(database, REF); // Use the initialized database
