import {fabric} from 'fabric';

fabric.SegmentRect = fabric.util.createClass(fabric.Rect, {
    type: "segmentRect",
    objects: [],

    initialize: function (options) {
        options = options || {};
        this.callSuper('initialize' ,options);
        this.set('canvas', options.canvas);
        // this.set('objects', []);
        Object.defineProperty(this, 'lines', {
            set (number) {
                number++;
    
                for (let i = this.objects.length - 1; 0 <= i; i--){ //iterate backwards to avoid indexing errors while removing elements
                    if (this.objects[i].type == 'line') {
                        this.canvas.remove(this.objects[i]); //remove the old lines from both canvas and group
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
                        this.canvas.add(this.objects[i]); //remove the old lines from both canvas and group
                    }
                }
    
                this.canvas.renderAll();
    
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

        this.set('lines', options.lines || 3);
    },

    // /**
    //  * Returns object representation of an instance
    //  * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
    //  * @return {Object} object representation of an instance
    //  */
    // toObject: function(propertiesToInclude) {
    //     return this.callSuper('toObject', ['segments'].concat(propertiesToInclude));
    // },

    //Write a custom toSVG function

    set lines(number) {
        number = parseInt(number);
        number++;
        console.log('line setter');
        for (let i = this.objects.length - 1; 0 <= i; i--){ //iterate backwards to avoid indexing errors while removing elements
            if (this.objects[i].type == 'line') {
                this.canvas.remove(this.objects[i]); //remove the old lines from both canvas and group
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
                this.canvas.add(this.objects[i]); //remove the old lines from both canvas and group
            }
        }

        this.canvas.renderAll();
    },

    get lines() {
        let num = 0;
        for (let i = this.objects.length - 1; 0 <= i; i--){ //iterate backwards to avoid indexing errors while removing elements
            if (this.objects[i].type == 'line') {
                num++;
            }
        }
        return(num);
    },

    _render: function (ctx) {
        this.callSuper('_render', ctx);
        for (let i = this.objects.length - 1; 0 <= i; i--) {
            this.objects[i]._render();
        }
        // let h = this.height,
        // s = this.width/this.segments,
        // x = -(this.width/2),
        // y = -(this.height/2);

        // ctx.beginPath();
        // ctx.strokeStyle=this.stroke;
        // ctx.lineWidth=this.strokeWidth/this.scaleX; //we want the width of the segment lines to be constant as the shape scaled

        // for (let i = 0; i < this.segments-1; i++) {  
        //     ctx.moveTo(x + s*(i+1), y);
        //     ctx.lineTo(x + s*(i+1), y + h);
        // }
        // ctx.stroke();

    }
    


})

fabric.GradiantRects = fabric.util.createClass(fabric.Object, {
    type:"gradiantRect",
    
    initialize: function (options) {
        options = options || {};
        this.callSuper('initialize', options);
        
        //this.set

        
    },

    _render: function (ctx) {
        this.callSuper('_render', ctx);
        
    }
            
})

class Groupsegments { //takes a dictionary of inputs as the input
    constructor (params) {
        //parameters are height, width, left, top, stroke, fill, strokeWidth, lines, editor
        Object.assign(this, params);
    }


    output() {
        let rect1 = new fabric.Rect({
            top:this.left,
            left:this.top,
            width:this.width,
            height:this.height,
            stroke:this.stroke,
            fill:this.fill,
            strokeWidth:this.strokeWidth
        });
        let line1 = new fabric.Line([this.left+25, this.top,this.left+25, this.top+this.height], {
            stroke:this.stroke,
            strokeWidth:this.strokeWidth,
            selectable: false,
            evented: false
        });

        let group1 = new fabric.Group([rect1, line1], {
            top:100,
            left:100,
            type:"segmentGroup"
        })
        this.editor.canvas.add(group1);
    }
}


