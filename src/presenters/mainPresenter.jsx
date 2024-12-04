import { observer } from "mobx-react-lite";
import { MainView } from "../views/mainView";
import { model } from "../pokemonModel";

const Main = observer(function MainRender(props) {
    const pokemonList = model.getPokemonFromHook(4);

    return (
        <div>
            <MainView
                changeToTeamBuilderPage={props.model.setToTeamBuilderPage}
                pokemonList={pokemonList}
            />
        </div>
    );
});

export { Main };
