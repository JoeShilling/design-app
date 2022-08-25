import '../data/segmentedRect';
import { createSocketGuides } from '../socketGuides';
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
        
        if (guidesOn) { //check to see if the different types of guides exist and then print them

            editor.canvas.set('socketGuides', true);

            let ob = editor.canvas.getActiveObject(); //i hate this
                for (let i = 0; i < partData.parts.length; i++) {
                    if (partData.parts[i].name == ob.partName) {
                        for (let p of partData.parts[i].options) { //joe this data structure is god awful please change it
                            if (p.name == 'socket') {
                                {Object.keys(findPosition(p.values, partData.sockets)).map(socket => {
                                    createSocketGuides(editor.canvas, socket, partData.sockets);
                                })};
                            };
                            
                        };
                        
                    };
                };

            
            // if (partData.guides.x) { //x guides specified with pixels
            //     partData.guides.x.forEach(element => { //trying to get guides to work
            //         let l = new fabric.Line([element,0, element, partData.height], {
            //             stroke:'red',
            //             eventable:false,
            //             selectable:false,
            //             excludeFromExport:true,
            //             hoverCursor:'default',
            //         })
            //         l.set("type", "guide");
            //         editor.canvas.add(l);
            //     });
            // }
            // if (partData.guides.xp) { //x guides as percentages
            //     partData.guides.xp.forEach(element => { //trying to get guides to work
            //         let l = new fabric.Line([element/100 * partData.width,0, element/100 * partData.width, partData.height], {
            //             stroke:'red',
            //             eventable:false,
            //             selectable:false,
            //             excludeFromExport:true,
            //             hoverCursor:'default',
            //         })
            //         l.set("type", "guide");
            //         editor.canvas.add(l);
            //     });
            // }
            // if (partData.guides.y) { //y guides specified with pixels
            //     partData.guides.y.forEach(element => { //trying to get guides to work
            //         let l = new fabric.Line([0,element, partData.width, element], {
            //             stroke:'red',
            //             eventable:false,
            //             selectable:false,
            //             excludeFromExport:true,
            //             hoverCursor:'default',
            //         })
            //         l.set("type", "guide");
            //         editor.canvas.add(l);
            //     });
            // }
            // if (partData.guides.yp) { //y guides specified as percentages
            //     partData.guides.yp.forEach(element => { //trying to get guides to work
            //         let l = new fabric.Line([0,element/100 * partData.height, partData.width, element/100 * partData.height], {
            //             stroke:'red',
            //             eventable:false,
            //             selectable:false,
            //             excludeFromExport:true,
            //             hoverCursor:'default',
            //         })
            //         l.set("type", "guide");
            //         editor.canvas.add(l);
            //     });
            // }
            // if (partData.sockets) { //add guides where all the socket positions are
            //     let allSockets = socketParser(partData.sockets);
            //     allSockets.forEach(socket => {
            //         let c = new fabric.Circle({
            //             left:socket.x,
            //             top:socket.y,
            //             radius:3,
            //             fill:'red',
            //             eventable:false,
            //             selectable:false,
            //             excludeFromExport:true,
            //             hoverCursor:'default',
            //             originX:'center',
            //             originY:'center',
            //             type:'guide',
            //         });
            //         editor.canvas.add(c);
            //         let t = new fabric.Text(socket.name, {
            //             left:socket.x + 5,
            //             top:socket.y - 5,
            //             fill:'red',
            //             fontSize: 11,
            //             eventable:false,
            //             selectable:false,
            //             excludeFromExport:true,
            //             hoverCursor:'default',
            //             type:'guide',
            //         });
            //         editor.canvas.add(t);
            //     });
            // }
            // editor.canvas.renderAll();
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

    const socketParser = (sockets) => {
        let coords = [];
        Object.keys(sockets).forEach(socket => {
            if ((Object.keys(sockets[socket])[0] == 'x') && (Object.keys(sockets[socket])[1] == 'y')) {
                coords.push({name:socket, x:sockets[socket]['x'], y:sockets[socket]['y']});
            } else {
                coords = coords.concat(socketParser(sockets[socket]));
            }
        });
        return coords;
    }

    return (
        <div>
            <button onClick={()=>saveSVG()}>Save as SVG</button>
            <button onClick={()=>savePNG()}>Save as PNG</button>
            <button onClick={()=>toggleGuides()}>Toggle Guides</button>
        </div>
    );
}