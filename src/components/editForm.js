import React, { PureComponent } from 'react';

export default class EditForm extends PureComponent {
    static defaultProps = {
        card: {
            address: '',
            phone: '',
            email: '',
        }
      }

    state = {
        address: this.props.card.address,
        phone: this.props.card.phone,
        email: this.props.card.email,
    }

    onChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    }

    onSubmit = (id) => (e) => {
        e.preventDefault();
        const { getEditedCard } = this.props;
        getEditedCard({ ...this.state, id });
    }

    makeInputs = () => {
        const { state } = this;
        const keys = Object.keys(state);
        return keys.map((k) => (
            <div className="form-group" key={k}>
                <label>{k}</label>
                <input type={k} name={k} value={state[k]} onChange={this.onChange} className="form-control edit__input" />
            </div>
        ));
    }

    render() {
        return (
            <form onSubmit={this.onSubmit(this.props.id || this.props.card.id)}>
                {this.makeInputs()}
                <button type="submit" className="btn btn-primary">Принять изменения</button>
            </form>
        );
    }
}