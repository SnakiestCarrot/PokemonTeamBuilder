import { observer } from "mobx-react-lite";
import { MinigameView } from "../views/minigameView";

const Minigame = observer(function MinigameRender(props) {

    return (
        <div>
            <MinigameView
                minigameIsStarted={props.model.minigameIsStarted}
                startMinigame={props.model.startMinigame}
                endMinigame={props.model.endMinigame}
            />
        </div>
    );
});

export { Minigame };




