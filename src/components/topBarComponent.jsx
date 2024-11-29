export function TopBar() {
    return (
    <div className="topBar">
        <a href="#main">Menu</a>
        <a href="#todo">Leaderboard</a>
        <input className="topSearch" type="text" placeholder="Search for your favorite pokemon!" />
        <a href="#teams">Teams</a>
        <a href="#login">Login</a>
    </div>
    )
}