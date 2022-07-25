import {fabric} from 'fabric';

fabric.SegmentRect = fabric.util.createClass(fabric.Rect, {
    type: "segmentRect",

    initialize: function (options) {
        options = options || {};
        this.callSuper('initialize' ,options);
        this.set('segments', options.segments || 3);
    },

    /**
     * Returns object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */
    toObject: function(propertiesToInclude) {
        return this.callSuper('toObject', ['segments'].concat(propertiesToInclude));
    },

    _render: function (ctx) {
        console.log(this.strokeWidth);
        console.log(this.scaleX);
        this.callSuper('_render', ctx);
        //TODO stop these from scaling up when the shape is scaled
        let h = this.height,
        s = this.width/this.segments,
        x = -(this.width/2),
        y = -(this.height/2);

        ctx.beginPath();
        ctx.strokeStyle=this.stroke;
        ctx.lineWidth=this.strokeWidth/this.scaleX; //we want the width of the segment lines to be constant as the shape scaled

        for (let i = 0; i < this.segments-1; i++) {  
            ctx.moveTo(x + s*(i+1), y);
            ctx.lineTo(x + s*(i+1), y + h);
        }
        ctx.stroke();

    }


})