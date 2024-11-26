import { observer } from "mobx-react-lite";
import { MainView } from "../views/mainView";

const Main = observer (
    function MainRender(props) {

        return (
            <div>
                <MainView   
                    changeToSearchPage = {props.model.setToSearchPage}
                />
            </div>
        )
    }
);

export { Main };