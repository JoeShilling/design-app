import { React } from 'react'
import { fabric } from 'fabric'
import {useEffect, useState} from 'react';
import FontFaceObserver from 'fontfaceobserver';
import {createSegmentRect, create9x9SegmentRect} from '../data/segmentedRect';

//the menu of available parts to be added to the canvas

export const Menu = (props) => {
    const editor = props.editor;
    const parts = props.partData;

    //generate a list of all the available parts 
    return (
        <div>
            {props.parts.map(value => {
                return(
                    <PartButton key={value.name} editor={props.editor} part={value} sockets={props.sockets}/>
                );
            })}
        </div>
    );
}

const PartButton = (props) => {
    const editor = props.editor;
    const sockets = props.sockets;
    
    const addPart = () => {
        switch(props.part.type) {
            //based on the type of the part do different stuff
            //decided to hardcode these in. remember to add try/catch for custom parts that may not always be loaded in
            case 'rectangle':
                var object = new fabric.Rect({
                    left: 100,
                    top: 100,
                    fill: props.part.fill,
                    width: 60,
                    height: 20,
                    strokeUniform: true
                });
                break;
                
            case 'circle':
                var object = new fabric.Circle({
                    left: 100,
                    top: 100,
                    radius: 50,
                    
                    strokeUniform: true
                });
                break;
                
            case 'image':
                
                fabric.Image.fromURL(require(`../data/images/${props.part.file}`), (i) => {
                    i.set('left', 100);
                    i.set('top', 100);
                    editor.canvas.add(setProperties(i, props.part, sockets));
                });
                break;

            case 'text':
                const newFont = new FontFaceObserver(props.part.properties.fontFamily);
                newFont.load().then(() => {
                    const object = new fabric.Textbox('Hello World', {
                        left: 100,
                        top: 100,
                        textAlign:'left',
                        width: 100,
                        height: 100,
                        splitByGrapheme: true,
                    });
                    editor.canvas.add(setProperties(object, props.part, sockets));
                })
                break;
            case 'segmentGroup':
                
                try {
                    var object = createSegmentRect(editor);
                }
                catch (e) {
                    console.log("SegmentGroup part probably not loaded");
                    throw(e);
                }
                break;

            case 'segment9x9':
            
                try {
                    var object = create9x9SegmentRect(editor);
                }
                catch (e) {
                    console.log("Segment9x9 part probably not loaded");
                    throw(e);
                }
                break;
        }
        
        if (object != null) {
            editor.canvas.add(setProperties(object, props.part, sockets));
        }
    }
    
    const findPosition = (target, sockets) => {
        for (const socket in sockets) { //go through each element in socket
            if (target == socket) { //
                return [sockets[socket]['x'], sockets[socket]['y']];
            } else if (sockets[socket]['x'] == undefined) { //if that socket is just a group, go through each socket in it
                let i = findPosition(target, sockets[socket]);
                if (i != undefined) {
                    return(i);
                }
            }
        }
    }

    const setProperties = (object, part, sockets) => {
        object.set('partName', part.name); //lets us see what partType the object is
        object.set('lockMovementX', true); //by default you cant drag around parts
        object.set('lockMovementY', true);
        object.setControlsVisibility({bl:false,br:false,mb:false,ml:false,mr:false,mt:false,tl:false,tr:false,mtr:false}); //turn off all the visual controls
        
        //http://fabricjs.com/docs/fabric.Object.html
        for (const property in part.properties) { //sets the properties
            if (property == 'socket') {
                let pos = findPosition(part.properties[property], sockets);
                object.set('left', pos[0]);
                object.set('top', pos[1]);
                object.set('socket', part.properties[property]);
            } else {
                object.set(property, part.properties[property]);
            }
            
        }
        if (object.get('type') == 'group') { //currently the group objects dont set their boundaries properly, have to force it with _calcBounds
            object._calcBounds();
            editor.canvas.renderAll();
        }

        return(object);
    }
    
    return (
        <div>
            <button onClick={() => addPart()}>{props.part.name}</button>
        </div>
    );
}