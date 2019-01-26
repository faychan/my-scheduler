import React, {Component} from 'react';
import {Segment, Form, Input, TextArea, Button, Message} from 'semantic-ui-react';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);

export default class FormInput extends Component {
    state = {
            subject: "",
            location: "",
            description: "",
    };

    componentDidUpdate(prevProps) {
        var scheduled = this.props.schedule;
        var date = this.props.date;

        if(prevProps.schedule !== this.props.schedule || prevProps.date !== this.props.date) {
            if(this.props.schedule != null){
                this.setState({subject:scheduled.subject, location:scheduled.location, description: scheduled.description})
            }else{
                this.setState({subject:"", location:"", description: ""})
            }
        }
    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleDelete() {
        this.setState({subject:"", location:"", description: "", showDeleted: true});
        var saveObj ={subject:"", location:"", description:""};
        localStorage.setItem(this.props.date, JSON.stringify(saveObj));
    }

    handleSubmit(){
        var saveObj ={subject:this.state.subject, location:this.state.location, description:this.state.description};
        localStorage.setItem(this.props.date, JSON.stringify(saveObj));
    }

    render() {
        const { value } = this.state
        return (
            <Segment textAlign='left' basic>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field control={Input} name="subject" label='Subject' placeholder='' value={this.state.subject} onChange={this.handleChange} required/>
                        <Form.Field control={Input} name="location" label='Location' placeholder='' value={this.state.location} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Field control={TextArea} name="description" label='Description' placeholder='Things to note' value={this.state.description} onChange={this.handleChange} required/>
                    <Button color='teal' type="submit" onClick={() => this.setState({ showSuccess: true })}>Add</Button>
                    <Button color='red' onClick={this.handleDelete}>Delete</Button>
                    <SweetAlert
                        show={this.state.showSuccess}
                        title="Added!!"
                        text={"Appointment at "+
                            new Intl.DateTimeFormat('en-GB', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            }).format(this.props.date)+" is made."}
                        onConfirm={() => this.setState({ showSuccess: false })}
                    />
                    <SweetAlert
                        show={this.state.showDeleted}
                        title="Deleted!!"
                        text={"Appointment at "+
                        new Intl.DateTimeFormat('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(this.props.date)+" is cleared."}
                        onConfirm={() => this.setState({ showDeleted: false })}
                    />
                </Form>
            </Segment>
        )
    }
}