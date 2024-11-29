
import "../styles.css"

export function SearchView (props) {
    return (
        <div>
            <p className="margin">Search page</p>
            <div className="login">
                <button onClick={userWantsToSwitchToMainPage}>Go to main page</button>
                <input onChange={userChangesPokemonId} value={props.currentPokemonId || ""}></input>
                <button onClick={userWantsToSearchPokemon}>Search!</button>
            </div>
        </div>
    )

    function userWantsToSwitchToMainPage () {
       props.switchToMainPage()
    }

    function userWantsToSearchPokemon () {
        props.searchPokemon()
    }

    function userChangesPokemonId (event) {
        console.log(event.target.value)
        props.changeCurrentPokemonId(event.target.value)
    }

}