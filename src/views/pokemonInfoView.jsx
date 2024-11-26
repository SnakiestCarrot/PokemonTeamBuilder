
import "../styles.css"

export function PokemonInfoView (props) {
    return (
        <div>
            <p className="debug-title">Pokemon name</p>
            <button onClick={onUserWantsToSearch}>Pokemon search</button>
            <button onClick={userWantsToSwitchToSearchPage}>Search page</button>
        </div>
    )

    function onUserWantsToSearch () {
        props.searchPokemon()
    }

    function userWantsToSwitchToSearchPage () {
       props.changeToSearchPage()
    }

}




