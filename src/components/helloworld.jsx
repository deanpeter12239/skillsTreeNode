import React from 'react';
import ReactFlow, { Controls, updateEdge, addEdge } from 'react-flow-renderer';
import "./app.css"
import Edges from './Edges'


export class SkillTree extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            elements: [ //dummy data, later these data should be taken from DB Skills Object
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
                    data: { 
                        label: 
                        <div>
                            <div>
                                <label> Skill One </label>
                                <button className="connect" onClick={this.onClick}> <b> + </b> </button>
                            </div>
                        </div> 
                    },
                    position: { x: 100, y: 125 },
                },
                {
                    id: '3',
                    type: 'output', // output node
                    data: { 
                        label: 
                            <div>
                                <div>
                                    <button className="disconnect">-</button>
                                </div>
                            </div> 
                    },
                    position: { x: 250, y: 250 },
                },
                // animated edge
                { id: 'e1-2', source: '1', target: '2', animated: true },
                { id: 'e2-3', source: '2', target: '3', label: 'Updatable' },
                {
                    id: '4',
                    style: {
                        background: "#fff",
                        width: 100,
                        color: "#454052",
                        fontSize: "25px",
                        fontFamily: "Helvetica",
                        boxShadow: "5px 5px 5px 0px rgba(0,0,0,.10)" 
                    },
                    data: {
                        label: 'Another node'
                    },
                    position: {x: 250, y: 200},
                },
            ]
        };
        this.onClick = this.onClick.bind(this);
        this.onElementClick = this.onElementClick.bind(this);
    };

    onClick = () => {
        console.log('btn clicked! Current array:', this.state.elements)
        let nodeName = prompt("New Skill name?")
        console.log(nodeName)
        let arr = this.state.elements
        console.log(typeof arr)
        console.log(arr)
        let newNode = {
            id: `sk_${nodeName}`,
            type: 'input',
            data: {label: nodeName},
            position: {x: 100, y: 50}
        }
        let newConn = {
            id: `e_${newNode.id}`,
            source: newNode.id,
            target: "3",
            animated: true
        }
        console.log(newNode)
        console.log(newConn)
        let arr2  = arr.concat(newNode)
        let arr3 = arr2.concat(newConn)
        this.setState({ elements: arr3 })
        console.log(this.state)
    };
    
    
    onElementClick = (event, element) => {
        console.log(element.data.label.props.children.props.children[1].props.className)
        let btn = document.querySelector(`.${element.data.label.props.children.props.children[1].props.className}`)
        btn.style.visibility = "visible"
    };

    // gets called after end of edge gets dragged to another source or target
    // onEdgeUpdate = (oldEdge, newConnection) => updateEdge(oldEdge, newConnection, this.state.elements);

    // onConnect = (params) => addEdge(params, this.state.elements);
    

    render(){

        return (
            <div style={{ height: 1000 }}>
                <h1>SKILL TREE</h1>
                <ReactFlow 
                    elements={this.state.elements} 
                    onElementClick = {this.onElementClick} 
                    // onEdgeUpdate={this.onEdgeUpdate} 
                    // onConnect={this.onConnect}
                />
            </div>
        )
    };
};

export default SkillTree;
        
// onElementClick = { onElementClick }
// onElementsRemove = { onElementsRemove }
// onEdgeUpdate = {}
// onConnect = { onConnect }
// onNodeDragStop = { onNodeDragStop }
// style = {{ background: bgColor }}
// onLoad = { onLoad }
// nodeTypes = { nodeTypes }
// connectionLineStyle = { connectionLineStyle }
// snapToGrid = { true}
// snapGrid = { snapGrid }
// defaultZoom = { 1.5} />