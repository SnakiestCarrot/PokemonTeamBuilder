
import "../minigameStyles.css"

import { pokemonIdToTypeId } from "../utilities";
import { renderTypeImage } from "./viewUtilities";

export function MinigameView(props) {
    const minigameIsStarted = props.minigameIsStarted;
    const pokemons = props.pokemons;

    function startMinigame() {
        props.startMinigame();
    }

    function endMinigame() {
        props.endMinigame();
    }

    function userSelectedPokemon(choice) {
        props.selectPokemon(choice)
    }

    function renderMinigamePokemonCard(pokemon, index) {

        const pokemonNumber = index;

        return (
            <div className="minigame-pokemon-card" key={"pokemon" + index} onClick={() => userSelectedPokemon(pokemonNumber)}>
                <h3>{pokemon?.name}</h3>
                {pokemonIdToTypeId(pokemon.id).map(renderTypeImage)}

                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={`${pokemon.name} sprite`}
                    className="pokemon-team-image"
                />
            </div>
        )
    }

    function renderStartedMinigame() {
        return (
            <div>
                <button onClick={endMinigame}>End minigame!</button>
                <h2>Score:</h2>
                <h2>{props.currentScore}</h2>

                <div className="minigame-pokemon-container">
                    {pokemons.map(renderMinigamePokemonCard)}
                </div>
                <button className="minigame-tie-button" onClick={() => userSelectedPokemon(2)}>No type advantage</button>
                
            
            
            </div>
        )
    }

    function renderNotStartedMinigame() {
        return (
            <div className="">
                <h2>Type advantage minigame</h2>
                <div className="minigame-instruction-container">
                    <p>
                        In this minigame you will be presented with 2 pokemon. Your task is to click the pokemon you believe has the type advantage over the other. 
                        If you believe that none of the 2 pokemons has an advantage you click the tie button. Try getting the highest score possible!
                    </p>
                    
                    <p>
                        A type advantage is when a pokemons type gives it an edge when battling pokemon of a specific other type.
                        For example, water type pokemon deal double damage to fire types, therefore water pokemon have a type advantage over fire types.
                    </p>
                
                    <div className="example-container">
                        <div>
                            <img 
                            className="minigame-example-type-image"
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/types/generation-viii/sword-shield/10.png"/>
                            <span> </span>
                            <img 
                            className="minigame-example-type-image"
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/types/generation-viii/sword-shield/11.png"/>
                        </div>
                        <div>
                            <img 
                            className="minigame-example-image"
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png">
                            </img>
                            
                            <img 
                            className="minigame-example-image"
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png">
                            </img>
                        </div>
                        
                        <h3>Charmander loses against Squirtle, fire loses against water</h3>
                    </div>

                    <p>
                        What complicates matters is when pokemon have several types, in this case their strenghts can combine, but also cancel out,
                        if a pokemon for example has 2 types that both give double damage each to another type, the pokemon will deal 4x damage to that type.
                        But if a pokemon has one type with double damage and another with half damage to the same type, it will result in 1x damage.
                    </p>

                    <button className="start-minigame-button" onClick={startMinigame}>Start minigame!</button>
                    
                </div>
            </div>
        )
    }

    return (
        <div className="minigame-container">
            {minigameIsStarted ? renderStartedMinigame() : renderNotStartedMinigame()}
        </div>


    )



}










