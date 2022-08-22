import {fabric} from 'fabric';
//okay so groups didnt work because they would rearrange the objects which was not at all what we wanted

export function createSegmentRect(editorInput) {
    let object = new fabric.Rect({
        topValue:100,
        leftValue:100,
        width:257, //257
        height:257,
        stroke:"white",
        fill:"transparent",
        strokeWidth:1,
        opacity:0,
        objects:[],
        partName:"segmentGroup",
        lines:6,
        lineStrokeWidth:5,
        editor: editorInput
    });

    

    Object.defineProperty(object, 'lineStrokeWidth', {
        set (width) {
            console.log('linestrokewidth setter');
            this.set('lineStrokeWidthValue',  parseInt(width));
            this.set('lines', this.get('lines'));
        },
        get () {
            return(this.lineStrokeWidthValue);
        }
    });


    Object.defineProperty(object, 'left', {
        set (value) {
            this.set('leftValue', value);
            this.set('lines', this.get('lines'));
        },
        get () {
            return (this.get('leftValue'));
        }
    });

    Object.defineProperty(object, 'top', {
        set (value) {
            this.set('topValue', value);
            this.set('lines', this.get('lines'));
        },
        get () {
            return (this.get('topValue'));
        }
    });

    Object.defineProperty(object, 'lines', {
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
                    selectable:false,
                    evented:false,
                    type:"line"
                    }));
            };

            for (let i = this.objects.length - 1; 0 <= i; i--){ //iterate backwards to avoid indexing errors while removing elements
                if (this.objects[i].type == "line") {
                    console.log(this.objects[i]);
                    this.editor.canvas.add(this.objects[i]); //remove the old lines from both canvas and group
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

    return(object);
}