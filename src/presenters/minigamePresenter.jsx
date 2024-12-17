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

    return (
        <div>
            <MinigameView
                minigameIsStarted={props.model.minigameIsStarted}
                pokemons={props.model.minigamePokemons}
                setNewPokemons={setNewMinigamePokemons}
                startMinigame={startMinigame}
                endMinigame={endMinigame}
            />
        </div>
    );
});

export { Minigame };




