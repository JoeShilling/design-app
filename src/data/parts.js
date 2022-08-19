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
        }
    },
    parts:[
        {name:"White Strip",
        type:"rectangle",
        properties:{
            socket:'displayI',
            fill:'white',
            height:20,
            lockScalingY:true,
        },
        options:[
            {'name':'socket',
                'values':'display'
            },
            'height',
            'width',
            'xPos',
            'yPos',
            'angle'
        ]
        },
        {name:'Segments',
            type:"segmentRect",
            properties:{
                socket:'displayA',
                width:257,
                height:257,
                stroke:"white",
                fill:'transparent',
                strokeWidth:3,
                segments:6,
            },
            options:[
                {name:'socket',
                    values:'display'
                },
                {name:'segments',
                    type:'slider',
                    min:1,
                    max:10,
                },
                'width',
                'height',
                'segments',
                'angle',
                'xPos',
                'yPos'
            ]
        },
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
                }
            ]
        },
        {name:"ParagraphBold",
            type:"text",
            properties: {
                socket:"textLeft",
                fontFamily:'institute',
                fill:'white',
                fontWeight:'bold',
                fontSize:15,
                width:771,
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
        ],
        },

        {name:"segmentGroup",
            type:"segmentGroup",
            properties: {
                lines:6,
                socket:"displayB",
                // strokeWidth:5,
            },
            options:[
                {name:'socket',
                    values:"display"
                },
                {name:'lines',
                    type:'slider',
                    min:1,
                    max:30,
                },
                {name:'lineStrokeWidth',
                    type:'slider',
                    min:1,
                    max:30,
                },
                // {name:'width',
                //     type:'slider',
                //     min:50,
                //     max:600,
                // },
            ],
        },
    ]
}