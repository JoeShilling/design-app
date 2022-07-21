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

        
        //FIX THIS

        //this.callSuper('_render', ctx);

        let h = this.height,
        s = this.width/this.segments,
        x = this.left,
        y = this.top;

        ctx.beginPath();
        ctx.strokeStyle="red";
        ctx.moveTo(100,100);
        ctx.lineTo(100,200);
        for (let i = 0; i < this.segments-1; i++) {
            ctx.moveTo(x + s*(i+1), y);
            ctx.lineTo(x + s*(i+1), y + h);
            console.log(`[${x + s*(i+1)}, ${y}] [${x + s*(i+1)}, ${y + h}]`);
            ctx.stroke();
        }
        

    }


})