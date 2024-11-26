
import "../styles.css"

export function PokemonInfoView (props) {
    return (
        <div>
            <p>Pokemon name</p>
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




