import React, { Component } from 'react';
import { connect } from 'react-redux'
import action from '../store/actions'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  handleClick = () => {
    this.props.incrementAsync()
  }
  render() {
    return (
      <div>
        {this.props.number}
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, action)(Login);
