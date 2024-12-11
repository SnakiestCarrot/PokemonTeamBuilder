import { observer } from "mobx-react-lite";
import { InspectView } from "../views/inspectView";

const Inspect = observer(function InspectRender(props) {
    return (
        <div>
            <InspectView
                currentPokemon={props.model.currentPokemon}
                addPokemonToCurrentTeam={addPokemonToTeam}
                typeIds={props.model.pokemonIdToTypeId(props.model.currentPokemonId)}
            />
        </div>
    )

    function addPokemonToTeam (pokemonId) {
        props.model.addPokemonByIdToTeam(pokemonId);
    }
});

export { Inspect };