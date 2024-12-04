import "../styles.css";

export function LoginView(props) {
    return (
        <div>
            <button onClick={props.onLoginClick} className="login">Login</button>
        </div>
    );
}