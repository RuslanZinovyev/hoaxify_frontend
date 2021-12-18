import React from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";

export class UserSignupPage extends React.Component {
  state = {
    displayName: "",
    userName: "",
    password: "",
    passwordRepeat: "",
    pendingApiCall: false,
    errors: {},
    passwordRepeatConfirmed: true,
  };

  onChangeDisplayName = (event) => {
    const value = event.target.value;
    const errors = { ...this.state.errors };
    delete errors.displayName;
    this.setState({ displayName: value, errors });
  };

  onChangeUserName = (event) => {
    const value = event.target.value;
    const errors = { ...this.state.errors };
    delete errors.userName;
    this.setState({ userName: value, errors });
  };

  onChangePassword = (event) => {
    const value = event.target.value;
    const passwordRepeatConfirmed = this.state.passwordRepeat === value;
    const errors = { ...this.state.errors };
    delete errors.password;
    errors.passwordRepeat = passwordRepeatConfirmed
      ? ""
      : "Does not match to password";
    this.setState({ password: value, passwordRepeatConfirmed, errors });
  };

  onChangePasswordRepeat = (event) => {
    const value = event.target.value;
    const passwordRepeatConfirmed = this.state.password === value;
    const errors = { ...this.state.errors };
    errors.passwordRepeat = passwordRepeatConfirmed
      ? ""
      : "Does not match to password";
    this.setState({ passwordRepeat: value, passwordRepeatConfirmed, errors });
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
      .catch((apiError) => {
        let errors = { ...this.state.errors };
        if (apiError.response.data && apiError.response.data.validationErrors) {
          errors = { ...apiError.response.data.validationErrors };
        }
        this.setState({ pendingApiCall: false, errors });
      });
  };

  render() {
    return (
      <div className="container col-6">
        <h1 className="text-center col-6">Sign Up</h1>
        <div className="col-6 mb-3">
          <Input
            label="Display Name"
            placeholder="Your display name"
            value={this.state.displayName}
            onChange={this.onChangeDisplayName}
            hasError={this.state.errors.displayName && true}
            error={this.state.errors.displayName}
          />
        </div>
        <div className="col-6 mb-3">
          <Input
            label="Username"
            placeholder="Your username"
            value={this.state.userName}
            onChange={this.onChangeUserName}
            hasError={this.state.errors.userName && true}
            error={this.state.errors.userName}
          />
        </div>
        <div className="col-6 mb-3">
          <Input
            label="Password"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.onChangePassword}
            type="password"
            hasError={this.state.errors.password && true}
            error={this.state.errors.password}
          />
        </div>
        <div className="col-6 mb-3">
          <Input
            label="Repeat your password"
            placeholder="Repeat your password"
            value={this.state.passwordRepeat}
            onChange={this.onChangePasswordRepeat}
            type="password"
            hasError={this.state.errors.passwordRepeat && true}
            error={this.state.errors.passwordRepeat}
          />
        </div>
        <div className="text-left">
          <ButtonWithProgress
            onClick={this.onClickSignup}
            disabled={
              this.state.pendingApiCall || !this.state.passwordRepeatConfirmed
            }
            pendingApiCall={this.state.pendingApiCall}
            text="Sign Up"
          />
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
