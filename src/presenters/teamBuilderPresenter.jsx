import { observer } from "mobx-react-lite";
import { PokemonResultView } from "../views/PokemonResultView";
import { PokemonSearchView } from "../views/PokemonSearchView";
import { TeamBuilderView } from "../views/TeamBuilderView";
import { useEffect } from "react";
import NotificationPresenter from "./notificationPresenter"; 

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

  function removePokemonFromTeam(index) {
    props.model.removePokemonByIdFromTeam(index);
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
      <PokemonSearchView
        updatePokemonSearchACB={handleSearchInput}
        text={props.model.searchQuery}
      />
      <PokemonResultView
        pokemonResults={props.model.filteredPokemon}
        doPokemonInspect={userWantsToInspect}
        addPokemonToTeam={addPokemonToTeam}
      />
    </div>
  );
});

export { TeamBuilder };
