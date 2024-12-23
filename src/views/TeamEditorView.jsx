import { pokemonIdToTypeId } from "../utilities";
import "../teamBuilderStyles.css";

export function TeamEditorView(props){
    const team = props.team;
    const loading = props.loading;

    return(
        <div className="team-builder-team-container">
            <h2>Editing team: {team.teamName}</h2>
            
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

    function teamNameChanged(event) {
        props.changeTeamName(event.target.value);
    }

    function userEndEditing() {
        props.saveEditedTeamToProfile();
    }

    function renderSaveToTeamButton() {
        
            return (
                <button
                    className="pokemon-save-team-button"
                    onClick={userEndEditing}>
                    Finish editing team
                </button>
            )
        
    }

    function renderPokemonCard(pokemon, index) {

        if (loading) { //PLACEHOLDER
            return (<div     
            className="pokemon-team-card" >
            <h2>loading</h2>
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

    function removeButtonClicked(index) {
    props.removePokemonFromEditTeam(index);
    }

}

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

