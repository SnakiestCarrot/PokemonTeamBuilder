import { observer } from "mobx-react-lite";
import { MyTeamsView } from "../views/myTeamsView";

const MyTeams = observer(function MyTeamsRender(props){


    return(
        <div>
            <MyTeamsView/>
        </div>
    );
});

export {MyTeams};