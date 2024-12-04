import { observer } from "mobx-react-lite";
import { PokemonResultView } from "../views/PokemonResultView";
import { PokemonSearchView } from "../views/PokemonSearchView";
import { TeamBuilderView } from "../views/TeamBuilderView"
import { useEffect } from "react";

const TeamBuilder = observer(
    function PokemonSearchRender(props) {
        // Load the full Pokémon list when the component mounts
        function loadPokemonList() {
            props.model.loadAllPokemon();
        }
        useEffect(loadPokemonList, []); //triggers the function

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
                <PokemonSearchView
                    updatePokemonSearchACB={handleSearchInput}
                    text={props.model.searchQuery}
                />
                <TeamBuilderView 
                    
                />
                <PokemonResultView 
                    pokemonResults={props.model.filteredPokemon}
                    doPokemonInspect={userWantsToInspect}
                />
            </div>
        );
    });

export { TeamBuilder };
