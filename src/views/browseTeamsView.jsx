import "../myTeamStyles.css";
import { pokemonIdToTypeId } from "../utilities";
import { renderTypeImage } from "./viewUtilities";

export function BrowseTeamsView(props) {
    const teams = props.allTeams;

    return (
        <div>
            <h1 className="header" key={"browseTeamsHeader"}>
                {"Top rated user teams:"}
            </h1>
            {renderTeams(teams)}
        </div>
    );

    function toggleLikeTeam(teamKey, teamAuthorId) {
        props.userClicksLikeButton(teamKey, teamAuthorId);
    }

    function renderTeams(teams) {
        if (props.loading) {
            return (
                <div align="center">
                    <img src="https://brfenergi.se/iprog/loading.gif" />
                </div>
            );
        }

        const sortedTeams = [...teams].sort(sortByLikes);
        return (
            <div>
                {sortedTeams.map(renderTeam)}
            </div>
        );
    }

    function sortByLikes(a, b) {
        return (b.likes || 0) - (a.likes || 0);
    }

    function renderTeam(team, index) {
        const isLiked = props.likedTeams?.[team.key] || false; // Check if the user has liked this team

        return (
            <div className="my-team-name-container" key={`team-${team.key}`}>
                <div className="team-header">
                    <h3 className="team-title">
                        Teamname: <span className="team-name">{team.teamName}</span>{" "}
                        &nbsp;&nbsp; By: <span className="team-author">{team.userName}</span>
                    </h3>
                </div>
                <div className="team-flex-container">
                    <div className="team-actions-left">
                        <span className="heart-like-count">{team.likes || 0} likes</span>
                        {renderLikeButton(isLiked, team.key, team.userId)}
                    </div>
                    <div className="team-builder-team-container">
                        {team.pokemons.map(renderTeamPokemon(team.key))}
                    </div>
                </div>
            </div>
        );
    }

    function renderLikeButton(isLiked, teamKey, teamAuthorId) {
        if (props.user) {
            return (
                <button
                    className={`heart-like-button ${isLiked ? "liked" : ""}`}
                    onClick={handleLikeButtonClick(teamKey, teamAuthorId)}
                >
                    {isLiked ? "❤️" : "🤍"}
                </button>
            );
        }
    }

    function handleLikeButtonClick(teamKey, teamAuthorId) {
        return function () {
            toggleLikeTeam(teamKey, teamAuthorId);
        };
    }

    function renderTeamPokemon(teamKey) {
        return function (pokemon, pokemonIndex) {
            return renderPokemon(pokemon, pokemonIndex, teamKey);
        };
    }

    function renderPokemon(pokemon, index, teamKey) {
        return (
            <div
                className="my-teams-pokemon-card"
                key={`pokemon-${teamKey}-${index}-${pokemon?.id || "empty"}`}
                onClick={handlePokemonInspect(pokemon?.id)}
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

    function handlePokemonInspect(pokemonId) {
        return function () {
            props.doPokemonInspect(pokemonId);
        };
    }
}
