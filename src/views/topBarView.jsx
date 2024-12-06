export function TopBarView(props) {
    function loginLogout() {
        if (!props.model.user) {
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
                                <li onClick={props.onLogoutClick}>Logout</li>
                            </ul>
                        </div>
                    )}
                </>
            );
        }
    }

    return (
        <div className="topBar">
            <a href="#main" >Main</a>
            <a href="#teambuilder" >Team Builder</a>
            <a href="#teams" >My teams</a>
            <a href="#todo" >Browse teams</a>
            {loginLogout()}
        </div>
    );
}
