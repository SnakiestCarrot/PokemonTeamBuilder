export function TopBarView(props) {
    function loginLogout() {
        if (!props.user) {
            return <a onClick={props.onLoginClick} className="topBar-button">Login</a>;
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
                                <li onClick={props.onLogoutClick}>Logout</li>
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
