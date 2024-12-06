import { observer } from "mobx-react-lite";
import { TopBarView } from "../views/topBarView";

const TopBar = observer(function TopBarRender(props) {
    console.log("TopBar re-rendered. User state:", props.model.user);

    function userWantsToLogin() {
        console.log("Before login, user:", props.model.user);
        props.model.userWantsToLogin();
        console.log("After login, user:", props.model.user);
    }

    function userWantsToLogout() {
        console.log("Before logout, user:", props.model.user);
        props.model.userWantsToLogout();
        console.log("After logout, user:", props.model.user);
    }

    function userClicksProfile(event) {
        event.stopPropagation(); // Prevent click from propagating to the document
        console.log("Profile clicked. Dropdown visible:", props.model.isDropdownVisible);
        props.model.toggleDropDown();
    }

    function closeDropdown() {
        console.log("Dropdown closed.");
        props.model.closeDropDown();
    }

    return (
        <div>
            <TopBarView
                model={props.model}
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
