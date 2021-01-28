import React from 'react';
import ReactFlow, { Handle } from 'react-flow-renderer';
import "./app.css"
import Modal from "./Modal";
import Form from "react-bootstrap/Form"
import {Col, Row, Button} from "reactstrap"

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

            //skill map
            elements: [
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
                        text: 'A custom node 2 date of the weekk',
                        color: {
                            //color: '#9CA8B3', //colour
                            padding: 10,
                            borderColor: "#0000f",
                            borderStyle: "solid",
                            borderRadius: 80
                        },
                    },
                }
            ],
        };

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

    render() {
        const elements = this.state.elements

        const createNode = (name, color) => {
            let currArr = this.state.elements
            let newNode = {
                id: `sk_${name}`,
                type: 'special',
                position: { x: 250, y: 210 },
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
            }
            let newArr = currArr.concat(newNode)
            this.setState({ elements: newArr})

        };

        const onSubmit = () => {
            let name = document.querySelector('#skName').value
            // let descrpt = document.querySelector('#skDescription').value
            let color = document.querySelector('#skColor').value

            createNode(name, color)
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
                        />
                        
                        <div>{data.text}</div>

                        <Handle
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
                        <div >
                            <button
                                onClick={e => this.modalOpen(e)}
                                className="connect">+
                            </button>
                        </div>
                    </div>
                </div> 
            )
        };

        const nodeTypes = {
            special: CustomNodeComponent,
        };
        return (
            <div style={{ height: 1000 }}>
                <ReactFlow elements={elements} nodeTypes={nodeTypes} />
                <div className="App">
                    <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                        <Form>
                            <Col> <h4>New Skill</h4> </Col>
                            <Form.Group controlId="skName">
                                <Row>
                                    <Col xs='3'> <Form.Label> Skill Name:</Form.Label> </Col>
                                    <Col xs='9'> <Form.Control type="text" /> </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId="skDescription">
                                <Row>
                                    <Col xs='3'> <Form.Label>Description:</Form.Label> </Col>
                                    <Col xs='9'> <Form.Control as="textarea" rows={3} /> </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId="skColor">
                                <Row>
                                    <Col xs='3'> <Form.Label>Skill Color:</Form.Label> </Col>
                                    <Col xs='9'> <Form.Control type="text" placeholder="#eff23" /> </Col>
                                </Row>
                            </Form.Group>
                            <Button onClick={onSubmit} >SUBMIT</Button>
                        </Form>

                    </Modal>
                </div>
            </div>
        )
    };
};



export default Customize ;