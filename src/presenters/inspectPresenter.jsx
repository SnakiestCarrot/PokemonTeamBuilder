import { observer } from "mobx-react-lite";
import { InspectView } from "../views/inspectView";
import { useEffect } from "react";

const Inspect = observer(function InspectRender(props) {
    useEffect(()=>{
        props.model.fetchPokemonSpecies(props.model.currentPokemonId);
    },[])
    
    return (
        <div>
            <InspectView
                currentPokemon={props.model.currentPokemonPromiseState.data}
                addPokemonToCurrentTeam={addPokemonToTeam}
                typeIds={props.model.getCurrentPokemonTypeIds()}
                currentPokemonSpecies={props.model.currentPokemonSpeciesPromiseState.data}
                loading={props.model.loading}
            />
        </div>
    )

    function addPokemonToTeam (pokemonId) {
        props.model.addPokemonByIdToTeam(pokemonId);
    }
});

export { Inspect };