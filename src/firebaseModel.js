import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push, remove, update, runTransaction } from "firebase/database";
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
    var pokemonArray = new Array(6);
    var editArray = new Array(6);
    for (var index = 0; index < 6; index++) {
        if (model.currentTeam.pokemons[index]) {
            pokemonArray[index] = model.currentTeam.pokemons[index].id;
        } else {
            pokemonArray[index] = null;
        }
    }

    for (var index = 0; index < 6; index++) {
        if (model.editTeam.pokemons[index]) {
            editArray[index] = model.editTeam.pokemons[index].id;
        } else {
            editArray[index] = null;
        }
    }

    var persistenceData = {
        currentPokemons: pokemonArray,
        editPokemons: editArray,
        editPokemonsTeamName : model.editTeam.teamName || "",
        currentTeamName: model.currentTeam.teamName || "",
        inspectPokemonId: model.currentPokemonId || null
    };

    return persistenceData;
}


export function persistenceToModel(persistenceData, model) {
    function savePokemonTeamToModel(pokemonTeam) {
        var teamWithSixSlots = new Array(6);
        for (var i = 0; i < 6; i++) {
            teamWithSixSlots[i] = pokemonTeam[i] || null;
        }

        model.setCurrentTeam({
            teamName: model.currentTeam.teamName,
            pokemons: teamWithSixSlots
        });
    }

    function saveEditTeamToModel(editPokemonTeam) {
        var editTeamWithSixSlots = new Array(6);
        for (var i = 0; i < 6; i++) {
            editTeamWithSixSlots[i] = editPokemonTeam[i] || null;
        }

        model.setEditTeam({
            teamName: persistenceData.editPokemonsTeamName || "",
            pokemons: editTeamWithSixSlots
        });
    }

    if (!persistenceData) {
        model.setCurrentTeam({
            teamName: "",
            pokemons: new Array(6).fill(null)
        });
        model.setEditTeam({
            teamName: "",
            pokemons: new Array(6).fill(null)
        });
        model.setCurrentPokemonId(null);
        return;
    }

    if (persistenceData.inspectPokemonId !== undefined) {
        model.loadInspectPokemon(persistenceData.inspectPokemonId);
    } else {
        model.setCurrentPokemonId(null);
    }
    model.setCurrentTeamName(persistenceData.currentTeamName || "");

    var currentPokemonIds = Array.isArray(persistenceData.currentPokemons)
        ? persistenceData.currentPokemons
        : new Array(6).fill(null);

    var editPokemonIds = Array.isArray(persistenceData.editPokemons)
        ? persistenceData.editPokemons
        : new Array(6).fill(null);

    return Promise.all([
        getPokemonsFromArray(currentPokemonIds),
        getPokemonsFromArray(editPokemonIds)
    ])
        .then(function (results) {
            savePokemonTeamToModel(results[0]);
            saveEditTeamToModel(results[1]);
        })
        .catch(function (error) {
            console.error("Error fetching Pokémon team:", error);
            model.setCurrentTeam({
                teamName: persistenceData.currentTeamName || "",
                pokemons: new Array(6).fill(null)
            });
            model.setEditTeam({
                teamName: persistenceData.editPokemonsTeamName || "",
                pokemons: new Array(6).fill(null)
            });
        });
}




export function saveToFirebase(model) {
    if (model.user && model.ready) {
        const persistenceData = modelToPersistence(model);

        set(ref(db, `PokemonTeamBuilder/${model.user.uid}/model`), persistenceData)
            .catch((error) => console.error("Error saving data:", error));
    }
}

export function readFromFirebase(model) {
    if (model.user) {
        model.setLoading(true);

        function persistenceToModelACB(snapshot) {
            return persistenceToModel(snapshot.val(), model);
        }

        function modelReadyACB() {
            model.ready = true;
            model.setLoading(false);
        }

        model.ready = false;
        return get(ref(db, `PokemonTeamBuilder/${model.user.uid}/model`))
            .then(persistenceToModelACB)
            .then(modelReadyACB)
            .catch(function (error) {
                console.error("Error reading from Firebase:", error);
                model.setLoading(false);
            });
    }
}


export function connectToFirebase(model, watchFunction) {
    function checkModelPropertiesACB() {
        return [model.currentTeam, model.currentPokemonId, model.editTeam];
    }

    function saveModelToFirebaseACB() {
        saveToFirebase(model);
    }

    function watchFunctionACB() {
        watchFunction(checkModelPropertiesACB, saveModelToFirebaseACB);
    }

    function loginOrOutACB(user) {
        model.user = user;
        model.ready = false;

        if (model.user) {
            readFromFirebase(model)
                .then(function () {
                    watchFunctionACB();
                })
                .catch(function (error) {
                    console.error("Error reading from Firebase:", error);
                });
        } else {
            model.setCurrentTeam({
                teamName: "",
                pokemons: new Array(6).fill(null)
            });
            model.setEditTeam({
                teamName: "",
                pokemons: new Array(6).fill(null)
            });
            model.setCurrentPokemonId(null);
            model.pokemonSearchACB("");
            model.myTeams = null;
            window.location.hash = "#";
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
        .catch(error => {
            console.error("Error saving team:", error);
        });
}

export function updateEditedPokemonTeam(user, team) {
    if (!user || !user.uid) {
        console.error("Error: User or User UID is not defined. Cannot save team.");
        return;
    }

    const updates = {
        id1: team.pokemons[0].id,
        id2: team.pokemons[1].id,
        id3: team.pokemons[2].id,
        id4: team.pokemons[3].id,
        id5: team.pokemons[4].id,
        id6: team.pokemons[5].id,
        myTeamName: team.teamName
    };

    update(ref(db, `PokemonTeamBuilder/${user.uid}/teams/${team.key}`), updates)
        .catch(error => {
            console.error("Error updating team:", error);
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
                const teamsData = snapshot.val();
                const validTeams = Object.entries(teamsData)
                    .filter(([teamId, team]) => {
                        const hasValidIds = team.id1 && team.id2 && team.id3 && team.id4 && team.id5 && team.id6;
                        return hasValidIds && team.myTeamName;
                    })
                    .reduce((acc, [teamId, team]) => {
                        acc[teamId] = team; 
                        return acc;
                    }, {});
                return validTeams;
            } else {
                return {};
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
        .catch(error => {
            console.error(`Failed to remove team with ID "${teamId}":`, error);
            throw error;
        });
}

//Function to get all user pokemon teams. 
export async function getAllPokemonTeams() {
    const rootRef = ref(db, `PokemonTeamBuilder`);

    async function fetchAllTeams(allUsersData) {
        const allTeams = [];

        for (const [userId, userData] of Object.entries(allUsersData)) {
            if (userData.teams) {
                for (const [teamId, team] of Object.entries(userData.teams)) {
                    const hasValidIds = team.id1 && team.id2 && team.id3 && team.id4 && team.id5 && team.id6;
                    if (hasValidIds && team.myTeamName) {
                        allTeams.push({
                            userId: userId,
                            userName: userData.info?.displayName || userId,
                            likes: team.likes ?? 0, // Use the actual Firebase value for likes, default to 0 if undefined
                            key: teamId,
                            teamName: team.myTeamName,
                            pokemonIds: [
                                team.id1, team.id2, team.id3, 
                                team.id4, team.id5, team.id6
                            ]
                        });
                    }
                }
            }
        }
        return allTeams;
    }

    try {
        const snapshot = await get(rootRef);
        if (snapshot.exists()) {
            const allUsersData = snapshot.val();
            return fetchAllTeams(allUsersData); 
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error retrieving all teams from Firebase:", error);
        throw error;
    }
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


export function likeTeam(userId, teamId, isLiked, teamAuthorId) {
    const teamRefPath = `PokemonTeamBuilder/${teamAuthorId}/teams/${teamId}/likes`;
    const userLikedTeamsRefPath = `PokemonTeamBuilder/${userId}/likedTeams/${teamId}`;

    return get(ref(db, teamRefPath))
        .then((snapshot) => {
            const currentLikes = snapshot.exists() ? snapshot.val() : 0;
            const newLikes = isLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1); // Prevent negative likes

            const updates = {};
            updates[teamRefPath] = newLikes;
            updates[userLikedTeamsRefPath] = isLiked;

            return update(ref(db), updates);
        })
        .catch((error) => {
            console.error("Error updating likes:", error);
        });
}

// Function to fetch liked teams for a user
export function getLikedTeams(user) {
    const userLikedTeamsRef = ref(db, `PokemonTeamBuilder/${user.uid}/likedTeams`);
    return get(userLikedTeamsRef)
        .then(snapshot => (snapshot.exists() ? snapshot.val() : {}))
        .catch(error => {
            console.error("Error fetching liked teams:", error);
        });
}


//Function to update the leaderboard and sort 10 entries.
export function updateLeaderBoard(user, minigameCurrentScore) {
    const db = getDatabase();
    const leaderboardRef = ref(db, "Leaderboard");

    return runTransaction(leaderboardRef, (leaderboard) => {
        if (!leaderboard) {
            leaderboard = [];
        }

        const sortedLeaderboard = leaderboard.slice(0, 10);
        let lowestScoreIndex = -1;
        let lowestScore = Infinity;

        for (let i = 0; i < sortedLeaderboard.length; i++) {
            if (sortedLeaderboard[i].score < lowestScore) {
                lowestScore = sortedLeaderboard[i].score;
                lowestScoreIndex = i;
            }
        }

        if (sortedLeaderboard.length < 10 || minigameCurrentScore > lowestScore) {
            const newEntry = {
                userId: user.uid,
                userName: user.displayName || "Anonymous",
                score: minigameCurrentScore,
            };

            if (sortedLeaderboard.length < 10) {
                sortedLeaderboard.push(newEntry);
            } else {
                sortedLeaderboard[lowestScoreIndex] = newEntry;
            }

            sortedLeaderboard.sort((a, b) => b.score - a.score);
        }

        return sortedLeaderboard; 
    }).then((result) => {
        if (result.committed) {
            console.log("Leaderboard updated successfully.");
        } else {
            console.warn("Leaderboard update transaction was aborted.");
        }
    }).catch((error) => {
        console.error("Failed to update leaderboard:", error);
    });
}


//Function to fetch the leaderboard
export async function getLeaderboard() {
    const db = getDatabase();
    const leaderboardRef = ref(db, "Leaderboard");

    try {
        const snapshot = await get(leaderboardRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            return Array.isArray(data) ? data : Object.values(data); 
        } else {
            console.warn("No leaderboard found in the database.");
            return [];
        }
    } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        throw error;
    }
}


export { auth };
