export function MainView(props) {
    return (
        <div>
            <h1 className="header">Welcome to Pokémon Team Builder</h1>
            <button onClick={props.changeToSearchPage}>Go to search page</button>

            <h3 className="center">Random Pokémon:</h3>
            <div className="pokemon-container">
                {props.pokemonList.length > 0 ? (
                    props.pokemonList.map((pokemon, index) => (
                        <div key={index} className="pokemon-card">
                            <p>{pokemon.name}</p>
                            <img
                                src={pokemon.sprites.other['official-artwork'].front_default}
                                alt={pokemon.name}
                                className="pokemon-image"
                            />
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
