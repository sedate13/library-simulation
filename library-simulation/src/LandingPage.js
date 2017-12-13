import React, { Component } from "react";
import axios from "axios";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: [],
      password: [],
      userid: []
    };
    this.handlename = this.handlename.bind(this);
    this.handleps = this.handlepw.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  login(username, password) {
    axios
      .post("http://localhost:3001/api/auth/login", {
        username: this.state.username,
        password: this.state.password
      })

      .then(response => {
        if (response.data) {
          console.log(response.data);
          this.setState({
            userid: response.data[0].id
          });
          window.location.href = "/books";
          console.log(this.state.userid);
        } else console.log("not authorized");
      })
      .catch(console.log);
  }
  handlename(val) {
    this.setState({
      username: val
    });
  }
  handlepw(val) {
    this.setState({
      password: val
    });
  }

  register(username, password) {
    axios
      .post("http://localhost:3001/api/auth/register", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        response.data;
        window.location.href = "/books";
      })
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <input
          className="login"
          placeholder="username"
          onChange={e => this.handlename(e.target.value)}
        />
        <input
          className="pw"
          placeholder="password"
          onChange={e => this.handlepw(e.target.value)}
        />
        <button
          className="register"
          onClick={() =>
            this.register(this.state.username, this.state.password)
          }
        >
          Register
        </button>
        <button
          className="register"
          onClick={() => this.login(this.state.username, this.state.password)}
        >
          Login
        </button>
      </div>
    );
  }
}
