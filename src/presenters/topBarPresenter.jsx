import { observer } from "mobx-react-lite";
import { TopBarView } from "../views/topBarView";
const TopBarPresenter = observer(function TopBarRender(props) {
    return (
        <div>
            <TopBarView
            />;
        </div>
    )
});

export { TopBarPresenter };