import "../myTeamStyles.css";
import { pokemonIdToTypeId } from "../utilities";
import { renderTypeImage } from "./viewUtilities";

export function BrowseTeamsView(props) {
    const teams = props.allTeams;

    if (!props.user) {
        return;
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
   
        const sortedTeams = [...teams].sort((a, b) => (b.likes || 0) - (a.likes || 0));
        
        return (
            <div>
                {sortedTeams.map(renderTeam)}
            </div>
        );
    }

    function renderTeam(team, index) {
    const isLiked = props.likedTeams?.[team.key] || false; // Check if the user has liked this team

    return (
        <div className="my-team-name-container" key={`team-${team.key}`}>
            <div className="team-header">
                <h3 className="team-title">
                    Teamname: <span className="team-name">{team.teamName}</span> &nbsp;&nbsp; By: <span className="team-author">{team.userName}</span>
                </h3>
            </div>
            <div className="team-flex-container">
                <div className="team-actions-left">
                    <span className="heart-like-count">{team.likes || 0} likes</span>
                    <button
                        className={`heart-like-button ${isLiked ? "liked" : ""}`}
                        onClick={() => toggleLikeTeam(team.key)}
                    >
                        {isLiked ? "❤️" : "🤍"}
                    </button>
                </div>
                <div className="team-builder-team-container">
                    {team.pokemons.map((pokemon, pokemonIndex) =>
                        renderPokemon(pokemon, pokemonIndex, team.key)
                    )}
                </div>
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
