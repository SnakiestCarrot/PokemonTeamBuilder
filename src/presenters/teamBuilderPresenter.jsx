import { observer } from "mobx-react-lite";
import { PokemonResultView } from "../views/PokemonResultView";
import { PokemonSearchView } from "../views/PokemonSearchView";
import { TeamBuilderView } from "../views/TeamBuilderView"

const TeamBuilder = observer(
    function PokemonSearchRender(props) {

        function handleSearchInput(event) {
            if (event && event.target) {
                const inputValue = event.target.value;
                props.model.pokemonSearchACB(inputValue);
            } else {
                console.error("Invalid event object:", event);
            }
        }

        function userWantsToInspect(pokemonId){
            props.model.doPokemonInspect(pokemonId);
        }

        return (
            <div>

                <TeamBuilderView 
                    team={props.model.currentTeam}
                />
                <PokemonSearchView
                    updatePokemonSearchACB={handleSearchInput}
                    text={props.model.searchQuery}
                />
                <PokemonResultView 
                    pokemonResults={props.model.filteredPokemon}
                    doPokemonInspect={userWantsToInspect}
                />
            </div>
        );
    });

export { TeamBuilder };
