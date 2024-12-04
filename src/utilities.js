// Function to validate the team format
export function isValidTeam(team) {
    const teamKeys = ["pokemon1", "pokemon2", "pokemon3", "pokemon4", "pokemon5", "pokemon6", "teamName"];
    const valid = team &&
        typeof team === "object" &&
        teamKeys.every(key => key in team) &&
        Object.keys(team).length === teamKeys.length &&
        typeof team.teamName === "string" &&
        ["pokemon1", "pokemon2", "pokemon3", "pokemon4", "pokemon5", "pokemon6"].every(
            key => typeof team[key] === "object" 
        );
    return valid;
}