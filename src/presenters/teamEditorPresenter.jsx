import { observer } from "mobx-react-lite";
import { TeamEditorView } from "../views/teamEditorView";

const TeamEditor = observer(function TeamEditorRender(props){
    return (
        <div>
            <TeamEditorView />
        </div>
    );
});

export { TeamEditor };