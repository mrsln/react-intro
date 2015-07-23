// a simple example of using react-intro
'use strict';

import React from 'react';
import Intro from '../src/Intro';

class Example1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      element: null,
      text: '',
      show: false,
    };
  }

  nextStep_() {
    const element = React.findDOMNode(this.refs.button);
    const text = 'Click here to stop the madness!';
    this.setState({element, text});
  }

  toggleTutorial_() {
    if (!this.state.show) {
      const element = React.findDOMNode(this.refs.title);
      const text = 'This is a title. Click it!';
      this.setState({element, text, show: true});
    } else {
      this.setState({show: false});
    }
  }

  render() {
    return (
      <div>
        <Intro {...this.state}/>

        <div>
          <span
            style={{fontSize: 40}}
            ref='title'
            onClick={this.nextStep_.bind(this)}
          >
            Title
          </span>
        </div>

        <button
          onClick={this.toggleTutorial_.bind(this)}
          ref='button'>
            {!this.state.show ? 'Show tutorial' : 'Hide tutorial'}
        </button>

      </div>
    );
  }

};

React.render(<Example1 />, window.document.getElementById('app'));
