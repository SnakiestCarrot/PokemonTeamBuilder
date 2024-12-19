import "../myTeamStyles.css";
import { pokemonIdToTypeId } from "../utilities";
import { renderTypeImage } from "./viewUtilities";

export function BrowseTeamsView(props) {
    const teams = props.allTeams;

    if (!props.user) {
        return (
            <div className="no-teams-or-user-found-container">
                <h1>No user could be found</h1>
                <h2>Login to browse teams!</h2>
            </div>
        );
    }

    return (
        <div>
            <h1 className="header" key={"browseTeamsHeader"}>
                {"Top rated user teams:"}
            </h1>
            {renderTeams(teams)}
        </div>
    );

    function toggleLikeTeam(teamKey) {
        props.userClicksLikeButton(teamKey);
    }

    function renderTeams(teams) {
        return (
            <div>
                {teams.map(renderTeam)}
            </div>
        );
    }

    function renderTeam(team, index) {
        const isLiked = props.likedTeams?.[team.key] || false; // Check if the user has liked this team

        return (
            <div className="my-team-name-container" key={`team-${team.key}`}> 
                <h1>{team.teamName}</h1>
                <h3>By: {team.userName}</h3>
                <div className="team-builder-team-container">
                    {team.pokemons.map((pokemon, pokemonIndex) =>
                        renderPokemon(pokemon, pokemonIndex, team.key)
                    )}
                </div>
                {/* Like/Dislike Button and Like Count */}
                <div className="team-actions">
                    <button
                        className={`like-button ${isLiked ? "liked" : ""}`}
                        onClick={() => toggleLikeTeam(team.key)}
                    >
                        {isLiked ? "Unlike" : "Like"}
                    </button>
                    <span className="like-count">{team.likes || 0} likes</span>
                </div>
            </div>
        );
    }

    function renderPokemon(pokemon, index, teamKey) {
        return (
            <div
                className="my-teams-pokemon-card"
                key={`pokemon-${teamKey}-${index}-${pokemon?.id || "empty"}`}
                onClick={() => props.doPokemonInspect(pokemon?.id)}
            >
                <h3>{pokemon?.name || "No pokemon in this slot"}</h3>
                {pokemon?.id && pokemonIdToTypeId(pokemon.id).map(renderTypeImage)}
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id || "0"}.png`}
                    alt={`${pokemon?.name || "No Pokémon"} sprite`}
                    className="pokemon-team-image"
                />
            </div>
        );
    }
}
