import React from 'react';
import ReactFlow, { Handle } from 'react-flow-renderer';

const elements = [
    {
        id: '2',
        type: 'special',
        position: { x: 100, y: 100 },
        data: {
            text: 'A custom node', 
            color: {
                background: '#9CA8B3',
                color: '#FFF', //colour
                padding: 10,
                 }
             },
    },
    {
        id: '3',
        type: 'special',
        position: { x: 100, y: 100 },
        data: { 
            text: 'A custom node 2',
            color: {
                background: '#ff3333', 
                color: '#9CA8B3', //colour
                padding: 10
                } ,
             },
    }
];
//Node styles 
const customNodeStyles = {
    background: '#9CA8B3',
    color: '#FFF', //colour
    padding: 10,
};
const CustomEdges ={

}
const CustomNodeComponent = ({data }) => {
    return (
        <div style={data.color}>
            <Handle 
            type="target" 
            position="left" 
            style={{ borderRadius: 0 }} />
            <div>{data.text}</div> 
            <Handle //
                type="source" 
                position="right" 
                id="a"
                style={{ top: '30%', borderRadius: 0 }}
            />
            <Handle
                type="source"
                position="right"
                id="b"
                style={{ top: '70%', borderRadius: 0 }}
            />
        </div>
    );
};
const nodeTypes = {
    special: CustomNodeComponent,
};
export default () => {
    return (
        <div style={{ height: 300 }}>
            <ReactFlow elements={elements} nodeTypes={nodeTypes} />
        </div>
    );
};