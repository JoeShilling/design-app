import '../data/segmentedRect';
import { React, useState, useEffect } from 'react';
import {fabric} from 'fabric';
import { saveAs } from 'file-saver';
import { useFabricJSEditor } from 'fabricjs-react';

//toolbar at top of the app, put generic utility features here


export const Toolbar = (props) => {
    const editor = props.editor;
    const partData = props.partData;
    const [guidesOn, setGuidesOn] = useState(true);


    const saveSVG = () => {
        let content = editor.canvas.toSVG();
        let blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'canvas.svg');
    }

    const savePNG = () => {
        //set the the guides to transparent so they dont show in the output
        editor.canvas.getObjects().forEach(element => { 
            if (element.type == 'guide') {
                element.set('opacity', 0);
            }
        });

        let content = editor.canvas.toDataURL({
            format: 'png',
            multiplier: 3
        });
        saveAs(content, 'canvas.png');

        //set them back to visible
        editor.canvas.getObjects().forEach(element => {
            if (element.type == 'guide') {
                element.set('opacity', 0);
            }
        });
    }

    const toggleGuides = () => { //turns guides on and off
        
        if (guidesOn) { //check to see if the different types of guides exist and then print them
            if (partData.guides.x) {
                partData.guides.x.forEach(element => { //trying to get guides to work
                    let l = new fabric.Line([element,0, element, partData.height], {
                        stroke:'red',
                        eventable:false,
                        selectable:false,
                        excludeFromExport:true,
                        hoverCursor:'default',
                    })
                    l.set("type", "guide");
                    editor.canvas.add(l);
                });
            }
            if (partData.guides.xp) {
                partData.guides.xp.forEach(element => { //trying to get guides to work
                    let l = new fabric.Line([element/100 * partData.width,0, element/100 * partData.width, partData.height], {
                        stroke:'red',
                        eventable:false,
                        selectable:false,
                        excludeFromExport:true,
                        hoverCursor:'default',
                    })
                    l.set("type", "guide");
                    editor.canvas.add(l);
                });
            }
            if (partData.guides.y) {
                partData.guides.y.forEach(element => { //trying to get guides to work
                    let l = new fabric.Line([0,element, partData.width, element], {
                        stroke:'red',
                        eventable:false,
                        selectable:false,
                        excludeFromExport:true,
                        hoverCursor:'default',
                    })
                    l.set("type", "guide");
                    editor.canvas.add(l);
                });
            }
            if (partData.guides.yp) {
                partData.guides.yp.forEach(element => { //trying to get guides to work
                    let l = new fabric.Line([0,element/100 * partData.height, partData.width, element/100 * partData.height], {
                        stroke:'red',
                        eventable:false,
                        selectable:false,
                        excludeFromExport:true,
                        hoverCursor:'default',
                    })
                    l.set("type", "guide");
                    editor.canvas.add(l);
                });
            }
            editor.canvas.renderAll();
        } else {
            let toDelete = [];
            editor.canvas.getObjects().forEach(element => {
                if (element.type == 'guide') {
                    toDelete.push(element);
                }
            });
            toDelete.forEach(element => {
                editor.canvas.remove(element);
            })
        }
        setGuidesOn(!guidesOn);
    }

    return (
        <div>
            <button onClick={()=>saveSVG()}>Save as SVG</button>
            <button onClick={()=>savePNG()}>Save as PNG</button>
            <button onClick={()=>toggleGuides()}>Toggle Guides</button>
        </div>
    );
}