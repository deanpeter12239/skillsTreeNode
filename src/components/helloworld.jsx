import React from 'react';
import ReactFlow, { Controls, updateEdge, addEdge } from 'react-flow-renderer';
import "./app.css"
import Edges from './Edges'
import SkillsForm from "./createSkills"
import Modal from "./Modal";
import Form from "react-bootstrap/Form"

// class components 
class CreateSkills extends React.Component{
    constructor(props){
         super(props);
         this.state = {
        
             //state of the buttons
             CreateButton : true,
             connectButton : false,
             disConnectButton : false,

            //modal input
             modal: false,
             name: "",
             modalInputName: "",
             modalInputDiscription:""
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
    render(){
        // dummy nodes to the files


        const connectBtn = ()=>{
            return (<div>
                <div>
                    <button
                        onClick={e => this.modalOpen(e)}
                        className="connect">+
                        </button>
                </div>
            </div>)
        }
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
                data: {

                    label:  this.connectBtn(),
                    // <div>
                    // //     <div>
                    // //         <button
                    //             onClick={e => this.modalOpen(e)}
                    //             className="connect">+
                    //     </button>
                    //     </div>
                    // </div>
                },

                position: { x: 100, y: 125 },
            },
            {
                id: '3',
                type: 'output', // output node
                data: {
                    label: <div>
                        <div>
                            <button
                                onClick={e => this.modalOpen(e)}
                                className="connect">+
                            </button>
                        </div>
                    </div>
                },
                position: { x: 250, y: 250 },
            },
            // animated edge
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3' },
        ];
        return(
            
            <div style={{height: 1000}} >
                <ReactFlow elements={elements} >
                </ReactFlow>

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

export default CreateSkills;
        
