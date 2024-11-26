import { observer } from "mobx-react-lite";
import { SearchView } from "../views/searchView";

const Search = observer (
    function SearchRender(props) {
        
        function changeCurrentPokemonId (Id) {
            props.model.setCurrentPokemonId(Id);
        }

        return (
            <div>
                <SearchView 
                    changeCurrentPokemonId = {changeCurrentPokemonId}
                    currentPokemonId = {props.model.currentPokemonId}
                    switchToMainPage = {props.model.setToMainPage}
                    switchToSearchPage = {props.model.setToSearchPage}
                    searchPokemon = {props.model.pokemonSearch}
                />
            </div>
        )
    }
);

export { Search };