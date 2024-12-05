import { observer } from "mobx-react-lite";
import { MainView } from "../views/mainView";
import { model } from "../pokemonModel";
import { useEffect } from "react";

const Main = observer(function MainRender(props) {

    function userWantsToInspectRandomPokemon(pokemonId){
        props.model.doPokemonInspect(pokemonId);
    }

    return (
        <div>
            <MainView
                changeToTeamBuilderPage={props.model.setToTeamBuilderPage}
                changeToTeamsPage={props.model.setToTeamViewPage}
                pokemonList={props.model.randomPokemonList}
                doPokemonInspect={userWantsToInspectRandomPokemon}
            />
        </div>
    );
});

export { Main };
