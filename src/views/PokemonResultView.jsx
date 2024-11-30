export function PokemonResultView(props) {
    const results = props.pokemonResults;

    if (!results || results.length === 0) {
        return <div>No Pokémon found</div>;
    }

    return (
        <div>
            {results.map((pokemon) => (
                <div key={pokemon.name}>
                    <h2>{pokemon.name}</h2>
                </div>
            ))}
        </div>
    );
}
