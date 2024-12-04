import "../styles.css"

export function InspectView(props) {
    // helper function to capitalize the first letter
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    // extract types from the pokemon object
    const { types } = props.currentPokemon;
    // capitalize the first letter of the type for style
    const firstType = capitalize(types[0].type.name);
    // if a second type exists, capitalize it too. otherwise secondType is null
    const secondType = types.length === 2 ? capitalize(types[1].type.name) : null;


    return (
        <div>
            <h1 className="header">Welcome to pokemon inspect</h1>
            <div className="pokemon-container-inspect">
                <div className="pokemon-card">
                    <p>{props.currentPokemon.name}</p>
                    <img
                        src={props.currentPokemon.sprites.other['official-artwork'].front_default}
                        alt={props.currentPokemon.name}
                        className="pokemon-image"
                    />
                </div>
                <div className="pokemon-stats">
                    <h2>Health: {props.currentPokemon.stats[0].base_stat}</h2>
                    <h2>Attack: {props.currentPokemon.stats[1].base_stat}</h2>
                    <h2>Defense: {props.currentPokemon.stats[2].base_stat}</h2>
                    <h2>Special Attack: {props.currentPokemon.stats[3].base_stat}</h2>
                    <h2>Special Defense: {props.currentPokemon.stats[4].base_stat}</h2>
                    <h2>Speed: {props.currentPokemon.stats[5].base_stat}</h2>
                </div>
            </div>
            <div className="pokemon-types">
                <h2>
                    {/* if there are two types, print "Types", otherwise, 
                    print "Type". if a second type exists, print it too  */}
                    Type{types.length === 2 ? "s" : ""}: {firstType}{secondType ? `, ${secondType}` : ""}
                </h2>
            </div>
        </div>
    )
}