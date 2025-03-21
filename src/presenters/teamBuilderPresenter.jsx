import { observer } from "mobx-react-lite";
import { ResultView } from "../views/resultView";
import { SearchView } from "../views/searchView";
import { TeamBuilderView } from "../views/TeamBuilderView";
import { useEffect } from "react";
import NotificationView from "../views/notificationView"; 

const TeamBuilder = observer(function PokemonSearchRender(props) {
  // Prefetch all type ID images on component mount
  useEffect(() => {
      const typeIds = Array.from({ length: 18 }, (_, i) => i + 1);
      typeIds.forEach((typeId) => {
          const img = new Image();
          img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/types/generation-viii/sword-shield/${typeId}.png`;
      });
  }, []);

  return (
    <div>
      <TeamBuilderView
        team={props.model.currentTeam}
        removePokemonFromCurrentTeam={removePokemonFromTeam}
        changeTeamName={setCurrentTeamName}
        saveCurrentTeamToProfile={userWantsToSaveCurrentTeam}
        loading={props.model.loading}
        user={props.model.user}
        doPokemonInspect={userWantsToInspect}
      />
      <SearchView
        updatePokemonSearchACB={handleSearchInput}
        text={props.model.searchQuery}
        loading={props.model.loading}
        user={props.model.user}
      />
      <ResultView
        pokemonResults={props.model.filteredPokemon}
        pokemonPromiseState={props.model.pokemonResultPromiseState}
        doPokemonInspect={userWantsToInspect}
        addPokemonToTeam={addPokemonToTeam}
        addPokemonToTeamFailed={addPokemonToTeamFailed}
        teamFullStatus={props.model.currentTeamFull}
        loading={props.model.loading}
        user={props.model.user}
      />
    </div>
  );

  function handleSearchInput(event) {
    if (event && event.target) {
      const inputValue = event.target.value;
      props.model.pokemonSearchACB(inputValue);
    } else {
      console.error("Invalid event object:", event);
    }
  }

  function userWantsToSaveCurrentTeam() {
    props.model.savePokemonTeam();
    //TODO: This should have a notification but it was bugged when i tried adding it like the others
  }

  function userWantsToInspect(pokemonId) {
    props.model.doPokemonInspect(pokemonId);
    NotificationView.displayNotification("Inspected Pokémon successfully!");
}

function removePokemonFromTeam(index) {
    props.model.removePokemonAtIndexFromTeam(index);
    NotificationView.displayNotification("Pokémon removed from the team!");
}

function addPokemonToTeam(pokemonId) {
    props.model.addPokemonByIdToTeam(pokemonId);
    NotificationView.displayNotification("Pokémon added to the team!");
}

function addPokemonToTeamFailed() {
  NotificationView.displayNotification("Team full - Pokémon NOT added to the team!", "failure");
}

  function setCurrentTeamName(name) {
    props.model.setCurrentTeamName(name);
  }
});

export { TeamBuilder };
