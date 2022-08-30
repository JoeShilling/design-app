import '../data/segmentedRect';
import { createSocketGuides } from '../socketGuides';
import { React, useState} from 'react';
import { saveAs } from 'file-saver';

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
            if (element.type == 'guide' || element.type == 'guide2'  ) {
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
            if (element.type == 'guide' || element.type == 'guide2'  ) {
                element.set('opacity', 100);
            }
        });
    }

    const findPosition = (target, sockets) => { //returns a given socket object
        for (const socket in sockets) { //go through each element in socket
            if (target == socket) { //
                return(sockets[socket]);
            } else if (sockets[socket]['x'] == undefined) { //if that socket is just a group, go through each socket in it
                let i = findPosition(target, sockets[socket]);
                if (i != undefined) {
                    return(i);
                }
            }
        }
    }

    const toggleGuides = () => { //turns guides on and off
        if (guidesOn) { //shows all the possible positions of a selected object

            editor.canvas.set('socketGuides', true);

            let ob = editor.canvas.getActiveObject(); //i hate this
                for (let i = 0; i < partData.parts.length; i++) { //go through each part
                    if (partData.parts[i].name == ob.partName) { //find the part we are have selected
                        for (let p of partData.parts[i].options) { //go through each of its options 
                            if (p.name == 'socket') { //find its sockets
                                {Object.keys(findPosition(p.values, partData.sockets)).map(socket => {
                                    createSocketGuides(editor.canvas, socket, partData.sockets);
                                })};
                            };
                            
                        };
                        
                    };
                };
        } else {
            editor.canvas.set('socketGuides', false);
            let toDelete = [];
            editor.canvas.getObjects().forEach(element => {
                if (element.type == 'guide' || element.type == 'guide2') {
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