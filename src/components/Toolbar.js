import { React } from 'react';
import {fabric} from 'fabric';
import { saveAs } from 'file-saver';

export const Toolbar = (props) => {
    const editor = props.editor;

    const saveSVG = () => {
        let content = editor.canvas.toSVG();
        let blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'canvas.svg');
    }

    const savePNG = () => {
        let content = editor.canvas.toDataURL({
            format: 'png',
            multiplier: 2
        });
        saveAs(content, 'canvas.png');
    }

    return (
        <div>
            <button onClick={()=>saveSVG()}>Save as SVG</button>
            <button onClick={()=>savePNG()}>Save as PNG</button>
        </div>
    );
}