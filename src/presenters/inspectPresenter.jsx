import { observer } from "mobx-react-lite";
import { InspectView } from "../views/inspectView";

const Inspect = observer(function InspectRender(props) {
    return (
        <div>
            <InspectView
                currentPokemon={props.model.currentPokemonPromiseState.data}
                addPokemonToCurrentTeam={addPokemonToTeam}
                typeIds={props.model.getCurrentPokemonTypeIds()}
            />
        </div>
    )

    function addPokemonToTeam (pokemonId) {
        props.model.addPokemonByIdToTeam(pokemonId);
    }
});

export { Inspect };