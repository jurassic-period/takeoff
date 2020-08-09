import React, { PureComponent } from "react";
import cn from "classnames";

const fields = ["email", "password"];

export default class LoginForm extends PureComponent {
  state = {
    email: "",
    password: "",
    disabledButton: true,
  };

  activetedButton = () => {
    const { email, password } = this.state;
    if (email.length > 4 && password.length > 5) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  };

  handleChangeField = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.activetedButton);
  };

  handleSubmitForm = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { login } = this.props;
    if (email.length < 5 || password.length < 6) return;
    login(email, password);
    this.setState({ email: "", password: "" }, this.activetedButton);
  };

  buildForm = () => {
    return fields.map(name => (
      <div className="form-group" key={name}>
        <input
          type={name}
          name={name}
          onChange={this.handleChangeField}
          value={this.state[name]}
          className="form-control"
          placeholder={name}
          required
        />
      </div>
    ));
  };

  render() {
    const { disabledButton } = this.state;

    const classes = cn({
      btn: true,
      "btn-secondary": disabledButton,
      "btn-success": !disabledButton,
      "btn-login-form": true,
    });
    return (
      <div className="row justify-content-center">
        <div>
          <p className="p-login text-center">
            Авторизация:
          </p>
          <form className="login-form" onSubmit={this.handleSubmitForm}>
            {this.buildForm()}
            <button type="submit" className={classes} disabled={disabledButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
