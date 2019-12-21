import React, { Component } from 'react';
import { connect } from 'react-redux'
import action from '../store/action/login'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  queryUser = () => {
    this.props.login()
  }
  cancelUser = () => {
    this.props.logout()
  }
  render() {
    return (
      <div>
        <button onClick={this.queryUser}>获取用户信息</button>
        <button onClick={this.cancelUser}>取消获取信息</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.user
}

export default connect(mapStateToProps, action)(Login);
