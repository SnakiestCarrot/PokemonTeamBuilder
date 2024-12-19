export function MainView(props) {
    // Function to render the Pokémon list or placeholders
    function renderPokemonList() {
        if (props.pokemonList.length > 0) {
            return props.pokemonList.map((pokemon, index) => (
                <div 
                    key={index} 
                    className="pokemon-card" 
                    onClick={() => props.doPokemonInspect(pokemon.id)}
                >
                    <p>{pokemon.name}</p>
                    <img
                        src={pokemon.sprites.other['official-artwork'].front_default}
                        alt={pokemon.name}
                        className="pokemon-image"
                    />
                </div>
            ));
        } else {
            return Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="pokemon-card empty">
                <div align="center"><img src="https://brfenergi.se/iprog/loading.gif"/></div>
                </div>
            ));
        }
    }

    return (
        <div>
            <h1 className="header">Welcome to Pokémon Team Builder</h1>
            <h3 className="center">Random Pokémon:</h3>
            <div className="pokemon-container">
                {renderPokemonList()}
            </div>
        </div>
    );
}
