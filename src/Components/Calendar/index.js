import React, {Component} from 'react';
import Calendar from 'react-calendar';
import {Segment} from 'semantic-ui-react';
import FormInput from '../Input/';
import styles from './calendar.css';

export default class Calendarr extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: [], text: '', showInput: false, schedule: null};
    }

    onChange = date => {
        this.setState({date, showInput: true});
        var scheduled = JSON.parse(localStorage.getItem(date));
        this.setState({schedule:scheduled});
    };

    render() {
        return (
            <div>
                <Segment textAlign='center' basic>
                    <Calendar
                        onChange={this.onChange}
                        value={this.state.date}
                    />
                    {this.state.showInput && <FormInput date={this.state.date} schedule={this.state.schedule}/>}
                </Segment>
            </div>
        );
    }
}