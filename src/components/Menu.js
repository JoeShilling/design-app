import { React } from 'react'
import { fabric } from 'fabric'
import {useEffect, useState} from 'react';

export const Menu = (props) => {
    const editor = props.editor;
    const parts = props.partData;
    //generate a list of all the available parts 
    return (
        <div>
            {props.parts.map(value => {
                return(
                    <PartButton key={value.name} editor={props.editor} part={value} />
                );
            })}
        </div>
    );
}

const PartButton = (props) => {
    const editor = props.editor;
    
    const addPart = () => {
        switch(props.part.type) {
            //based on the type of the part do different stuff
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
                    editor.canvas.add(addListeners(i, props.part));
                });
                break;
        }
        
        if (object != null) {

            editor.canvas.add(addListeners(object, props.part));
        }
    }
    
    const addListeners = (object, part) => {
        object.set('partName', part.name); //lets us see what partType the object is
        
        
        //http://fabricjs.com/docs/fabric.Object.html
        for (const property in part.properties) { //sets the properties
            object.set(property, part.properties[property]);
        }

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
        
        return(object);
    }
    
    return (
        <div>
            <button onClick={() => addPart()}>{props.part.name}</button>
        </div>
    );
}