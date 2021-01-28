import React from 'react';
import ReactFlow, { Handle } from 'react-flow-renderer';
import "./app.css"
import Modal from "./Modal";
import Form from "react-bootstrap/Form"

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
    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        this.setState({ name: this.state.modalInputName });
        this.modalClose();
    }

    modalOpen() {
        this.setState({ modal: true });
    }

    modalClose() {
        this.setState({
            modalInputName: "",
            modalInputDiscription: "",
            modal: false
        });
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
        ];
        const CustomNodeComponent = ({ data }) => {
            return (
            <div>
                    <div style={data.color} >
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
                    <div >
                        <button
                            onClick={e => this.modalOpen(e)}
                            className="connect">+
                                </button>
                    </div>
                    </div>
                </div> 
            )
        }
        const nodeTypes = {
            special: CustomNodeComponent,
        }
        return (
            <div style={{ height: 1000 }}>
                <ReactFlow elements={elements} nodeTypes={nodeTypes} />
                <div className="App">
                    <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                        {/* <div className="form-group">
                            <label>Skills Name:</label>
                            <input style ={{width:300, marginLeft:200}}
                                type="text"
                                value={this.state.modalInputName}
                                name="modalInputName"
                                onChange={e => this.handleChange(e)}
                                className="form-control"
                            />
                        </div>
                        <div>
                        <label>Discription</label>
                        <textarea
                            type="text"
                            value={this.state.modalInputDiscription}
                            name="modalInputDiscripion"
                            onChange={e => this.handleChange(e)}
                            className="form-control"
                        />
                        </div>
                        <div className="form-group">
                            <button onClick={e => this.handleSubmit(e)} type="button">
                                Save
                        </button>
                        </div> */}
                        <Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Form>

                    </Modal>
                </div>
            </div>
        )
    }
}



export default Customise ;