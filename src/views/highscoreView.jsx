


export function HighscoreView(props) {
    const highscoreArray = props.highscores;

    
    return (
        (!props.minigameIsStarted) ? renderHighScoreList(highscoreArray) : (<div></div>)
    )
    
}

function renderHighScoreList(highscores) {
    if(highscores) {
        return (
            <div>
                <div key={"highscore-text"} className="highscore-title-container">   
                    <h2>Top highscores of all time</h2>
                </div>
                <div className="highscores-container" key={"highscore-container"}>
                    {highscores.map(renderHighscore)}
                </div>
                
            </div>
        )
    } else {
        return (
            <div>
                <h2>Could not load highscores</h2>
            </div>
        )
    }
}

function renderHighscore(highscoreEntry, index) {

    if (!highscoreEntry) {
        return null;
    }

    return(
        <div className="highscore-entry" key={"highscore-" + index}>
            <h3>{index+1 + ". " + highscoreEntry.userName}</h3>
            <h3>{}</h3>
            <h3>{"score: " + highscoreEntry.score}</h3>
        </div>
    )
}