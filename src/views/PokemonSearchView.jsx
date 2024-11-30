export function PokemonSearchView(props) {
    return (
        <div>
            <input
                type="text"
                onChange={userSearchesPokemonACB}
                value={props.text || ""}
            />
        </div>
    );

    function userSearchesPokemonACB(event) {
        // Pass the event object, not just the value
        props.updatePokemonSearchACB(event);
    }
}
