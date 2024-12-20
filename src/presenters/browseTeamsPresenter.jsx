import { observer } from "mobx-react-lite";
import { BrowseTeamsView } from "../views/browseTeamsView";

const BrowseTeams = observer(function BrowseTeamsRender(props){

    function userWantsToToggleLike(teamKey, teamAuthorId) {
        props.model.toggleLikeTeam(teamKey, teamAuthorId);
    }
    return(
        <div>
            <BrowseTeamsView
                allTeams = {props.model.allUserTeams}
                user = {props.model.user}
                likedTeams = {props.model.likedTeams}
                userClicksLikeButton = {userWantsToToggleLike}
                loading={props.model.loading}
            />
        </div>
    );
});

export { BrowseTeams };