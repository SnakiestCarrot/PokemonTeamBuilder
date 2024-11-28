import {createRoot} from "react-dom/client";
import { observable, configure } from "mobx";
import { ReactRoot } from "./ReactRoot";
import "/src/firebaseModel.js";

// (1) ------------ retrieve the application state (model) ----------
import { model } from '/src/pokemonModel.js';
const reactiveModel= observable(model);

createRoot(document.getElementById('root'))
    .render(

    <ReactRoot model={reactiveModel}></ReactRoot>
    
);  


//connecting to firebase
import { connectToFirebase } from "../firebaseModel.js";
import { reaction } from "mobx";
configure({ ennforceActions: "never", })
connectToFirebase(reactiveModel, reaction);