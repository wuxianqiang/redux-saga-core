import React, {Component} from 'react';
import {connect} from 'react-redux'
import actions from './store/actions'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // number: 0
    }
  }
  handleAdd = () => {
    this.props.incrementAsync()
    console.log(this.props)
    // this.setState({number: this.state.number + 1})
  }
  render() {
    return (
      <div>
        <span>{this.props.number}</span>
        <button onClick={this.handleAdd}>添加</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps,actions)(App);
