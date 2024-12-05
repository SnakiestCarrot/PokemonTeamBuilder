import { observer } from "mobx-react-lite";
import { TopBarView } from "../views/topBarView";
const TopBar = observer(function TopBarRender(props) {
    function userWantsToLogin() {
        props.model.userWantsToLogin();
    }

    function userWantsToLogout() {
        props.model.userWantsToLogout();
    }

    //Conditional rendering of logout/login button
    function isUserLoggedIn() {
        if (props.model.user && props.model.user.uid) {
            console.log(props.model.user.uid);
            //TODO
        }
        else {
            //TODO
        }
    }

    return (
        <div>
            <TopBarView model={props.model} onLogoutClick={userWantsToLogout} onLoginClick={userWantsToLogin}/>;
        </div>
    )
});

export { TopBar };