import "../styles.css"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

export function InspectView(props) {
    let pokemonData = [
        { name: 'Health', value: props.currentPokemon.stats[0].base_stat },
        { name: 'Attack', value: props.currentPokemon.stats[1].base_stat },
        { name: 'Defense', value: props.currentPokemon.stats[2].base_stat },
        { name: 'Special Attack', value: props.currentPokemon.stats[3].base_stat },
        { name: 'Special Defense', value: props.currentPokemon.stats[4].base_stat },
        { name: 'Speed', value: props.currentPokemon.stats[5].base_stat },
    ];

    return (
        <div>
            <div className="pokemon-container-inspect">
                <div className="pokemon-card-inspect">
                    <p>{props.currentPokemon.name}</p>
                    <img
                        src={props.currentPokemon.sprites.other['official-artwork'].front_default}
                        alt={props.currentPokemon.name}
                        className="pokemon-image-inspect"
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
                <div className="pokemon-types">
                    <h2 className="capitalize">
                        {/* if there are two types, print "Types", otherwise, 
                    print "Type". if a second type exists, print it too  */}
                        Type: {props.currentPokemon.types[0].type.name}{props.currentPokemon.types[1] ? `/${props.currentPokemon.types[1].type.name}` : ""}
                    </h2>
                </div>
            </div>
            <div className="radar-chart">
                <RadarChart height={500} width={700}
                    outerRadius="80%" data={pokemonData}>
                    <PolarGrid stroke="white" />
                    <PolarAngleAxis dataKey="name" stroke="white" />
                    <PolarRadiusAxis />
                    <Radar dataKey="value" stroke="#de9c19"
                        fill="#de9c19" fillOpacity={0.5}
                    />
                </RadarChart>
            </div>
            <div className="add-to-team-button">
                <button onClick={() => addButtonClicked(props.currentPokemon)}>
                    Add to team
                </button>
            </div>
        </div>
    )

    function addButtonClicked (pokemon) {
        props.addPokemonToCurrentTeam(pokemon.id);
    }
}