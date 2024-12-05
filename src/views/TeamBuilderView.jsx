

// This is the view that will display the current team when making edits to it
export function TeamBuilderView(props) {

    return (

        <div className="team-builder-team-container">
            <div className="team-builder-name">
                <h2>Current team:</h2>
                <h1>{props.team.teamName}</h1>
            </div>
            
            {props.team.pokemons.map((pokemon) => (
                <div>
                    {pokemon ? (
                        <div 
                        key={pokemon.name} 
                        className="pokemon-team-card" >
                            <h2>{pokemon.name}</h2>
                            <img  
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/12.png`}
                            />
                            <img 
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} 
                                alt={`${pokemon.name} sprite`} 
                                className="pokemon-team-image"
                            />
                            <div>
                                <button className="pokemon-team-button">Remove</button>
                            </div>
                        </div>
                    ) : (
                        <div className="pokemon-team-card">
                            <p>Slot is empty</p>
                            <div>
                                <button className="pokemon-team-button">Add</button>
                            </div>
                        </div>
                        
                    )}
                </div>
            ))}
        </div>
    );
}







