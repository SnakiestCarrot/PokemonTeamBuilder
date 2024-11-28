import { observer } from "mobx-react-lite";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseModel.js"; // Adjust the path to your Firebase configuration file
import { LoginView } from "../views/loginView.jsx";


const Login = observer (
    function LoginRender(props) {

        function userWantsToLogin() {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then((result) => {
                    console.log("Login successful:", result.user);
                    if (props.onUserLoggedIn) {
                        props.onUserLoggedIn(result.user);
                    }
                })
                .catch((error) => {
                    console.error("Login failed:", error);
                    if (props.onLoginError) {
                        props.onLoginError(error);
                    }
                });
        }
    
        return <LoginView onLoginClick={userWantsToLogin} />;
    }
)

export { Login };
