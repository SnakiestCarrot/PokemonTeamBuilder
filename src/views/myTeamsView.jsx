
import "../myTeamStyles.css"
import { pokemonIdToTypeId } from "../utilities";
import { renderTypeImage } from "./viewUtilities";

export function MyTeamsView(props) {

    const userTeams = props.userTeams;
    const user = props.user;

    return(
        userTeams ? (
        <div>
            <div>
                <h1 className="header" key={"userTeamsHeader"}>
                    {user?.displayName ? user.displayName + "s teams" : "No user found"}
                </h1>

                {renderTeams(userTeams)}
            </div>
        </div>
        ) : (
        <div className="no-teams-or-user-found-container">
            <h1>No user teams could be found</h1>
        </div>  
        )
    )

    function renderTeams(teams) {
        if (props.loading) {
            return <div align="center"><img src="https://brfenergi.se/iprog/loading.gif"/></div>
        }
        return (
            <div>
                {teams.map(renderTeam)}
            </div>
        )
    }

    function handleEditTeamClick(team) {
        props.editTeam(team);
    }
    
    function handleDeleteTeamClick(teamKey) {
        props.deleteTeam(teamKey);
    }
    
    function renderTeam(team, index) {
        return (
            <div className="my-team-name-container" key={"team" + index}>
                <h1>{team.teamName}</h1>
                <div className="team-builder-team-container">
                    {team.pokemons.map(renderPokemon)}
                </div>
    
                <button className="my-team-remove-button" onClick={function () {handleEditTeamClick(team);}}>
                    Edit team
                </button>
                <button className="my-team-remove-button" onClick={function () {handleDeleteTeamClick(team.key);}}>
                    Delete team
                </button>
            </div>
        );
    }
    

    function handlePokemonInspectClick(pokemonId) {
        props.doPokemonInspect(pokemonId);
    }
    
    function renderPokemon(pokemon, index) {
        return (
            <div
                className="my-teams-pokemon-card"
                key={"pokemon" + index}
                onClick={function () {
                    handlePokemonInspectClick(pokemon.id);
                }}
            >
                <h3>{pokemon?.name || "No pokemon in this slot"}</h3>
                {pokemonIdToTypeId(pokemon.id).map(renderTypeImage)}
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={`${pokemon.name} sprite`}
                    className="pokemon-team-image"
                />
            </div>
        );
    }
    
}