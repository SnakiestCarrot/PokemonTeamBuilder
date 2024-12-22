import { auth } from "../firebaseModel";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export function TopBarView(props) {

    const provider = new GoogleAuthProvider();

    function login() {
        try {
            signInWithPopup(auth, provider)
        } catch (error) {
            console.error("Login failed", error);
        }
    }

    function logout() {
        try {
            signOut(auth);
            window.location.hash = "#";
        } catch (error) {
            console.error("Logout failed", error);
        }
    }
    
    function loginLogout() {
        if (!props.user) {
            return <a onClick={login} className="topBar-button">Login</a>;
        } else {
            return (
                <>
                    <a
                        onClick={props.onProfileClick}
                        className="topBar-button dropdown-trigger"
                        ref={props.dropdownRef}
                    >
                        Profile
                    </a>
                    {props.isDropdownVisible && (
                        <div className="dropdown">
                            <ul>
                                <li href="#teams" onClick={props.onTeamsClick}>My teams</li>
                                <li onClick={logout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </>
            );
        }
    }
    function topBar() {
            return (
                <div className="topBar">
                    <a href="#main" >Main</a>
                    <a href="#teambuilder" >Team Builder</a>
                    <a href="#browse" >Browse teams</a>
                    <a href="#minigame" >Minigame</a>
                    {loginLogout()}
                </div>
            );
    }

    return (
        <div className="topBar">
            {topBar()}
        </div>
    );
}
