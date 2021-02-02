import React from 'react';
import ReactFlow, { Handle, updateEdge, addEdge, MiniMap, Controls, Background } from 'react-flow-renderer';
import "./app.css"
import Modal from "./Modal";
import Form from "react-bootstrap/Form"
import {Col, Row, Button, Container} from "reactstrap"
import { SketchPicker } from "react-color"

class Customize extends React.Component {
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
            modalInputDiscription: "",
            modelPercentage: "0%",

            //for nodes
            idHolder: "",
            nodeColor: "#0000ff",

            //skill map elements
            elements: [
                {
                    id: '2',
                    type: 'special',
                    position: { x: 100, y: 100 },
                    data: {
                        text: 'Skill One ',
                        color: {
                            borderColor: '#FFF000', //colour
                            padding: 10,
                            borderStyle: "solid",
                            borderRadius: 80
                        },
                    },
                },
                {
                    id: '3',
                    type: 'special',
                    position: { x: 200, y: 200 },
                    data: {
                        text: 'Skill Two ',
                        color: {
                            //color: '#9CA8B3', //colour
                            padding: 10,
                            borderColor: "#0000f",
                            borderStyle: "solid",
                            borderRadius: 80
                        },
                    },
                },
            ],
        };
        this.addId = this.addId.bind(this)

    };

    componentDidMount(){
        this.addId(this.state.elements)
    };

    //this function adds the nodes ID to the data objects. That ID will be used to create the edges
    addId(ele){
        let newEle = ele.map((node)=>{
                if (node.id.substring(0, 2) === 'ed') {
                    return node
                } else {
                    node.data.nodeId = node.id
                    return node
                }
            }
        );
        console.log(newEle)
        this.setState({ elements: newEle })
    };

    onLoad = (reactFlowInstance) => {
        console.log('flow loaded:', reactFlowInstance);
        reactFlowInstance.fitView();
    };

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit(e) {
        this.setState({ name: this.state.modalInputName });
        this.modalClose();
    };

    modalOpen() {
        this.setState({ modal: true });
    };

    modalClose() {
        this.setState({
            modalInputName: "",
            modalInputDiscription: "",
            modal: false
        });
    };

    onEdgeUpdate = (oldEdge, newConnection) => {
        this.setState({ elements: updateEdge(oldEdge, newConnection, this.state.elements) })
    };

    onConnect = (params) => {
        this.setState({ elements: addEdge(params, this.state.elements) })
    };

    btnClick = (e) => {
        this.modalOpen(e)
        this.setState({ idHolder: `${e.target.id}`})
    };

    handleChangeComplete = (color) => {
        this.setState({ nodeColor: color.hex })
    };

    percentageChange = (e) => {
        this.setState({ modelPercentage: `${e.target.value}%` })
        
    };

    render() {
        const elements = this.state.elements
        const addIdFunc = this.addId

        async function createNode(name, color, target){
            try {
                let currArr = elements
                let newNode = {
                    id: `sk_${name}`,
                    type: 'special',
                    position: { x: 0, y: 0 },
                    data: {
                        text: name,
                        color: {
                            // color: color, //colour
                            padding: 10,
                            borderColor: color,
                            borderStyle: "solid",
                            borderRadius: 80
                        },
                    },
                };
                
                let newArr = currArr.concat(newNode)
                await addIdFunc(newArr)
                console.log(target)
                createEdge(name, newNode.id, target)
            } catch(err){console.log(err)}
        };

        const createEdge = (name, id, target) => {
            let currArr = this.state.elements
            let newEdge = {
                id: `ed_${name}`,
                source: `${id}`,
                target: target
            };

            let updEdges = currArr.concat(newEdge)
            console.log(updEdges)
            this.setState({ elements: updEdges})
        };

        const onSubmit = () => {
            let name = document.querySelector('#skName').value
            let target = this.state.idHolder
            let color = this.state.nodeColor

            createNode(name, color, target)
            this.setState({ idHolder: ''})
            this.modalClose()
        };
        

        const CustomNodeComponent = ({ data }) => {
            return (
                <div>
                    <div style={data.color} >
                        <Handle
                            type="target"
                            position="left"
                            style={{ borderRadius: 0 }}
                            onConnect={this.onConnect} 
                        />
                        
                        <div>{data.text}</div>

                        <Handle
                            type="source"
                            position="right"
                            id="a"
                            style={{ top: '30%', borderRadius: 0 }}
                            onConnect={this.onConnect}
                        />
                        <Handle
                            type="source"
                            position="right"
                            id="b"
                            style={{ top: '70%', borderRadius: 0 }}
                            onConnect={this.onConnect}
                        />
                        <div >
                            <button
                                id={data.nodeId}
                                onClick={this.btnClick}
                            > + </button>
                        </div>
                    </div>
                </div> 
            )
        };

        const nodeTypes = {
            special: CustomNodeComponent,
        };


        return (
            <div>
                <div>
                    <Container style={{ height: 500 }}>
                        <div> <h2> Skill Map</h2> </div>
                        <ReactFlow elements={this.state.elements} nodeTypes={nodeTypes} onEdgeUpdate={this.onEdgeUpdate} onLoad={this.onLoad}>
                            <MiniMap></MiniMap>
                            <Controls/>
                            <Background color="#aaaaaa" gap={5} />
                        </ ReactFlow>
                        <div className="App">
                            <Modal show={this.state.modal} handleClose={e => this.modalClose(e)} >
                                <Form>
                                    <Col> <h4>New Skill</h4> </Col>
                                    <Form.Group controlId="skName">
                                        <Row>
                                            <Col xs='2'> <Form.Label> Skill Name:</Form.Label> </Col>
                                            <Col xs='10'> <Form.Control type="text" /> </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group controlId="skDescription">
                                        <Row>
                                            <Col xs='2'> <Form.Label>Description:</Form.Label> </Col>
                                            <Col xs='10'> <Form.Control as="textarea" rows={3} /> </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group controlId="skColor">
                                        <Row>
                                            <Col xs='2'> <Form.Label>Skill Color:</Form.Label> </Col>
                                            <Col xs='3'> <SketchPicker color={this.state.nodeColor} onChangeComplete={this.handleChangeComplete} /> </Col>
                                            <Col xs='3'> <Form.Label>Percentage Complete:</Form.Label> </Col>
                                            <Col xs='3'> <Form.Control type="range" min="0" max="100" defaultValue="0" onChange={this.percentageChange} /> </Col>
                                            <Col xs='1'> <Form.Control type="text" value={this.state.modelPercentage} /> </Col>
                                        </Row>
                                    </Form.Group>
                                    <Button onClick={onSubmit} >SUBMIT</Button>
                                </Form>

                            </Modal>
                        </div>
                    </Container>

                    <Container>
                        {/* This is when Skill Details will be. */}
                    </Container>
                </div>
            </div>
            
        )
    };
};



export default Customize ;