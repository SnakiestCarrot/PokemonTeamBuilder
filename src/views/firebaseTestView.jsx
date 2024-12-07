export function FirebaseTestView(props) {
    return (    
        <div className="pokemon-team-card" >
            <button onClick={userClicksAddTeam}>add team to firebase</button>
        </div>             
    );

    function userClicksAddTeam() {
        props.userWantsToSaveTeam();
    }
}
