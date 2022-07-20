import './App.css';
import { fabric } from 'fabric';
import {useEffect, useState} from 'react';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import classes from "./App.css";
import { Menu } from "./components/Menu"
import { Options } from "./components/Options"
import { partData } from "./data/parts"
 

const App = () =>  {
    const {editor, onReady, selectedObjects} = useFabricJSEditor();
    
    editor?.canvas.setBackgroundColor(partData.background);
    editor?.canvas.setHeight(partData.height);
    editor?.canvas.setWidth(partData.width);
    editor?.canvas.renderAll();
    
    return(
        <div>
            <h1>Design App testing</h1>
            <div  className={'wrapper'}>
                <Menu className={'one'} editor={editor} parts={partData.parts}/>

                <FabricJSCanvas className={'canvas two'} onReady={onReady}/>

                <Options className={'three'} editor={editor} objects={selectedObjects} parts={partData.parts}/>
            </div>
        </div>
    );
}
    

export default App;
