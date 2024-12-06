

// This is the view that will display the current team when making edits to it
// it recieves in props.team, the current team of the model.
export function TeamBuilderView(props) {

    const team = props.team;

    return (

        <div className="team-builder-team-container">
            <div className="team-builder-name">
                <h2>Current team:</h2>
                <h1>{team.teamName}</h1>
            </div>
            
            {team.pokemons.map((pokemon) => (
                <div>
                    {pokemon ? (
                        <div 
                        key={pokemon.name} 
                        className="pokemon-team-card" >
                            <h2>{pokemon.name}</h2>
                            {renderTypeIds(pokemon)}
                            <img 
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} 
                                alt={`${pokemon.name} sprite`} 
                                className="pokemon-team-image"
                            />
                            <div>
                                <button onClick={() => removePokemonButtonClicked(pokemon)} className="pokemon-team-button">Remove</button>
                            </div>
                        </div>
                    ) : (
                        <div className="pokemon-team-card">
                            <p>Slot is empty,</p>
                            <p>search and click</p>
                            <p>to add</p>
                        </div>
                        
                    )}
                </div>
            ))}
        </div>
    );

    function removePokemonButtonClicked (pokemon) {
        props.removePokemonFromCurrentTeam(pokemon.id);
    }
        

    // This function simply extracts just the id of a pokemons types
    // from the pokemon data, it does not modify any of the incoming data
    function renderTypeIds (pokemon) {
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
            typeIds.map((typeId) => (
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/${typeId}.png`}></img>
                )
            )
        )
    }

    function extractTypeIdFromUrl (url) {
        const match = url.match(/\/(\d+)\/?$/);
        
        return match ? parseInt(match[1], 10) : null;
    }
}







