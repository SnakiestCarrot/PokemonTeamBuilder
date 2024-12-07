import { observer } from "mobx-react-lite";
import { FirebaseTestView } from "../views/firebaseTestView";

const FirebaseTest = observer(function FirebaseTestRender(props){

    function saveTeamToFirebase(){
        props.model.savePokemonTeam();
    }

    return(
        <div>
            <FirebaseTestView
            
            userWantsToSaveTeam={saveTeamToFirebase}
            />
        </div>
    );
});

export {FirebaseTest};