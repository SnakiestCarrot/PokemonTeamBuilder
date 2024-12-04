import { observer } from "mobx-react-lite";
import { InspectView } from "../views/inspectView";
import { useEffect } from "react";

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