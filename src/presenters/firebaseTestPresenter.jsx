import { observer } from "mobx-react-lite";
import { FirebaseTestView } from "../views/firebaseTestView";

const FirebaseTest = observer(function FirebaseTestRender(props){

    function saveTeamToFirebase(){
        props.model.savePokemonTeam();
    }

    async function getTeamFromFirebase(){
        const result = await props.model.getPokemonTeams();
        console.log(result);
    }   

    return(
        <div>
            <FirebaseTestView
            userWantsToSaveTeam={saveTeamToFirebase}
            userWantsToGetTeam={getTeamFromFirebase}
            />
        </div>
    );
});

export {FirebaseTest};