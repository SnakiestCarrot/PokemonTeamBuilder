import { observer } from "mobx-react-lite";
import { BrowseTeamsView } from "../views/browseTeamsView";

const BrowseTeams = observer(function BrowseTeamsRender(props){
    return(
        <div>
            <BrowseTeamsView />
        </div>
    );
});

export { BrowseTeams };