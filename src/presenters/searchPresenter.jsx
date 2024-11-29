import { observer } from "mobx-react-lite";
import { SearchView } from "../views/searchView";
import { PokemonInfoView } from "../views/pokemonInfoView";

const Search = observer (
    function SearchRender(props) {
        
        function changeCurrentPokemonId (Id) {
            props.model.setCurrentPokemonId(Id);
        }

        return (
            <div>
                <div>
                    <SearchView 
                        changeCurrentPokemonId = {changeCurrentPokemonId}
                        currentPokemonId = {props.model.currentPokemonId}
                        switchToMainPage = {props.model.setToMainPage}
                        switchToSearchPage = {props.model.setToSearchPage}
                        searchPokemon = {props.model.doSearch}
                        searchResult = {props.model.pokemonSearchPromiseState.data}
                    />
                </div>

                <div>
                    <PokemonInfoView/>
                </div>
            </div>
        )
    }
);

export { Search };