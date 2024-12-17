import { observer } from "mobx-react-lite";
import { MinigameView } from "../views/minigameView";

const Minigame = observer(function MinigameRender(props) {

    function endMinigame() {
        props.model.endMinigame();
    }

    function startMinigame() {
        props.model.startMinigame()
    }

    return (
        <div>
            <MinigameView
                minigameIsStarted={props.model.minigameIsStarted}
                startMinigame={startMinigame}
                endMinigame={endMinigame}
            />
        </div>
    );
});

export { Minigame };




