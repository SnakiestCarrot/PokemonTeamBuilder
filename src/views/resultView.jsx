import { pokemonIdToTypeId } from "../utilities";
import { renderTypeImage } from "./viewUtilities";

export function ResultView(props) {
    const results = props.pokemonResults;

    if (!props.user) {
        return;
    }
    //PLACEHOLDER
    if (props.loading) {
        return (
            <div align="center"><img src="https://brfenergi.se/iprog/loading.gif"/></div>
        )
    }

    if (!results || results.length === 0) {
        return <div className="no-results">No Pokémon found</div>;
    }

    return (
        <div>
            <div className="pokemon-container">
                {results.filter((pokemon) => pokemon.id >= 1 && pokemon.id <= 1025).map((pokemon) => (
                    <div 
                        key={pokemon.name} 
                        className="pokemon-card" 
                        onClick={() => addButtonClicked(pokemon)}>
                            <h2>{pokemon.name}</h2>
                            <div>
                                {pokemonIdToTypeId(pokemon.id).map(renderTypeImage)}
                            </div>
                            <img 
                                src={pokemon.sprite} 
                                alt={`${pokemon.name} sprite`} 
                                className="pokemon-image"
                            />
                            <div>
                                <button onClick={
                                    (event) => {
                                        props.doPokemonInspect(pokemon.id)
                                        event.stopPropagation();
                                }} 
                                className="pokemon-team-results-button">Inspect
                                </button>
                            </div>

                            
                    </div>
                ))}
            </div>
        </div>
    );

    function addButtonClicked (pokemon) {
        props.addPokemonToTeam(pokemon.id);
    }
}


