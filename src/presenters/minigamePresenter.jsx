import { observer } from "mobx-react-lite";
import { MinigameView } from "../views/minigameView";

const Minigame = observer(function MinigameRender(props) {

    function endMinigame() {
        props.model.endMinigame();
    }

    function startMinigame() {
        props.model.startMinigame()
    }

    function setNewMinigamePokemons() {
        props.model.getNewMinigamePokemons();
    }

    function choosePokemon(index) {
        props.model.minigameChoosePokemon(index);
    }

    function updateHighScore() {
        props.model.UpdateHighScoreLeaderboard();
    }

    return (
        <div>
            <MinigameView
                minigameIsStarted={props.model.minigameIsStarted}
                pokemons={props.model.minigamePokemons}
                setNewPokemons={setNewMinigamePokemons}
                startMinigame={startMinigame}
                endMinigame={endMinigame}
                selectPokemon={choosePokemon}
                currentScore={props.model.minigameCurrentScore}
                isCorrectChoice={props.model.minigameLastChoiceWasCorrect}
                pokemonWithAdvantage={props.model.minigameTypeAdvantage}
                saveScore={updateHighScore}
            />
        </div>
    );
});

export { Minigame };




