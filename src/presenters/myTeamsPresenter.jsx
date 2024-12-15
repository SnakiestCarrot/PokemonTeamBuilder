import { observer } from "mobx-react-lite";
import { MyTeamsView } from "../views/myTeamsView";

const MyTeams = observer(function MyTeamsRender(props){

    function inspectPokemon(pokemonId){
        props.model.doPokemonInspect(pokemonId);
    }

    function deleteTeamACB(teamId){
        props.model.removePokemonTeam(teamId);
    }

    return(
        <div>
            <MyTeamsView 
            userTeams={props.model.myTeams}
            user={props.model.user}
            doPokemonInspect={inspectPokemon}
            deleteTeam={deleteTeamACB}
            />
        </div>
    );
});

export {MyTeams};