import "../styles.css"

export function InspectView(props) {
    return (
        <div>
            <h1 className="header">Welcome to pokemon inspect</h1>
            <div className="pokemon-container-inspect">
                <div className="pokemon-card">
                    <p>{props.currentPokemon.name}</p>
                    <img
                        src={props.currentPokemon.sprites.other['official-artwork'].front_default}
                        alt={props.currentPokemon.name}
                        className="pokemon-image"
                    />
                </div>
                <div className="pokemon-stats">
                    <h2>Health: {props.currentPokemon.stats[0].base_stat}</h2>
                    <h2>Attack: {props.currentPokemon.stats[1].base_stat}</h2>
                    <h2>Defense: {props.currentPokemon.stats[2].base_stat}</h2>
                    <h2>Special Attack: {props.currentPokemon.stats[3].base_stat}</h2>
                    <h2>Special Defense: {props.currentPokemon.stats[4].base_stat}</h2>
                    <h2>Speed: {props.currentPokemon.stats[5].base_stat}</h2>
                </div>
            </div>
        </div>
    )
}