export function PokemonResultView(props) {
    const results = props.pokemonResults;

    if (!results || results.length === 0) {
        return <div className="no-results">No Pokémon found</div>;
    }

    return (
        <div>
            <div className="pokemon-container">
                {results.map((pokemon) => (
                    <div 
                        key={pokemon.name} 
                        className="pokemon-card" 
                        onClick={() => props.doPokemonInspect(pokemon.id)}>
                            <h2>{pokemon.name}</h2>
                            <img 
                                src={pokemon.sprite} 
                                alt={`${pokemon.name} sprite`} 
                                className="pokemon-image"
                            />
                    </div>
                ))}
            </div>
        </div>
    );
}


