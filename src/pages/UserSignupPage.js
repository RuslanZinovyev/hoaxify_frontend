import React from "react";

export class UserSignupPage extends React.Component {
  state = {
    displayName: "",
    userName: "",
    password: "",
    passwordRepeat: "",
    pendingApiCall: false,
  };

  onChangeDisplayName = (event) => {
    const value = event.target.value;
    this.setState({ displayName: value });
  };

  onChangeUserName = (event) => {
    const value = event.target.value;
    this.setState({ userName: value });
  };

  onChangePassword = (event) => {
    const value = event.target.value;
    this.setState({ password: value });
  };

  onChangePasswordRepeat = (event) => {
    const value = event.target.value;
    this.setState({ passwordRepeat: value });
  };

  onClickSignup = () => {
    const user = {
      userName: this.state.userName,
      displayName: this.state.displayName,
      password: this.state.password,
    };
    this.setState({ pendingApiCall: true });
    this.props.actions
      .postSignup(user)
      .then((response) => {
        this.setState({ pendingApiCall: false });
      })
      .catch((error) => {
        this.setState({ pendingApiCall: false });
      });
  };

  render() {
    return (
      <div className="container col-6">
        <h1 className="text-center col-6">Sign Up</h1>
        <div className="col-6 mb-3">
          <label>Display name</label>
          <input
            className="form-control"
            placeholder="Your display name"
            value={this.state.displayName}
            onChange={this.onChangeDisplayName}
          />
        </div>
        <div className="col-6 mb-3">
          <label>Username</label>
          <input
            className="form-control"
            placeholder="Your username"
            value={this.state.userName}
            onChange={this.onChangeUserName}
          />
        </div>
        <div className="col-6 mb-3">
          <label>Password</label>
          <input
            className="form-control"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.onChangePassword}
            type="password"
          />
        </div>
        <div className="col-6 mb-3">
          <label>Repeat your password</label>
          <input
            className="form-control"
            placeholder="Repeat your password"
            value={this.state.passwordRepeat}
            onChange={this.onChangePasswordRepeat}
            type="password"
          />
        </div>
        <div className="text-left">
          <button
            className="btn btn-primary"
            onClick={this.onClickSignup}
            disabled={this.state.pendingApiCall}
          >
            {this.state.pendingApiCall && (
              <div className="spinner-border text-light spinner-border-sm mr-1">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

UserSignupPage.defaultProps = {
  actions: {
    postSignup: () =>
      new Promise((resolve, reject) => {
        resolve({});
      }),
  },
};

export default UserSignupPage;
