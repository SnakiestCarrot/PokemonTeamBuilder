export function FirebaseTestView(props) {
    return (    
        <div className="pokemon-team-card" >
            <button onClick={userClicksAddTeam}>add team to firebase</button>
            <button onClick={userClicksGetTeam}>get and log teams from firebase</button>
        </div>             
    );

    function userClicksAddTeam() {
        props.userWantsToSaveTeam();
    }

    function userClicksGetTeam() {
        props.userWantsToGetTeam();
    }
    
}
