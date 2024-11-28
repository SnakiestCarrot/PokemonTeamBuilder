import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { MainView } from "../views/mainView";
import { getRandomPokemon } from "../pokemonSource";

const Main = observer(function MainRender(props) {
    const [pokemonList, setPokemonList] = useState([]);

    // Fetch the Pokémon name when the component mounts
    useEffect(() => {
        getRandomPokemon(4)
            .then((data) => {
                setPokemonList(data); // Store the Pokémon array in state
            })
            .catch((error) => {
                console.error("Error fetching Pokémon:", error);
            });
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div>
            <MainView
                changeToSearchPage={props.model.setToSearchPage}
                pokemonList={pokemonList}
            />
        </div>
    );
});

export { Main };
