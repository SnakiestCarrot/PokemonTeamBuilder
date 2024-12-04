export function PokemonResultView(props) {
    const results = props.pokemonResults;

    if (!results || results.length === 0) {
        return <div>No Pokémon found</div>;
    }

    return (
        <div>
            <div className="pokemon-container">
                {results.map((pokemon) => (
                    <div key={pokemon.name} className="pokemon-card">
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
