import "../styles.css"

export function InspectView(props) {
    return (
        <div>
            <h1 className="header">Welcome to pokemon inspect</h1>
            <div className="pokemon-container-inspect">
                <div key={index} className="pokemon-card">
                    <p>{currentPokemon.name}</p>
                    <img
                        src={currentPokemon.sprites.other['official-artwork'].front_default}
                        alt={currentPokemon.name}
                        className="pokemon-image"
                    />
                </div>
            </div>
        </div>
    )
}