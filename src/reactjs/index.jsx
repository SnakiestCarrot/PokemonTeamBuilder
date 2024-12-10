import {createRoot} from "react-dom/client";
import { observable, configure } from "mobx";
import { ReactRoot } from "./ReactRoot";
import "/src/firebaseModel.js";

// (1) ------------ retrieve the application state (model) ----------
import { model } from '/src/pokemonModel.js';
const reactiveModel= observable(model);
reactiveModel.init()

createRoot(document.getElementById('root'))
    .render(

    <ReactRoot model={reactiveModel}></ReactRoot>
    
);  


//connecting to firebase
import { connectToFirebase } from "../firebaseModel.js";
import { reaction } from "mobx";
configure({ enforceActions: "never", })
connectToFirebase(reactiveModel, reaction);