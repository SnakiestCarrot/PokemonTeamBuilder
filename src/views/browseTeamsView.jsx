
export function BrowseTeamsView(props) {
    if (!props.user) {
        return (
            <div className="no-teams-or-user-found-container">
                <h1>No user could be found</h1>
                <h2>Login to browse teams!</h2>
            </div>
        );
    }
    return;
}

