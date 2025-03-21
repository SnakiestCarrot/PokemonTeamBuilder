import "../inspectStyles.css";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { renderTypeImage } from "./viewUtilities";

export function InspectView(props) {

    if (props.loading) {
        return (
            <div align="center"><img src="https://brfenergi.se/iprog/loading.gif" /></div>
        )
    }

    if (!props.currentPokemon) {
        return <div>Loading Pokémon...</div>;
    }

    const flavorTextEntry = props.currentPokemonSpecies?.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
    );
    const flavorText = flavorTextEntry ? flavorTextEntry.flavor_text : "Loading...";

    const pokemonData = [
        { name: 'Health', value: props.currentPokemon.stats[0].base_stat },
        { name: 'Attack', value: props.currentPokemon.stats[1].base_stat },
        { name: 'Defense', value: props.currentPokemon.stats[2].base_stat },
        { name: 'Special Attack', value: props.currentPokemon.stats[3].base_stat },
        { name: 'Special Defense', value: props.currentPokemon.stats[4].base_stat },
        { name: 'Speed', value: props.currentPokemon.stats[5].base_stat },
    ];

    function handleAddButtonClicked() {
        addButtonClicked(props.currentPokemon);
    }

    return (
        <div>
            <div className="parent-container-inspect">
                <div className="pokemon-info-wrapper">
                    <button
                        className="add-to-team-button"
                        onClick={handleAddButtonClicked}>
                        Add to team
                    </button>
                    <div className="card-and-stats-wrapper">
                        <div className="pokemon-card-inspect">
                            <p className="capitalize">{props.currentPokemon.name}</p>
                            <div className="pokemon-types">
                                {props.typeIds.length === 1
                                    ? renderTypeImage(props.typeIds[0])
                                    : (
                                        <>
                                            {renderTypeImage(props.typeIds[0])}
                                            {renderTypeImage(props.typeIds[1])}
                                        </>
                                    )
                                }
                            </div>
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
                    </div>
                    <p className="flavor-text">
                        {flavorText}
                    </p>
                </div>
                <div className="radar-chart">
                    <RadarChart height={500} width={575} outerRadius="80%" data={pokemonData}>
                        <PolarGrid stroke="white" />
                        <PolarAngleAxis dataKey="name" stroke="white" />
                        <PolarRadiusAxis />
                        <Radar
                            dataKey="value"
                            stroke="#de9c19"
                            fill="#de9c19"
                            fillOpacity={0.5}
                        />
                    </RadarChart>
                </div>
            </div>
        </div>
    );

    function addButtonClicked(pokemon) {
        if (!props.teamFullStatus) {
            props.addPokemonToTeam(pokemon.id);
        } else {
            props.addPokemonToTeamFailed();
        }
    }
}
