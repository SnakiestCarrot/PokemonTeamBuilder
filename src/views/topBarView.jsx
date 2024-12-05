export function TopBarView(props) {
    return (
        <div className="topBar">
            <a href="#main">Menu</a>
            <a href="#teambuilder">Team Builder</a>
            <a href="#todo">Leaderboard</a>
            <a href="#teams">Teams</a>
            <a onClick={props.onLoginClick}>Login</a>
            <a onClick={props.onLogoutClick}>Logout</a>
        </div>
    );
}