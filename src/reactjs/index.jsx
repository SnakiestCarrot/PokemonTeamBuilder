import {createRoot} from "react-dom/client";
import { observable, configure } from "mobx";
import { ReactRoot } from "./ReactRoot";

const originalWarn = console.warn;

console.warn = (message, ...args) => {
    if (message.includes("future flag warning")) {
        return; // Ignore this specific warning
    }
    originalWarn(message, ...args); // Call the original console.warn for other warnings
};

// (1) ------------ retrieve the application state (model) ----------
import { model } from '/src/pokemonModel.js';
const reactiveModel= observable(model);

createRoot(document.getElementById('root'))
    .render(

    <ReactRoot model={reactiveModel}></ReactRoot>
    
);  
