import {fabric} from 'fabric';
//creating custom objects by grouping together the existing objects

export function createSegmentRect()  {
    let rect1 = new fabric.Rect({
        top:100,
        left:100,
        width:257,
        height:257,
        stroke:"white",
        fill:"transparent",
        strokeWidth:3,
    });
    let line1 = new fabric.Line([125, 100,125, 357], {
        stroke:"white",
        strokeWidth:3,
        selectable: false,
        evented: false
    });
    let line2 = new fabric.Line([225, 100,225, 357], {
        stroke:"white",
        strokeWidth:3,
        selectable: false,
        evented: false
    });
    var object = new fabric.Group([rect1, line1, line2], {
        top:100,
        left:100,
        partName:"segmentGroup"
    })
    return (object);
}

export function changeLines(group, event, editor) { //the object to change, how many lines it should have at the end
    let number = parseInt(event.target.value);
    for (let object in group.getObjects()) {
        if (group.item(object).type == 'line') {
            group.remove(group.item(object));
        }
    }

    console.log(group.getObjects());
    let newLines = [],
    s = group.item(0).number,
    h = group.item(0).height,
    x = group.left,
    y = group.top;

    for (let i = 0; i < number; i++) {
        newLines.push(new fabric.Line([x+(s*i+1), y, x+(s*i+1), y+h], {
            stroke:group.item(0).stroke,
            strokeWidth: group.item(0).strokeWidth,
            selectable:false,
            evented:false
        }));
    }
    for (let line in newLines) {
        group.add(newLines[line]);
    }
    editor.canvas.renderAll();
}