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
        centeredRotation:true,
        angleValue:0,
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

    // Object.defineProperty(object, 'fill', {
    //     set (colour) {
    //         console.log('setting fill');
    //         for (let i = this.objects.length - 1; 0 <= i; i--){ //iterate backwards to avoid indexing errors while removing elements
    //             if (this.objects[i].type == 'line') {
    //                 this.objects[i].stroke = colour; //the interior objects are lines so Stroke is the attribute to change their colour;
    //             }
    //         }
    //         this.set('lines', this.get('lines'));

    //     },
    //     get () {
    //         return (object.objects[0].fill);
    //     }

    // });

    Object.defineProperty(object, 'fill', {
        set (colour) {
            this.set('stroke', colour);
            this.set('lines', this.get('lines'));
        },
        get () {
            return (object.objects[0].stroke);
        }
    });

    Object.defineProperty(object, 'lineAngle', {
        set(angle) {
            this.set('angleValue', parseInt(angle))
            this.set('lines', this.get('lines'));
        },
        get () {
            return (this.get('angleValue'));
        }
    });

    // Object.defineProperty(object, 'lineOpacity', {
    //     set(angle) {
    //         this.set('angleValue', parseInt(angle))
    //         this.set('lines', this.get('lines'));
    //     },
    //     get () {
    //         return (this.get('angleValue'));
    //     }
    // });

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

                let p1x = x+(s*i)- (this.lineStrokeWidth/2);
                let p1y = y;
                let p2x = x+(s*i) - (this.lineStrokeWidth/2);
                let p2y = y+h;

                let midpointx = this.left + this.width/2;
                let midpointy = this.top + this.height/2;

                let sin = Math.sin(this.lineAngle * (Math.PI/180));
                let cos = Math.cos(this.lineAngle * (Math.PI/180));

                p1x -= midpointx;
                p1y -= midpointy;
                p2x -= midpointx;
                p2y -= midpointy;

                let newP1X = p1x * cos - p1y * sin;
                let newP1Y = p1x * sin + p1y * cos;
                let newP2X = p2x * cos - p2y * sin;
                let newP2Y = p2x * sin + p2y * cos;

                newP1X += midpointx;
                newP1Y += midpointy;
                newP2X += midpointx;
                newP2Y += midpointy;

                this.objects.push(new fabric.Line([newP1X, newP1Y, newP2X, newP2Y], {
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

    // Object.defineProperty(object, 'opacity', { //this caused the shape to display the outline rectangle, im leaving it as a comment in case it breaks anything else by not being here
    //     set(number) {
    //         this.objects.forEach((object) => {object.set('opacity', number)});
    //         this.lineOpacity = number;  
    //     },
    //     get() {
    //         return(this.lineOpacity);
    //     }
    // });




    object.sendToBack = () => {
        for (let i = object.objects.length - 1; 0 <= i; i--){ //iterate backwards to avoid indexing errors while removing elements
            if (object.objects[i].type == 'line') {
                object.editor.canvas.sendToBack(object.objects[i]);
            }
        }
        object.editor.canvas.renderAll();
    }

    object.deleteMe = () => {
        for (let i = object.objects.length - 1; 0 <= i; i--){ //iterate backwards to avoid indexing errors while removing elements
            if (object.objects[i].type == 'line') {
                object.editor.canvas.remove(object.objects[i]); //remove the old lines from both canvas and group
                object.objects.splice(i,1);
            }
        }
        object.editor.canvas.remove(object);
    }
    
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
            let counter = 0;
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

    Object.defineProperty(g, 'fill', {
        set (colour) {
            this.setObjectProperty('stroke', colour);
            this.set('lines', this.lines)
        } , 
        get () {
            return('hello');
        }
    });

    Object.defineProperty(g, 'lineAngle', {
        set (angle) {
            this.setObjectProperty('lineAngle', angle);
            this.set('lines', this.lines)
        } , 
        get () {
            return(this.getObjects()[0].lineAngle);
        }
    });

    g.editor = editorInput;

    g.sendToBack = () => {
        for (let i = g._objects.length - 1; 0 <= i; i--){ //iterate backwards to avoid indexing errors while removing elements
            g._objects[i].sendToBack();
        }
        g.editor.canvas.renderAll();
    }

    g.deleteMe = () => {
        for (let i = g._objects.length - 1; 0 <= i; i--){ //iterate backwards to avoid indexing errors while removing elements

            if (g._objects[i].type == 'rect') {
                console.log("rect");
                g._objects[i].deleteMe();
            }
        }
        g.editor.canvas.remove(g);
    }

    return(g);

}