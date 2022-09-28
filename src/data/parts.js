export const partData = {
    background:'black',
    width:900,
    height:1272,
    guides:{
        x:[200],
        xp:[2,33,66,98],
        yp:[2,33,66,98],
    },
    sockets:{
        title:{x:34, y:34},
        text:{
            heading:{x:64,y:266},
            textLeft:{x:64,y:309},
            textRight:{x:463,y:309}
        },
        display:{
            displayA:{x:64,y:441},
            displayB:{x:321.5,y:441},
            displayC:{x:579,y:441},
            displayD:{x:64,y:698.5},
            displayE:{x:321.5,y:698.5},
            displayF:{x:579,y:698.5},
            displayG:{x:64,y:956},
            displayH:{x:321.5,y:956},
            displayI:{x:579,y:956},
        },
        displayWide:{
            display1:{x:64,y:441},
            display2:{x:321.5,y:441},
            display3:{x:64,y:698.5},
            display4:{x:321.5,y:698.5},
            display5:{x:64,y:956},
            display6:{x:321.5,y:956},
        },
        // microDisplay:{
        //     displayA1:{x:64, y:441}, displayA2:{x:149, y:441}, displayA3:{x:235.4, y:441}, displayA4:{x:321.5, y:441}, displayA5:{x:406.8, y:441}, displayA6:{x:492.5, y:441}, displayA7:{x:579, y:441}, displayA8:{x:663.9, y:441}, displayA9:{x:749.6, y:441},
        //     displayB1:{x:64, y:526.7}, displayB2:{x:149, y:526.7}, displayB3:{x:235.4, y:526.7}, displayB4:{x:321.5, y:526.7}, displayB5:{x:406.8, y:526.7}, displayB6:{x:492.5, y:526.7}, displayB7:{x:579, y:526.7}, displayB8:{x:663.9, y:526.7}, displayB9:{x:749.6, y:526.7},
        //     displayC1:{x:64, y:612.4}, displayC2:{x:149, y:612.4}, displayC3:{x:235.4, y:612.4}, displayC4:{x:321.5, y:612.4}, displayC5:{x:406.8, y:612.4}, displayC6:{x:492.5, y:612.4}, displayC7:{x:579, y:612.4}, displayC8:{x:663.9, y:612.4}, displayC9:{x:749.6, y:612.4},
        //     displayD1:{x:64, y:698.5}, displayD2:{x:149, y:698.5}, displayD3:{x:235.4, y:698.5}, displayD4:{x:321.5, y:698.5}, displayD5:{x:406.8, y:698.5}, displayD6:{x:492.5, y:698.5}, displayD7:{x:579, y:698.5}, displayD8:{x:663.9, y:698.5}, displayD9:{x:749.6, y:698.5},
        //     displayE1:{x:64, y:783.8}, displayE2:{x:149, y:783.8}, displayE3:{x:235.4, y:783.8}, displayE4:{x:321.5, y:783.8}, displayE5:{x:406.8, y:783.8}, displayE6:{x:492.5, y:783.8}, displayE7:{x:579, y:783.8}, displayE8:{x:663.9, y:783.8}, displayE9:{x:749.6, y:783.8},
        //     displayF1:{x:64, y:869.5}, displayF2:{x:149, y:869.5}, displayF3:{x:235.4, y:869.5}, displayF4:{x:321.5, y:869.5}, displayF5:{x:406.8, y:869.5}, displayF6:{x:492.5, y:869.5}, displayF7:{x:579, y:869.5}, displayF8:{x:663.9, y:869.5}, displayF9:{x:749.6, y:869.5},
        //     displayG1:{x:64, y:956}, displayG2:{x:149, y:956}, displayG3:{x:235.4, y:956}, displayG4:{x:321.5, y:956}, displayG5:{x:406.8, y:956}, displayG6:{x:492.5, y:956}, displayG7:{x:579, y:956}, displayG8:{x:663.9, y:956}, displayG9:{x:749.6, y:956},
        //     displayH1:{x:64, y:1040.9}, displayH2:{x:149, y:1040.9}, displayH3:{x:235.4, y:1040.9}, displayH4:{x:321.5, y:1040.9}, displayH5:{x:406.8, y:1040.9}, displayH6:{x:492.5, y:1040.9}, displayH7:{x:579, y:1040.9}, displayH8:{x:663.9, y:1040.9}, displayH9:{x:749.6, y:1040.9},
        //     displayI1:{x:64, y:1126.6}, displayI2:{x:149, y:1126.6}, displayI3:{x:235.4, y:1126.6}, displayI4:{x:321.5, y:1126.6}, displayI5:{x:406.8, y:1126.6}, displayI6:{x:492.5, y:1126.6}, displayI7:{x:579, y:1126.6}, displayI8:{x:663.9, y:1126.6}, displayI9:{x:749.6, y:1126.6},
        // }
    },
    parts:[
        {name:"Paragraph",
            type:"text",
            properties: {
                socket:"textLeft",
                fontFamily:'institute',
                fill:'white',
                fontWeight:'normal',
                fontSize:15,
                width:364,
            },
            options:[
                {name:"socket",
                    values:"text"
                },
                {name:'fontSize',
                    type:'slider',
                    min:5,
                    max:60
                },
                {name:"text",
                    type:"textArea"
                },
            ]
        },
        {name:"DisplayParagraph",
        type:"text",
        properties: {
            socket:"displayA",
            fontFamily:'institute',
            fill:'white',
            fontWeight:'normal',
            fontSize:15,
            width:257,
            height:257
        },
        options:[
            {name:"socket",
                values:"display"
            },
            {name:'fontSize',
                type:'slider',
                min:5,
                max:60
            },
            {name:"text",
                type:"textArea"
            },
            {name:"fontWeight",
                type:"dropDown",
                values:[
                    {name:"Normal", value:"normal"},
                    {name:"Bold", value:"bold"}
                ],
            },
        ]},
        {name:"Display background",
            type:"rectangle",
            properties:{
                socket:"displayA",
                fill:"white",
                width:766,
                height:772,
                strokeWidth:0,
            },
            options:[
                {name:"fill",
                type:"colour",
                colours:["#FFFFFF","#5893AB", "#DDA0A6", "#FDB629", "#B0B0A9", "#FF471C", "#75BAB5", "#005E82"],
                }
            ]
        },
        {name:"Logo",
            type:"image",
            file:"institute.svg",
        
        properties:{
            socket:"title"
        },
        options:[
            'height',
            'width',
            'yPos',
            'xPos'
        ]},

        {name:"segmentGroup",
            type:"segmentGroup",
            properties: {

                socket:"displayB",
                lineStrokeWidth:5,
                lines:6,
            },
            options:[
                {name:'socket',
                    values:"display"

                },
                {name:'lines',
                    type:'slider',
                    min:0,
                    max:30,
                },
                {name:'lineStrokeWidth',
                    type:'slider',
                    min:1,
                    max:30,
                },
                {name:"fill",
                type:"colour",
                colours:["#FFFFFF","#5893AB", "#DDA0A6", "#FDB629", "#B0B0A9", "#FF471C", "#75BAB5", "#005E82ß"],
                },
                {name:"lineAngle",
                    type:'slider',
                        min:0,
                        max:360,
                },
                {name:"lineOpacity",
                    type:'slider',
                        min:0,
                        max:100,
                }
            ],
        },
        {name:"wideSegmentGroup",
            type:"segmentGroup",
            properties: {

                socket:"displayB",
                lineStrokeWidth:5,
                width:514,
                height:257,
                lines:6,
            },
            options:[
                {name:'socket',
                    values:"displayWide"
                },
                {name:'lines',
                    type:'slider',
                    min:0,
                    max:30,
                },
                {name:'lineStrokeWidth',
                    type:'slider',
                    min:1,
                    max:50,
                },
                {name:"fill",
                type:"colour",
                colours:["#FFFFFF","#5893AB", "#DDA0A6", "#FDB629", "#B0B0A9", "#FF471C", "#75BAB5", "#005E82ß"],

            }
            ],
        },

        {name:"9x9 SegmentGroup",
            type:"segment9x9",
            properties: {
                socket:"displayA",
                lineStrokeWidth:5,
                width:85.7,
                height:85.7,
            },
            options:[
                {name:'socket',
                    values:"display"
                },
                {name:'lines',
                    type:'slider',
                    min:0,
                    max:15,
                },
                {name:'lineStrokeWidth',
                    type:'slider',
                    min:1,
                    max:15,
                },
                {name:"grid"},
                // {name:"fill",
                //     type:"dropDown",
                //     values:[
                //         {name:"Green", value:"#41B92E"},
                //         {name:"Pink", value:"#B92E9E"}
                //     ],
                // },
                {name:"fill",
                    type:"colour",
                    colours:["#FFFFFF","#5893AB", "#DDA0A6", "#FDB629", "#B0B0A9", "#FF471C", "#75BAB5", "#005E82ß"],

                },
                {name:"lineAngle",
                    type:'slider',
                        min:0,
                        max:360,
                },
                {name:"lineOpacity",
                    type:'slider',
                        min:0,
                        max:100,
                }
            ],
        },
    ]
}