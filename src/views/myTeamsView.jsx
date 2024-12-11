

export function MyTeamsView(props) {
    
    const teams = props.testTeams;

    return (
        <div>
            <h1 className="header">My teams</h1>
        </div>
    )


    function renderUserTeams () {
        teams.map(renderTeam)
    }

    function renderTeam (team) {
        team.map()
    }

    
}