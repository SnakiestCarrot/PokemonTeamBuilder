import { observer } from "mobx-react-lite";
import {  createHashRouter,  RouterProvider } from "react-router-dom";
import { Main } from "../presenters/mainPresenter";
import { Search } from "../presenters/searchPresenter";
import { Login } from "../presenters/loginPresenter";
import { TopBar } from "../components/topBarComponent";
import { TeamBuilder } from "../presenters/teamBuilderPresenter";

const ReactRoot = observer(
    function ReactRoot(props){
        
        return (
            <div>
                <div>
                    <TopBar />
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
    ]

    return (createHashRouter(routerArray))
}

export { ReactRoot }