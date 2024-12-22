import { observer } from "mobx-react-lite";
import { TopBarView } from "../views/topBarView";

const TopBar = observer(function TopBarRender(props) {

    function userClicksProfile(event) {
        event.stopPropagation(); // Prevent click from propagating to the document
        props.model.toggleDropDown();
    }

    function closeDropdown() {
        props.model.closeDropDown();
    }

    function userClicksTeams(){
        window.location.hash = "#/teams";
    }

    return (
        <div>
            <TopBarView
                user={props.model.user}
                onProfileClick={userClicksProfile}
                isDropdownVisible={props.model.isDropdownVisible}
                outsideClick={closeDropdown} 
                onTeamsClick={userClicksTeams}
            />
        </div>
    );
});

export { TopBar };
