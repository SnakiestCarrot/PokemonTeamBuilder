

export function MyTeamsView(props) {

    const userTeams = props.testTeams;
    const user = props.user;

    return (
        <div>
            <h1 className="header" key={"userTeamsHeader"}>
                {user?.displayName ? user.displayName + "s teams" : "No user logged in"}
            </h1>

            {renderTeams(userTeams)}
        </div>
    )

    function renderTeams(teams) {
        return (
            teams.map(renderTeam)
        )

    }

    function renderTeam(team, index) {
        return (
            <div key={"team" + index}> 
                <h1>{team.teamName}</h1>
                {team.pokemons.map(renderPokemon)}
                <button className="pokemon-team-button">Delete team</button>
            </div>
           
        )

    }

    function renderPokemon(pokemon, index) {
        return (
            <div className="pokemon-card" key={"pokemon" + index}>
                <p>{pokemon?.name || "No pokemon in this slot"}</p>

            </div>
        )
    }

}