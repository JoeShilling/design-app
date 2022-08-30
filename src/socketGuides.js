import {fabric} from 'fabric';
//collection of functions used to display the socket 'guides', the markers that show where a particular object can be positioned.
//they're in a seperate file as they need to be used by other toolbar.js and options.js

export function createSocketGuides(canvas, socket, sockets) { //socket and the canvas to put it on
    let s = findPosition(socket, sockets);
    let c = new fabric.Circle({
        left:s.x,
        top:s.y,
        radius:3,
        fill:'red',
        selectable:false,
        excludeFromExport:true,
        hoverCursor:'default',
        originX:'center',
        originY:'center',
        type:'guide2',
    });
    canvas.add(c);
    let t = new fabric.Text(socket, {
        left:s.x + 5,
        top:s.y - 15,
        fill:'red',
        fontSize: 11,
        eventable:false,
        selectable:false,
        excludeFromExport:true,
        hoverCursor:'default',
        type:'guide2',
    });
    canvas.add(t);
};

export function findPosition(target, sockets)  { //returns a given socket object
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