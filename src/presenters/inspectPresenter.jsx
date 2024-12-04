import { observer } from "mobx-react-lite";
import { InspectView } from "../views/inspectView";

const Inspect = observer(function InspectRender(props) {

    return (
        <div>
            <InspectView
                currentPokemon={props.model.currentPokemon}
            />;
        </div>
    )
});

export { Inspect };