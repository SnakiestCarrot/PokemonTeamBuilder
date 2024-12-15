

export function MyTeamsView(props) {

    const userTeams = props.userTeams;
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
            <div>
                {teams.map(renderTeam)}
            </div>
        )

    }

    function renderTeam(team, index) {
        return (
            <div key={"team" + index}> 
                <h1>{team.teamName}</h1>
                <div className="team-builder-team-container">
                    {team.pokemons.map(renderPokemon)}
                </div>
                
                <button className="pokemon-team-button">Delete team</button>
            </div>
           
        )

    }

    function renderPokemon(pokemon, index) {
        return (
            <div className="pokemon-card" key={"pokemon" + index}>
                
                <p>{pokemon?.name || "No pokemon in this slot"}</p>


                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={`${pokemon.name} sprite`}
                    className="pokemon-team-image"
                />
            </div>
        )
    }

}