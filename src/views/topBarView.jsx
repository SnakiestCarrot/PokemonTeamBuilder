export function TopBarView(props) {
    console.log("User state in TopBarView:", props.model.user); // Debug log
    function loginLogout(){
        if (!props.model.user) {
            return <a onClick={props.onLoginClick}>Login</a>;
        } else {
            return <a onClick={props.onLogoutClick}>Logout</a>;
        }
    }

    return (
        <div className="topBar">
            <a href="#main">Menu</a>
            <a href="#teambuilder">Team Builder</a>
            <a href="#todo">Leaderboard</a>
            <a href="#teams">Teams</a>
            {loginLogout()}
        </div>
    );
}