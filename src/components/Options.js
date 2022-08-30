import { React } from 'react';
import { createSocketGuides } from '../socketGuides';

//shows available options for the selected part
//TODO to make this so it doesnt explode if you select something that hasnt been set up yet
export const Options = (props) => {
    const editor = props.editor;
    const objects = props.objects;
    const sockets = props.sockets;
    
    // const[objects, setObjects] = useState(props.objects);
    const deleteObject = () => {
        let ob = editor.canvas.getActiveObject();
        if (ob.objects) {// if the object is custom and has sub-objects
            for (let i = ob.objects.length - 1; 0 <= i; i--){ //iterate backwards to avoid indexing errors while removing elements
                if (ob.objects[i].type == 'line') {
                    editor.canvas.remove(ob.objects[i]); //remove the old lines from both canvas and group
                    ob.objects.splice(i,1);
                }
            }
        }
        editor.canvas.remove(ob);
    }

    const changeGeneric = (e) => {
        const value = e.target.value;
        const prop = e.target.id;
        objects.forEach((i) => {
            i.set(prop,value)
            i.set('dirty', true); //tells fabric to rerender the object
        })
        editor.canvas.renderAll();
    }

    const changeText = (e) => {
        const value = e.target.value;
        const prop = e.target.id;
        objects.forEach((i) => {
            i.set(prop,value)
        })
        editor.canvas.renderAll();
    }

    const changeSocketWrapper = (e) => { //turns the event object into the bit we want
        changeSocket(e.target.value);
    }
    
    const changeSocket = (target) => {
        let socket = findPosition(target, sockets);
        objects[0].set('top', socket.y);
        objects[0].set('left', socket.x);
        objects[0].set('socket', target);
        editor.canvas.renderAll();
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

    const clearGuides = () => {
        let toDelete = [];
        editor?.canvas.getObjects().forEach(element => {
            if (element.type == 'guide2') {
                toDelete.push(element);
            }
        });
        toDelete.forEach(element => {
            editor?.canvas.remove(element);
        })
    };


    if (objects.length == 1 ) { //if only one object is selected
        let i =0; //define it out of the loop so we can access it later
        for (i; i < props.parts.length; i++) { //lets us find the options for the selected part type
            if (props.parts[i].name == objects[0].partName) {
                break;
            }
        }



        if (i != props.parts.length) { //if this is false it means the selected object isnt in the parts list.
            return (
                <div>
                   
                   <button onClick={() => deleteObject()}>Delete Part</button>
                    {props.parts[i].options.map(value => {
                        switch(value.name) { //first check for any options that need specific functions, atm that just sockets
                            case 'socket':
                                clearGuides();
                                return(<div key="socket">
                                    <label htmlFor="socket">Socket: </label>
                                    <select name="socket" id="socket" onChange={changeSocketWrapper}  defaultValue={objects[0].socket}>
                                        {Object.keys(findPosition(value.values, sockets)).map(socket => {
                                            if (editor.canvas.get('socketGuides')) {
                                                createSocketGuides(editor.canvas, socket, sockets);
                                            };
                                            
                                            return(
                                                <option key={socket} value={socket}>{socket}</option>
                                            )
                                        })}
                                    </select>
                                    </div>
                                )
                                break;

                            default:
                                switch (value.type) { //then sort th others by type of options
                                    case 'slider':
                                        return(<div key={value.name}>
                                            <label htmlFor={value.name}>{value.name}: </label>
                                            <input id={value.name} type='range' min={value.min} max={value.max} defaultValue={objects[0].get(value.name)} onChange={changeGeneric}/>
                                        </div>)
                                        break;
                                    case 'textArea':
                                        return(<div key={value.name}>
                                            <label htmlFor={value.name}>{value.name}: </label>
                                            <textarea id={value.name} name={value.name} rows="4" cols="50" onChange={changeText} defaultValue={objects[0].get('text')}></textarea>
                                        </div>)
                                }
                                break;
                        }
    
                    })}
    
                </div>
            )
        } else {
            console.log('unrecognised object');
            console.log(objects[0]);
            return(<div/>);
        }


    } else {
        clearGuides();
        return(<div/>);
   }
}