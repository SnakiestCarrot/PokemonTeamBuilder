
import "../minigameStyles.css";

import { pokemonIdToTypeId } from "../utilities";
import { renderTypeImage } from "./viewUtilities";

export function MinigameView(props) {
    const minigameIsStarted = props.minigameIsStarted;
    const pokemons = props.pokemons;
    const isCorrectChoice = props.isCorrectChoice;

    // Is > 1 if pokemon 0 wins, = 1 if its a tie and < 1 if pokemon 1 wins
    const pokemonWithAdvantage = props.pokemonWithAdvantage;

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
            isCorrectChoice ? (
            <div className="">
                <div className="score-container">
                    <h2>Score:</h2>
                    <h2>{props.currentScore}</h2>
                </div>
                <div className="minigame-pokemon-container">
                    {pokemons.map(renderMinigamePokemonCard)}
                </div>
                <button className="minigame-tie-button" onClick={() => userSelectedPokemon(2)}>No type advantage</button>
                <div className="wrong-answer-button-container">
                    <button className="wrong-answer-minigame-button" onClick={endMinigame}>Quit</button>
                </div>
                
            </div>
            ) : (
                renderWrongAnswerScreen()
            )
            
        )
    }

    function renderWrongAnswerScreen() {
        let messageToShow = "Wrong answer, ";

        if (pokemonWithAdvantage > 1) {
            messageToShow += pokemons[0].name + " wins!"
        } else if (pokemonWithAdvantage < 1) {
            messageToShow += pokemons[1].name + " wins!"
        } else {
            messageToShow += "its a tie!"
        }
        
        return (
            <div>
                <h2>{messageToShow}</h2>
                {renderWrongAnswer()}
            </div>
        )
    }

    // Renders the consistent part of the screen when the user gives a wrong answer in the minigame
    function renderWrongAnswer() {
        return (
        <div>
            <h2>Final score: {props.currentScore}</h2>
            <div className="minigame-pokemon-container">
                {pokemons.map(renderMinigamePokemonCard)}
            </div>
            <div className="wrong-answer-button-container">
                <button className="wrong-answer-minigame-button" onClick={endMinigame}>Quit</button>
                <button className="wrong-answer-minigame-button" onClick={startMinigame}>Try again</button>
            </div>
            
        </div>
        )
    }

    // Renders the screen for when the minigame is in its not started state
    function renderNotStartedMinigame() {
        
        // Hardcoded since we do not want any other images here, unecessary to use the API to first fetch the URLs
        const fireTypeSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/types/generation-viii/sword-shield/10.png";
        const waterTypeSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/types/generation-viii/sword-shield/11.png";
        const charmanderSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png";
        const squirtleSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png";
        
        return (
            <div className="">
                <h2>Type advantage minigame</h2>
                <div className="minigame-instruction-container">
                    <p>
                        In this minigame you will be presented with 2 pokemon. Your task is to click the pokemon you believe has the type advantage over the other. 
                        If you believe that none of the 2 pokemons has an advantage you can click the no advantage button. Try getting the highest score possible!
                    </p>
                    
                    <p>
                        A type advantage is when a pokemons type gives it an edge when battling pokemon of a specific other type.
                        For example, water type pokemon deal double damage to fire types, therefore water pokemon have a type advantage over fire types.
                    </p>
                
                    <div className="example-container">
                        <div>
                            <img 
                            className="minigame-example-type-image"
                            src={fireTypeSpriteUrl}/>
                            <span> </span>
                            <img 
                            className="minigame-example-type-image"
                            src={waterTypeSpriteUrl}/>
                        </div>
                        <div>
                            <img 
                            className="minigame-example-image"
                            src={charmanderSpriteUrl}>
                            </img>
                            
                            <img 
                            className="minigame-example-image"
                            src={squirtleSpriteUrl}>
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










