export function SearchView(props) {
    return (
        <div className="pokemon-team-search" >
            <div>
                <h1>Search and add:</h1>
            </div>
            <div>
                <input
                    type="text"
                    onChange={userSearchesPokemonACB}
                    value={props.text || ""}
                    placeholder="Search pokemon"
                />
            </div>
        </div>
    );

    function userSearchesPokemonACB(event) {
        // Pass the event object, not just the value
        props.updatePokemonSearchACB(event);
    }
}
