import { observer } from "mobx-react-lite";
import { TopBarView } from "../views/topBarView";
const TopBar = observer(function TopBarRender(props) {
    console.log("TopBar re-rendered. User state:", props.model.user);
    function userWantsToLogin() {
        console.log("User state in TopBarView:", props.model.user); // Debug log
        props.model.userWantsToLogin();
    }

    function userWantsToLogout() {
        console.log("User state in TopBarView:", props.model.user); // Debug log
        props.model.userWantsToLogout();
    }

    return (
        <div>
            <TopBarView model={props.model} onLogoutClick={userWantsToLogout} onLoginClick={userWantsToLogin}/>;
        </div>
    )
});

export { TopBar };