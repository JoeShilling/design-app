# Brand Design App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Purpose

Import list of created brand assets, then let the user combine those assets in a way that is cohesive with their brand.

## Components

### App.js

Contains overall app structure.
Also handles keyboard shortcut detection.

### Menu.js

Generates a list of available parts from `parts.js`

### Options.js

When a part is the active selection, the available options for that part are displayed here. The available options are listed in `parts.js`.

### Toolbar.js

Contains utility functions. Currently just exporting and toggling the guides.

## Importing Parts

Branded parts must be specified so that they can be imported.

## Parts.js

The primary way parts are added. 
- Background: Specifies the background of the canvas. Can be described using hexcodes or standard colour descriptors (blue/red/green etc).
- Width: Width of the canvas. 
- Height: Height of the canvas.
- Guides: The position of the guidelines.
    - x: Specify guide by pixel position.
    - y: Specify guide by pixel position.
    - xp: Specify guide by % across the canvas.
    - yp: Specify guide by % across the canvas.
- Parts: 


## Learn More
