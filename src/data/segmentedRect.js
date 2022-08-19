import {fabric} from 'fabric';
//creating custom objects by grouping together the existing objects

export function createSegmentRect(editorInput)  {
    let rect1 = new fabric.Rect({
        top:100,
        left:100,
        width:257, //257
        height:257,
        stroke:"white",
        fill:"transparent",
        strokeWidth:1,
        visible:true,
    });

    var object = new fabric.Group([rect1], {
        top:100,
        left:100,
        partName:"segmentGroup",
        editor: editorInput,
        strokeWidth: 5,
        lineStroke: "white",

        // get lines() {
        //     return('lines');
        // }

    })

    Object.defineProperty(object, 'lineStrokeWidth', {
        set (width) {
            console.log(width);
            this.set('strokeWidth',  parseInt(width));
            for (let i = this.getObjects().length - 1; 0 <= i; i--){
                if (this.item(i).type == 'line') {
                    this.item(i).strokeWidth = parseInt(width);
                }

            }

            // let x = this.left;
            // let y = this.top;
            // this._calcBounds(); //copied this from the fabric source, it updates the boundries of the group after we change the strokeWidth
            // this._updateObjectsCoords();
            // this.setCoords();

            // this.set('left', x); //ensures the group stays where it is, otherwise the prevous funcs move it to origin
            // this.set('top', y);

            // this.dirty = true;
            this.editor.canvas.renderAll();
        },
        get () {
            return(this.strokeWidth)
        }
    });

    Object.defineProperty(object, 'lines', {
        set(number) {

            for (let i = this.getObjects().length - 1; 0 <= i; i--){ //iterate backwards to avoid indexing errors
                if (this.item(i).type == 'line') {
                    this.editor.canvas.remove(this.item(i)); //remove the old lines from both canvas and group
                    this.remove(this.item(i));
                }
            }

            let newLines = [],
            s = this.item(0).width / number,
            h = this.item(0).height,
            x = this.left,
            y = this.top;

            for (let i = 1; i < number; i++) { //add new lines back in
                newLines.push(new fabric.Line([x+(s*i) - (this.lineStrokeWidth / 2), y, x+(s*i) - (this.lineStrokeWidth / 2), y+h], {
                    stroke: this.lineStroke,
                    strokeWidth: this.lineStrokeWidth,
                    selectable:false,
                    evented:false,
                    type:"line"
                    }));
                }

            for (let line in newLines) {
                this.addWithUpdate(newLines[line]);
            }

            this.editor.canvas.renderAll();
        }
    });


    return (object);
}