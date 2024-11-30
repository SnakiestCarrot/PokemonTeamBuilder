import { observer } from "mobx-react-lite";
import { LoginView } from "../views/loginView.jsx";

const Login = observer(function LoginRender(props) {
    function userWantsToLogin() {
        props.model.userWantsToLogin(
            function (user) {
                if (props.onUserLoggedIn) {
                    props.onUserLoggedIn(user); // Notify parent of login success
                }
            },
            function (error) {
                if (props.onLoginError) {
                    props.onLoginError(error); // Notify parent of login failure
                }
            }
        );
    }

    return <LoginView onLoginClick={userWantsToLogin} />;
});

export { Login };
