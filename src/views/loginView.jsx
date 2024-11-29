import "../styles.css";
import { TopBar } from "../components/topBarComponent";

export function LoginView(props) {
    return (
        <div>
            <button onClick={props.onLoginClick} className="login">Login</button>
        </div>
    );
}