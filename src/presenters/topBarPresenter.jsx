import { observer } from "mobx-react-lite";
import { TopBarView } from "../views/topBarView";

const TopBar = observer(function TopBarRender(props) {

    function userWantsToLogin() {
        props.model.userWantsToLogin();
    }

    function userWantsToLogout() {
        props.model.userWantsToLogout();
    
    }

    function userClicksProfile(event) {
        event.stopPropagation(); // Prevent click from propagating to the document
        props.model.toggleDropDown();
    }

    function closeDropdown() {
        props.model.closeDropDown();
    }

    return (
        <div>
            <TopBarView
                user={props.model.user}
                onLogoutClick={userWantsToLogout}
                onLoginClick={userWantsToLogin}
                onProfileClick={userClicksProfile}
                isDropdownVisible={props.model.isDropdownVisible}
                outsideClick={closeDropdown} 
            />
        </div>
    );
});

export { TopBar };
