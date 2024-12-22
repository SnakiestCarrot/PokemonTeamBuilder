import { observer } from "mobx-react-lite";
import { ResultView } from "../views/resultView";
import { SearchView } from "../views/searchView";
import { TeamEditorView } from "../views/teamEditorView";
import { useEffect } from "react";
import NotificationView from "../views/notificationView"; 

const notificationView = new NotificationView();

const TeamEditor = observer(function TeamEditorRender(props){

  useEffect(() => {
    const typeIds = Array.from({ length: 18 }, (_, i) => i + 1);
    typeIds.forEach((typeId) => {
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/types/generation-viii/sword-shield/${typeId}.png`;
    });
}, []);
  
    return (
        <div>
            <TeamEditorView 
            team={props.model.editTeam}
            removePokemonFromEditTeam={removePokemonFromTeam}
            changeTeamName={setEditTeamName}
            saveEditedTeamToProfile={userWantsToUpdateEditTeam}  
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
            addPokemonToTeam={addPokemonToEditTeam}
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
    
      function userWantsToUpdateEditTeam() {
        props.model.saveEditedPokemonTeam();
      }
    
      function userWantsToInspect(pokemonId) {
        props.model.doPokemonInspect(pokemonId);
        notificationView.displayNotification("Inspected Pokémon successfully!");
      }
    
      function removePokemonFromTeam(index) {
        props.model.removePokemonAtIndexFromEditTeam(index);
        notificationView.displayNotification("Pokémon removed from the team!");
      }
    
      function addPokemonToEditTeam(pokemonId) {
        props.model.addPokemonByIdToEditTeam(pokemonId);
        notificationView.displayNotification("Pokémon added to the team!");
      }
    
      function setEditTeamName(name) {
        props.model.setEditTeamName(name);
      }

      function addPokemonToTeamFailed() {
        notificationView.displayNotification("Team full - Pokémon NOT added to the team!", "failure");
      }

});
export { TeamEditor };