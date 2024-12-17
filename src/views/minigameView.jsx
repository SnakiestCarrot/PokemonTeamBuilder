
import "../minigameStyles.css"

export function MinigameView(props) {

    const minigameIsStarted = props.minigameIsStarted;

    function startMinigame() {
        props.startMinigame();
    }

    function endMinigame() {
        props.endMinigame();
    }

    function renderMinigamePokemonCard(pokemon) {
        return (

            <div className="my-teams-pokemon-card" key={"pokemon" + index}>
                <h3>{pokemon?.name}</h3>
                {pokemonIdToTypeId(pokemon.id).map(renderTypeImage)}

                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={`${pokemon.name} sprite`}
                    className="pokemon-team-image"
                />
            </div>


        )
    }

    function renderStartedMinigame() {
        return (
            <div>
                <h2>Minigame is started!</h2>
                <button onClick={endMinigame}>End minigame!</button>
            </div>
        )
    }

    function renderNotStartedMinigame() {
        return (
            <div>
                <h2>Minigame is not started!</h2>
                <button onClick={startMinigame}>Start minigame!</button>
            </div>
        )
    }

    return (
        <div className="minigame-container">
            {minigameIsStarted ? renderStartedMinigame() : renderNotStartedMinigame()}
        </div>


    )



}










