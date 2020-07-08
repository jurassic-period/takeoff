import React, { PureComponent } from 'react';
import cn from 'classnames';

const fields = ['email', 'password'];

export default class LoginForm extends PureComponent {
    state = {
        email: '',
        password: '',
        button: true,
    }

    activetedButton = () => {
        const { email, password } = this.state
        if (email.length > 4 && password.length > 5) {
            this.setState({ button: false })
        } else {
            this.setState({ button: true })
        }
    }

    handleChangeField = ({ target }) => {
        this.setState({ [target.name]: target.value }, this.activetedButton);
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const { login } = this.props;
        login(email, password);
        this.setState({ email: '', password: '' }, this.activetedButton);
    }

    buildForm = () => {
        return fields.map((name) => (
          <div className="form-group" key={name}>
            <input
              type={name}
              name={name}
              onChange={this.handleChangeField}
              value={this.state[name]}
              className="form-control"
              placeholder={name}
            />
          </div>
        ));
    }

    render() {
        const classes = cn({
            'btn': true,
            'btn-primary': true,
            'disabled': this.state.button,
          });
        return (
            <div className="row justify-content-center">
                <div>
                    <p className="p-login">Чтобы попасть в личный кабинет введите данные:</p>
                    <form className="login-form" onSubmit={this.handleSubmitForm}>
                        {this.buildForm()}
                        <button type="submit" className={classes}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}