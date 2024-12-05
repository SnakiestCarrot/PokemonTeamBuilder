export function PokemonSearchView(props) {
    return (
        <div className="pokemon-team-search" >
            <input
                 type="text"
                onChange={userSearchesPokemonACB}
                value={props.text || ""}
                placeholder="Search pokemon"
            />
        </div>
    );

    function userSearchesPokemonACB(event) {
        // Pass the event object, not just the value
        props.updatePokemonSearchACB(event);
    }
}
