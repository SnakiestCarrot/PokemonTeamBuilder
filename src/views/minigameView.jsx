
import "../minigameStyles.css"

export function MinigameView(props) {

    const minigameState = props.minigameIsStarted;

    function startMinigame () {
        props.startMinigame();
    }

    function endMinigame () {
        props.endMinigame();
    }

    return (
        <div className="minigame-container">
            
            {minigameState ? (
                <div>
                    <h2>Minigame is started!</h2>
                    <button onClick={endMinigame}>End minigame!</button>
                </div>
                
            ) : (
                <div>
                    <h2>Minigame is not started!</h2>
                    <button onClick={startMinigame}>Start minigame!</button>
                </div>
            )}
            
        </div>
        
        
    )

    

}










