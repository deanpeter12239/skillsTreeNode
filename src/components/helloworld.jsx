import React from 'react';
import ReactFlow from 'react-flow-renderer';

import "./app.css"
const elements = [
    {
        id: '1',
        type: 'input', // input node
        data: { label: 'Input Node' },
        position: { x: 250, y: 25 },
    },
    // default node
    {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <div>
            <div>
                <button className="connect">+</button>
            </div>
        </div> },
        position: { x: 100, y: 125 },
    },
    {
        id: '3',
        type: 'output', // output node
        data: { label: < div >
            <div>
                <button className="disconnect">-</button>
            </div>
        </div > },
        position: { x: 250, y: 250 },
    },
    // animated edge
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3' },
];

//connection buttonn
    const ConnectBtn =  ()=>{
        return <div>
                 <button> + </button>
               </div>
    }
    //disconnect button
    // const DisconnectBtn = () => {
    //    alert("listerning",20000)
    // }
// const onElementClick = (event, element) => {
//     alert(element.data.label,"is clicked")
       
//     };
//     //create butoon
    const CreateBtn = () => {
        return <div>
            <button> + </button>
        </div>
    }

export default () => (
    <div style={{ height: 1000 }}>
        <ReactFlow elements={elements} >
            
        </ReactFlow>
    </div>
);
        
// onElementClick = { onElementClick }
// onElementsRemove = { onElementsRemove }
// onConnect = { onConnect }
// onNodeDragStop = { onNodeDragStop }
// style = {{ background: bgColor }}
// onLoad = { onLoad }
// nodeTypes = { nodeTypes }
// connectionLineStyle = { connectionLineStyle }
// snapToGrid = { true}
// snapGrid = { snapGrid }
// defaultZoom = { 1.5} />