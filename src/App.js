import './App.css';
import './data/fonts.css';
import './data/customObjects';
import { useKeyPress } from './useKeyPress';
import {useEffect} from 'react';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { Menu } from "./components/Menu"
import { Options } from "./components/Options"
import { partData } from "./data/parts"
import { Toolbar } from './components/Toolbar';
 

const App = () =>  {
    const {editor, onReady, selectedObjects} = useFabricJSEditor();

    editor?.canvas.setBackgroundColor(partData.background);
    editor?.canvas.setHeight(partData.height);
    editor?.canvas.setWidth(partData.width);
    editor?.canvas.renderAll();

    useEffect(() => {

    });

    //keyboard shortcuts
    const undo = (event) => {
        if (event.ctrlKey == true) {
            console.log('undo function here please');
        }
        
    }

    useKeyPress(['z'], undo);

    return(
        <div>
            <h1>Design App testing</h1>
            <Toolbar editor={editor} partData={partData}></Toolbar>
            <div  className={'wrapper'}>
                <Menu className={'one'} editor={editor} parts={partData.parts}/>

                <FabricJSCanvas className={'canvas two'} onReady={onReady}/>

                <Options className={'three'} editor={editor} objects={selectedObjects} parts={partData.parts}/>
            </div>
        </div>
    );
}
    

export default App;
