import { observer } from "mobx-react-lite";
import { ResultView } from "../views/resultView";
import { SearchView } from "../views/searchView";
import { TeamBuilderView } from "../views/TeamBuilderView";
import { useEffect } from "react";
import NotificationPresenter from "../presenters/notificationPresenter"; // Import the presenter

const notificationPresenter = new NotificationPresenter(); // Initialize the notification presenter

const TeamBuilder = observer(function PokemonSearchRender(props) {
  function handleSearchInput(event) {
    if (event && event.target) {
      const inputValue = event.target.value;
      props.model.pokemonSearchACB(inputValue);
    } else {
      console.error("Invalid event object:", event);
    }
  }

  function userWantsToInspect(pokemonId) {
    props.model.doPokemonInspect(pokemonId);
    notificationPresenter.showNotification("Inspected Pokémon successfully!");
  }

  function removePokemonFromTeam(pokemonId) {
    props.model.removePokemonByIdFromTeam(pokemonId);
    notificationPresenter.showNotification("Pokémon removed from the team!");
  }

  function addPokemonToTeam(pokemonId) {
    props.model.addPokemonByIdToTeam(pokemonId);
    notificationPresenter.showNotification("Pokémon added to the team!");
  }

  function setCurrentTeamName(name) {
    props.model.setCurrentTeamName(name);
    notificationPresenter.showNotification("Team name updated!");
  }

  // Prefetch all type ID images on component mount
  useEffect(() => {
    const typeIds = Array.from({ length: 18 }, (_, i) => i + 1);
    typeIds.forEach((typeId) => {
      const img = new Image();
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/${typeId}.png`;
    });
  }, []);

  return (
    <div>
      <TeamBuilderView
        team={props.model.currentTeam}
        removePokemonFromCurrentTeam={removePokemonFromTeam}
        changeTeamName={setCurrentTeamName}
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
});

export { TeamBuilder };
