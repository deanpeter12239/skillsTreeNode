import React from 'react';
import ReactFlow, { Handle } from 'react-flow-renderer';


class Customise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            //state of the buttons
            CreateButton: true,
            connectButton: false,
            disConnectButton: false,

            //modal input
            modal: false,
            name: "",
            modalInputName: "",
            modalInputDiscription: ""
        }

    }
    render() {
        const elements = [
            {
                id: '2',
                type: 'special',
                position: { x: 100, y: 100 },
                data: {
                    text: 'A custom node',
                    color: {
                        borderColor: '#FFF000', //colour
                        padding: 10,
                        borderStyle: "solid",
                        borderRadius: 80
                    }
                },
            },
            {
                id: '3',
                type: 'special',
                position: { x: 200, y: 200 },
                data: {
                    text: 'A custom node 2',
                    color: {
                        //color: '#9CA8B3', //colour
                        padding: 10,
                        borderColor: "#0000f",
                        borderStyle: "solid",
                        borderRadius: 80
                    },
                },
            }
        ];
        const CustomNodeComponent = ({ data }) => {
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
            )
        }
        const nodeTypes = {
            special: CustomNodeComponent,
        }
        return (
            <div style={{ height: 300 }}>
                <ReactFlow elements={elements} nodeTypes={nodeTypes} />
            </div>
        )
    }
}



export default Customise ;