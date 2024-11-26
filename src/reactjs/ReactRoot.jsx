import { observer } from "mobx-react-lite";
import {  createHashRouter,  RouterProvider } from "react-router-dom";
import { Main } from "../presenters/mainPresenter";
import { Search } from "../presenters/searchPresenter";
import { PokemonInfo } from "../presenters/pokemonInfoPresenter";

const ReactRoot = observer(
    function ReactRoot(props){
        
        return (
                <div>
                    <RouterProvider router={makeRouter(props.model)}/>
                </div>
            );
    }
)

function makeRouter (model) {
    const routerArray = [
        {
            path:"/",
            element: <Main model={model}></Main>
        },
        {
            path:"/main",
            element: <Main model={model}></Main>
            
        },
        {
            path:"/search",
            element: <Search model={model}></Search>
        },
        {
            path:"/pokemonInfo",
            element: <PokemonInfo model={model}></PokemonInfo>
        }
    ]

    return (createHashRouter(routerArray))
}

export { ReactRoot }