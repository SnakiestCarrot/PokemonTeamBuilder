import { observer } from "mobx-react-lite";
import {  createHashRouter,  RouterProvider } from "react-router-dom";
import { Main } from "../presenters/mainPresenter";
import { Login } from "../presenters/loginPresenter";
import { TeamBuilder } from "../presenters/teamBuilderPresenter";
import { Inspect } from "../presenters/inspectPresenter";
import { TopBarPresenter } from "../presenters/topBarPresenter";
import { MyTeams } from "../presenters/myTeamsPresenter";

const ReactRoot = observer(
    function ReactRoot(props){
        
        return (
            <div>
                <div>
                    <TopBarPresenter />
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
            path:"login",
            element: <Login model={model}></Login>
        },
        {
            path:"inspect",
            element: <Inspect model={model}></Inspect>
        },
        {
            path:"teams",
            element: <MyTeams model={model}></MyTeams>
        }

    ]

    return (createHashRouter(routerArray))
}

export { ReactRoot }