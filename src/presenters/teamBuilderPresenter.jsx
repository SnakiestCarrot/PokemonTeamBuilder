import { observer } from "mobx-react-lite";
import { PokemonResultView } from "../views/PokemonResultView";
import { PokemonSearchView } from "../views/PokemonSearchView";
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

        return (
            <div>
                <PokemonSearchView
                    updatePokemonSearchACB={handleSearchInput}
                    text={props.model.searchQuery}
                />
                <PokemonResultView pokemonResults={props.model.filteredPokemon} />
            </div>
        );
    });

export { TeamBuilder };
