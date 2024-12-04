import { observer } from "mobx-react-lite";
import { MainView } from "../views/mainView";
import { model } from "../pokemonModel";

const Main = observer(function MainRender(props) {
    const pokemonList = model.getPokemonFromHook(4);

    function userWantsToInspectRandomPokemon(pokemonId){
        props.model.doPokemonInspect(pokemonId);
    }

    return (
        <div>
            <MainView
                changeToTeamBuilderPage={props.model.setToTeamBuilderPage}
                changeToTeamsPage={props.model.setToTeamViewPage}
                pokemonList={pokemonList}
                doPokemonInspect={userWantsToInspectRandomPokemon}
            />
        </div>
    );
});

export { Main };
