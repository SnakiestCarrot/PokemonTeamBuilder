
import { observer } from "mobx-react-lite";
import { PokemonInfoView } from "../views/pokemonInfoView";

const PokemonInfo = observer (
    function PokemonInfoRender(props) {


            return (
                <div>
                    <PokemonInfoView
                        searchPokemon = {props.model.pokemonSearch}
                        changeToSearchPage = {props.model.setToSearchPage}
                    />
                </div>
            )
        

            

        

        
    }
);

export { PokemonInfo };








