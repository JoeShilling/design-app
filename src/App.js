import './App.css';
import './data/fonts.css';
import { fabric } from 'fabric';
import {useEffect, useState} from 'react';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import FontFaceObserver from 'fontfaceobserver';
import classes from "./App.css";
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

    // partData.guides.x.forEach(element => {
    //     console.log(element);
    //     const l = new fabric.Rect({
    //         fill:'red',
    //         stroke:'red',
    //         strokeWidth:'1',
    //         selectable: false,
    //         evented: false,
    //         height:3,
    //         width: partData.width,
    //         left:0,
    //         top:(element/100 * partData.height)
    //     });
    //     editor?.canvas.add(l);        
    // });


    useEffect(() => {

        partData.guides.x.forEach(element => { //trying to get guides to work
            const l = new fabric.Rect({
                fill:'red',
                stroke:'red',
                strokeWidth:'1',
                selectable: false,
                evented: false,
                height:5,
                width: partData.width,
                left:0,
                top:(element/100 * partData.height)
            });
            console.log(l);
            editor?.canvas.add(l);        
        });
        
        editor?.canvas.renderAll();

    }, []);

    return(
        <div>
            <h1>Design App testing</h1>
            <Toolbar editor={editor}></Toolbar>
            <div  className={'wrapper'}>
                <Menu className={'one'} editor={editor} parts={partData.parts}/>

                <FabricJSCanvas className={'canvas two'} onReady={onReady}/>

                <Options className={'three'} editor={editor} objects={selectedObjects} parts={partData.parts}/>
            </div>
        </div>
    );
}
    

export default App;
