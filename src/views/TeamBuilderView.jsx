
// This is the view that will display the current team when making edits to it
// it recieves as input props.team, the current team of the model.
export function TeamBuilderView(props) {

    const team = props.team;

    return (
        <div className="team-builder-team-container">
            <div className="team-builder-name">
                <h2>Current team:</h2>
                <h1>{team.teamName}</h1>
            </div>

            {team.pokemons.map(renderPokemonCard)}

        </div>
    );

    function removeButtonClicked(pokemon) {
        props.removePokemonFromCurrentTeam(pokemon.id);
    }

    function renderPokemonCard(pokemon, index) {
        return (
            <div key={index}>
                {pokemon ? (
                    <div
                        key={pokemon.name}
                        className="pokemon-team-card" >
                        <h2>{pokemon.name}</h2>
                        {renderTypeImages(pokemon)}
                        {renderPokemonImage(pokemon)}
                        <div>
                            <button onClick={() => removeButtonClicked(pokemon)} className="pokemon-team-button">Remove</button>
                        </div>
                    </div>
                ) : (
                    renderEmptyTeamSlot()

                )}
            </div>
        )
    }
}

// This function simply extracts just the id of a pokemons types
// from the pokemon data, it does not modify any of the incoming data
function renderTypeImages(pokemon) {
    const typeArray = pokemon.types;

    const typeUrls = [];
    const typeIds = [];

    typeUrls[0] = typeArray[0].type.url;
    typeIds[0] = extractTypeIdFromUrl(typeUrls[0]);

    // If the pokemon has a second type
    if (typeArray[1]) {
        typeUrls[1] = typeArray[1].type.url;
        typeIds[1] = extractTypeIdFromUrl(typeUrls[1]);
    }

    return (
        typeIds.map(renderTypeImage)
    )
}

function extractTypeIdFromUrl(url) {
    const match = url.match(/\/(\d+)\/?$/); // uses a regex to extract the type id
    return match ? parseInt(match[1], 10) : null;
}

function renderTypeImage(typeId) {
    return (
        <img
            key={typeId}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/${typeId}.png`}
            alt={`Type ${typeId}`}
        />
    )
}

function renderPokemonImage(pokemon) {
    return (
        <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={`${pokemon.name} sprite`}
            className="pokemon-team-image"
        />
    )
}

function renderEmptyTeamSlot() {
    return (
        <div className="pokemon-team-card" >
            <p>Slot is empty,</p>
            <p>search and click</p>
            <p>to add</p>
        </div >
    )
}








