import { React } from 'react';
import { fabric } from 'fabric';

export const Options = (props) => {
    const editor = props.editor;
    const objects = props.objects
    
    const deleteObject = () => {
        editor.canvas.remove(editor.canvas.getActiveObject());
    }
    
    const changeHeight = (e) => {
        const value = e.target.value;
        let scale = value /objects[0].get('height');
        objects.forEach((i) => {
            i.set('scaleY', parseFloat(scale))
        })
        editor.canvas.renderAll();
    }
    
    const changeWidth = (e) => {
        const value = e.target.value;
        let scale = value / objects[0].get('width');
        objects.forEach((i) => {
            i.set('scaleX', parseFloat(scale))
        })
        editor.canvas.renderAll();
    }
    
    const changeXPos = (e) => {
        const value = e.target.value;
        objects.forEach((i) => {
            i.set('left', parseFloat(value))
        })
        editor.canvas.renderAll();
    }
    
    const changeYPos = (e) => {
        const value = e.target.value;
        objects.forEach((i) => {
            i.set('top', parseFloat(value))
        })
        editor.canvas.renderAll();
    }
    
    const changeGeneric = (e) => {
        const value = e.target.value;
        const prop = e.target.id;
        objects.forEach((i) => {
            i.set(prop, value)
        })
        editor.canvas.renderAll();
    }

    
    if (objects.length == 1) { //if only one object is selected
        let i =0; //define it out of the loop so we can access it later
        for (i; i < props.parts.length; i++) { //lets us find the options for the selected part type
            if (props.parts[i].name == objects[0].partName) {
                break;
            }
        }
        return (
            <div>
                <button onClick={() => deleteObject()}>Delete Part</button>
    
                
                {props.parts[i].options.map(value => { //the id for the form is the name of the object property being changed
                    switch (value) {
                        case 'height':
                            return(<div key={value}>
                            <label htmlFor="height">Height: </label>
                            <input id='height'  type='text' placeholder={(objects[0].get('height') * objects[0].get('scaleY')).toFixed(2)} onChange={changeHeight}/>
                            <br/> </div>);
                            
                            break;
                        case 'width':
                            return (<div key={value}>
                            <label htmlFor="width">Width: </label>
                            <input id='width'  type='text' placeholder={(objects[0].get('width') * objects[0].get('scaleX')).toFixed(2)} onChange={changeWidth}/>
                            </div>)
                            
                            break;
                        case 'xPos':
                            return(<div key={value}>
                            <label htmlFor="left">X Position: </label>
                            <input id="left" type="text" placeholder={objects[0].get('left')} onChange={changeXPos}/>    
                            </div>)
                            break;
                        case 'yPos':
                            return(<div key={value}>
                            <label htmlFor="top">Y Position: </label>
                            <input id="top" type="text" placeholder={objects[0].get('top')} onChange={changeYPos}/>    
                            </div>)
                            break;
                        case 'angle':
                            return(<div key={value}>
                            <label htmlFor="angle">Rotation: </label>
                            <input id="angle" property="angle" type="text" placeholder={objects[0].get('angle')} onChange={changeGeneric}/>    
                            </div>)
                            break;
                        default:
                            return;
    
                    }
                })}
            </div>
        )
    } else {
        return(<div/>);
   }
}