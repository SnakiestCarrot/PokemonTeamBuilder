import { observer } from "mobx-react-lite";
import { ResultView } from "../views/resultView";
import { SearchView } from "../views/searchView";
import { TeamBuilderView } from "../views/TeamBuilderView";
import { useEffect } from "react";
import NotificationPresenter from "../presenters/notificationPresenter"; // Import the presenter

const notificationPresenter = new NotificationPresenter(); // Initialize the notification presenter

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
      />
      <SearchView
        updatePokemonSearchACB={handleSearchInput}
        text={props.model.searchQuery}
      />
      <ResultView
        pokemonResults={props.model.filteredPokemon}
        doPokemonInspect={userWantsToInspect}
        addPokemonToTeam={addPokemonToTeam}
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
    notificationPresenter.showNotification("Inspected Pokémon successfully!");
  }

  function removePokemonFromTeam(index) {
    props.model.removePokemonAtIndexFromTeam(index);
    notificationPresenter.showNotification("Pokémon removed from the team!");
  }

  function addPokemonToTeam(pokemonId) {
    props.model.addPokemonByIdToTeam(pokemonId);
    notificationPresenter.showNotification("Pokémon added to the team!");
  }

  function setCurrentTeamName(name) {
    props.model.setCurrentTeamName(name);
  }
});

export { TeamBuilder };
