import { observer } from "mobx-react-lite";
import {  createHashRouter,  RouterProvider } from "react-router-dom";
import { Main } from "../presenters/mainPresenter";
import { TeamBuilder } from "../presenters/teamBuilderPresenter";
import { Inspect } from "../presenters/inspectPresenter";
import { TopBar } from "../presenters/topBarPresenter";
import { MyTeams } from "../presenters/myTeamsPresenter";
import { Minigame } from "../presenters/minigamePresenter";
import { BrowseTeams } from "../presenters/browseTeamsPresenter";
import { TeamEditor } from "../presenters/teamEditorPresenter";

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
        },
        {
            path:"teams",
            element: <MyTeams model={model}></MyTeams>
        },
        {
            path:"minigame",
            element: <Minigame model={model}></Minigame>
        },
        {
            path:"browse",
            element: <BrowseTeams model={model}></BrowseTeams>
        },
        {
            path:"teameditor",
            element: <TeamEditor model={model}></TeamEditor>
        }

    ]

    return (createHashRouter(routerArray))
}

export { ReactRoot }