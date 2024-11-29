
import "../styles.css"

export function SearchView (props) {
    return (
        <div>
            <p className="margin">Search page</p>
            <div className="login">
                <button onClick={userWantsToSwitchToMainPage}>Go to main page</button>
                <input onChange={userChangesSearchedText}></input>
            </div>
        </div>
    )

    function userWantsToSwitchToMainPage () {
       props.switchToMainPage()
    }

    function userChangesSearchedText (event) {
        props.searchPokemon(event.target.value)
    }

}