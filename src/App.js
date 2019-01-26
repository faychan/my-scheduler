import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import './App.css';

import Calendarr from './Components/Calendar/';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


  render() {
    return (
        <div className="App">
          <Segment color='teal' inverted>
            <Menu secondary color='teal' inverted >
              <Menu.Item name='mySchedule' onClick={this.handleItemClick} />
            </Menu>
          </Segment>

            <Calendarr />

        </div>
    );
  }
}

export default App;

