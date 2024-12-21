import { observer } from "mobx-react-lite";
import { InspectView } from "../views/inspectView";
import { useEffect } from "react";
import NotificationView from "../views/notificationView"; 

const Inspect = observer(function InspectRender(props) {
    const notificationView = new NotificationView();

    useEffect(()=>{
        props.model.fetchPokemonSpecies(props.model.currentPokemonId);
    },[])

    return (
        <div>
            <InspectView
                currentPokemon={props.model.currentPokemonPromiseState.data}
                addPokemonToTeam={addPokemonToTeam}
                typeIds={props.model.getCurrentPokemonTypeIds()}
                currentPokemonSpecies={props.model.currentPokemonSpeciesPromiseState.data}
                teamFullStatus={props.model.currentTeamFull}
                addPokemonToTeamFailed={addPokemonToTeamFailed}
                loading={props.model.loading}
            />
        </div>
    )

    function addPokemonToTeam (pokemonId) {
        props.model.addPokemonByIdToTeam(pokemonId);
        notificationView.displayNotification("Pokémon added to the team!");
    }

    function addPokemonToTeamFailed () {
        notificationView.displayNotification("Team full - Pokémon NOT added to the team!", "failure");
    }
});

export { Inspect };