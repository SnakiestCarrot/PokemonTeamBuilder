import { observer } from "mobx-react-lite";
import {  createHashRouter,  RouterProvider } from "react-router-dom";
import { Main } from "../presenters/mainPresenter";
import { TeamBuilder } from "../presenters/teamBuilderPresenter";
import { Inspect } from "../presenters/inspectPresenter";
import { TopBar } from "../presenters/topBarPresenter";

const ReactRoot = observer(
    function ReactRoot(props){
        
        return (
            <div>
                <div>
                    <TopBar model={props.model}/>
                </div>
                <div>
                    <RouterProvider router={makeRouter(props.model)}/>
                </div>
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
            path:"main",
            element: <Main model={model}></Main>
            
        },
        {
            path:"teambuilder",
            element: <TeamBuilder model={model}></TeamBuilder>
        },
        {
            path:"inspect",
            element: <Inspect model={model}></Inspect>
        }
    ]

    return (createHashRouter(routerArray))
}

export { ReactRoot }