import React, { Component } from 'react';
import { connect } from 'react-redux'
import action from '../store/action/login'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.usernameRef = React.createRef()
    this.passwordRef = React.createRef()
  }
  login = () => {
    let username = this.usernameRef.current.value
    let password = this.passwordRef.current.value
    console.log(this.props)
    this.props.login(username, password)
  }
  logout = () => {
    this.props.logout()
  }
  render() {
    let loginForm = (
      <div>
        用户名
        <input type="text" ref={this.usernameRef} />
        密码
        <input type="password" ref={this.passwordRef} />
        <button onClick={this.login}>登录</button>
      </div>
    )
    let logoutForm = (
      <div>
        用户名{this.props.token}
        <button onClick={this.logout}>退出</button>
      </div>
    )
    return (
      <div>
        {this.props.token ? logoutForm : loginForm}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.user
}

export default connect(mapStateToProps, action)(Login);
