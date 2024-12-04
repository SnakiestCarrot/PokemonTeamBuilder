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
            </div>
        </div>
    )
}