
import { pokemonIdToTypeId } from "../utilities";
import "../teamBuilderStyles.css";

// This is the view that will display the current team when making edits to it
// it recieves as input props.team, the current team of the model.
export function TeamBuilderView(props) {
    const team = props.team;
    const loading = props.loading;

    return (
        <div className="team-builder-team-container">
            
            <h2>Current team:</h2>

            <div className="team-builder-cards">
                {team.pokemons.map(renderPokemonCard)}
            </div>
            

            <div className="team-builder-name">
                
                <input
                    className="team-builder-name-input"
                    onChange={teamNameChanged}
                    value={team.teamName}
                    placeholder="Input team name">
                </input>

                <div style={{ height: '1rem' }}></div>
                
                <div>
                    {renderSaveToTeamButton()}
                </div>
                
            </div>

        </div>

    );

    function removeButtonClicked(index) {
        props.removePokemonFromCurrentTeam(index);
    }

    function userClicksSaveTeamButton() {
        props.saveCurrentTeamToProfile();
    }

    function teamNameChanged(event) {
        props.changeTeamName(event.target.value);
    }

    function renderSaveToTeamButton() {
        if (props.user) {
            return (
                <button
                    className="pokemon-save-team-button"
                    onClick={userClicksSaveTeamButton}>
                    Save team to profile
                </button>
            )
        } else {
           return <span style={{color: 'white'}}>Login to save teams!</span>
        }
    }

    function UserClicksPokemonCard(pokemonId){
        props.userClicksPokemon(pokemonId);
    }

    function renderPokemonCard(pokemon, index) {

        if (loading) { //PLACEHOLDER
            return (<div     
            className="pokemon-team-card" >
            <h2>loading...</h2>
            </div>)
        } else {
            return (
                <div key={index}>
                    {pokemon ? (
                        <div
                            key={pokemon.name}
                            className="pokemon-team-card" 
                            >
                            <h2>{pokemon.name}</h2>
                            {renderTypeImages(pokemon)}
                            {renderPokemonImage(pokemon)}
                            <div>
                                <button onClick={() => removeButtonClicked(index)} className="pokemon-team-button">Remove</button>
                                <button onClick={
                                    (event) => {
                                        props.doPokemonInspect(pokemon.id)
                                        event.stopPropagation();
                                }}
                                className="pokemon-team-button" 
                                >Inspect
                                </button>
                            </div>
                            
                        </div>
                    ) : (
                        renderEmptyTeamSlot()
    
                    )}
                </div>
            )
        }
    }
}

// This function simply extracts just the id of a pokemons types
// from the pokemon data, it does not modify any of the incoming data
function renderTypeImages(pokemon) {
    return (
        pokemonIdToTypeId(pokemon.id).map(renderTypeImage)
    )
}

function renderTypeImage(typeId) {
    return (
        <img
            key={typeId}
            className="team-builder-type-image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/types/generation-viii/sword-shield/${typeId}.png`}
            alt={`Type ${typeId}`}
        />
    )
}

function renderPokemonImage(pokemon) {
    return (
        <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={`${pokemon.name} sprite`}
            className="pokemon-team-image"
        />
    )
}

function renderEmptyTeamSlot() {
    return (
        <div className="pokemon-team-card" >
            <p>Slot is empty,</p>
            <p>search and click</p>
            <p>to add</p>
        </div >
    )
}