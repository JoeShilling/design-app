import {fabric} from 'fabric';
//okay so groups didnt work because they would rearrange the objects which was not at all what we wanted
//the current solution is to essentially staple methods onto a invisible Rectangle object 
//for each variable that affects the inner lines, we use a setter function to ensure that after the value is changed, they are visually updated.
//definitely feel like there's got to be a better method of doing this but for now it works

export function createSegmentRect(editorInput) {
    let object = new fabric.Rect({ //these are essentially the default values
        topValue:100,
        leftValue:100,
        width:257, //257
        height:257,
        stroke:"white",
        fill:"transparent",
        strokeWidth:1,
        opacity:0,
        lineOpacity:100,
        objects:[],
        partName:"segmentGroup",
        lines:6,
        lineStrokeWidth:5,
        editor: editorInput,
        hoverCursor:"pointer",
    });

    Object.defineProperty(object, 'lineStrokeWidth', { //wrapper setter that ensures the lines are updated after the change
        set (width) {
            this.set('lineStrokeWidthValue',  parseInt(width)); 
            this.set('lines', this.get('lines'));
        },
        get () {
            return(this.lineStrokeWidthValue);
        }
    });

    Object.defineProperty(object, 'left', { //wrapper setter that ensures the lines are updated after the change
        set (value) {
            this.set('leftValue', value);
            this.set('lines', this.get('lines'));
        },
        get () {
            return (this.get('leftValue'));
        }
    });

    Object.defineProperty(object, 'top', { //wrapper setter that ensures the lines are updated after the change
        set (value) {                                                   
            this.set('topValue', value);
            this.set('lines', this.get('lines'));
        },
        get () {
            return (this.get('topValue'));
        }
    });

    Object.defineProperty(object, 'lines', { //essentially a render function for the lines?
        set (number) {
            number++;

            for (let i = this.objects.length - 1; 0 <= i; i--){ //iterate backwards to avoid indexing errors while removing elements
                if (this.objects[i].type == 'line') {
                    this.editor.canvas.remove(this.objects[i]); //remove the old lines from both canvas and group
                    this.objects.splice(i,1);
                }
            }

            let s = this.width / number,
                h = this.height,
                x = this.left,
                y = this.top;

            for (let i = 1; i < number; i++) { //add new lines back in
                this.objects.push(new fabric.Line([x+(s*i)- (this.lineStrokeWidth/2), y, x+(s*i) - (this.lineStrokeWidth/2), y+h], {
                    stroke: this.stroke,
                    strokeWidth: this.lineStrokeWidth,
                    opacity: this.lineOpacity,
                    selectable:false,
                    evented:false,
                    type:"line"
                    }));
            };

            for (let i = this.objects.length - 1; 0 <= i; i--){ //iterate backwards to avoid indexing errors while removing elements
                if (this.objects[i].type == "line") {
                    this.editor.canvas.add(this.objects[i]); //add new lines to canvas
                }
            }

            this.editor.canvas.renderAll();

        },

        get () {
            let num = 0;
            for (let i = this.objects.length - 1; 0 <= i; i--){ //iterate backwards to avoid indexing errors while removing elements
                if (this.objects[i].type == 'line') {
                    num++;
                }
            }
            return(num);
        }
    });

    Object.defineProperty(object, 'opacity', {
        set(number) {
            this.objects.forEach((object) => {object.set('opacity', number)});
            this.lineOpacity = number;  
        },
        get() {
            return(this.lineOpacity);
        }
    });
    
    return(object);
}


export function create9x9SegmentRect(editorInput) {
    let miniRects = [];
    for (let counter = 0; counter < 9; counter++) {
        let ob = createSegmentRect(editorInput);
        ob.set('width', 85.7);
        ob.set('height', 82);
        ob.set('left', 64 + (85.7 * (counter % 3)));
        ob.set('top', 441 + (85.7 * Math.floor(counter / 3)));
        ob.set('lines', 5);
        ob.set('lineStrokeWidth', 5);
        ob.setCoords();
        miniRects.push(ob);
    };
    let g = new fabric.Group(miniRects);

    g.setObjectProperty = (property, value) => { //sets a given property to a value for all objects in the group
        g.getObjects().forEach(object => {
            object.set(property, value);
        });
    };

    Object.defineProperty(g, 'left', {
        set (number) {
            this.leftValue = number;
            let counter =0;
            this.getObjects().forEach(object => {
                object.set('left', number + (85.7 * (counter % 3)));
                counter++;
            });
        },
        get () {
            return(this.leftValue)
        }
    });
    Object.defineProperty(g, 'top', {
        set (number) {
            this.topValue = number;
            let counter =0;
            this.getObjects().forEach(object => {
                object.set('top', number + (85.7 * Math.floor(counter / 3)))
                counter++;
            });
        },
        get () {
            return(this.topValue)
        }
    });

    Object.defineProperty(g, 'lines', {
        set (number) {
            this.setObjectProperty('lines', number);
        },
        get () {
            return(this.getObjects()[0].lines)
        }
    });

    Object.defineProperty(g, 'lineStrokeWidth', {
        set (number) {
            this.setObjectProperty('lineStrokeWidth', number);
        },
        get () {
            return(this.getObjects()[0].lines)
        }
    });

    g._calcBounds();
    return(g);

}