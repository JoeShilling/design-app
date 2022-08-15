import { React } from 'react'
import { fabric } from 'fabric'
import {useEffect, useState} from 'react';
import FontFaceObserver from 'fontfaceobserver';
import {createSegmentRect} from '../data/segmentedRect'

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
                    editor.canvas.add(addListeners(i, props.part, sockets));
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
                    editor.canvas.add(addListeners(object, props.part, sockets));
                })
                break;
            case 'segmentRect': //custom part
                try {
                    var object = new fabric.SegmentRect({
                        left:100,
                        top:100,
                        width:400,
                        height:400,
                        stroke:"white",
                        fill:'black',
                        strokeWidth:5,
                        borderScaleFactor:4,
                        segments:4,
                        strokeUniform:true,
                    });
                }
                catch (e) {
                    console.log("SegmentRect part probably not loaded");
                    throw(e);
                }

                break;
            case 'segmentGroup':
                // let rect1 = new fabric.Rect({
                //     top:100,
                //     left:100,
                //     width:257,
                //     height:257,
                //     stroke:"white",
                //     fill:"transparent",
                //     strokeWidth:3
                // });
                // let line1 = new fabric.Line([125, 100,125, 357], {
                //     stroke:"white",
                //     strokeWidth:3,
                //     selectable: false,
                //     evented: false
                // });
                // let line2 = new fabric.Line([225, 100,225, 357], {
                //     stroke:"white",
                //     strokeWidth:3,
                //     selectable: false,
                //     evented: false
                // });
                // var object = new fabric.Group([rect1, line1, line2], {
                //     top:100,
                //     left:100,
                //     partName:"segmentGroup"
                // })
                var object = createSegmentRect();
                break;
        }
        
        if (object != null) {
            editor.canvas.add(addListeners(object, props.part, sockets));
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

    const addListeners = (object, part, sockets) => {
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

        /* viusal controls no longer used so we don't need this?
        //when the visual controls are used, reset the values in the input forms
        object.on({'scaling': function(e) { 
            if (part.options.includes('height')) {
                document.getElementById('height').value = '';
                document.getElementById('height').placeholder = (this.get('height') * this.get('scaleY')).toFixed(2);
            }
            if (part.options.includes('width')) {
                document.getElementById('width').value = '';
                document.getElementById('width').placeholder = (this.get('width') * this.get('scaleX')).toFixed(2);
            } 
        }});

        object.on({'moving': function(e) {
            if (part.options.includes('xPos')) {
                document.getElementById('left').value = '';
                document.getElementById('left').placeholder = (this.get('left')).toFixed(2);
            }
            if (part.options.includes('yPos')) {
                document.getElementById('top').value = '';
                document.getElementById('top').placeholder = (this.get('top')).toFixed(2);
            }
        }});
        
        object.on({'rotating': function(e) {
            if (part.options.includes('angle')) {
                document.getElementById('angle').value = '';
                document.getElementById('angle').placeholder = (this.get('angle')).toFixed(2);
            }
        }});
        */
        return(object);
    }
    
    return (
        <div>
            <button onClick={() => addPart()}>{props.part.name}</button>
        </div>
    );
}