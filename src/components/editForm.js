import React, { PureComponent } from 'react';

export default class EditForm extends PureComponent {

    state = {
        address: this.props.card.address,
        tel: this.props.card.tel,
        mail: this.props.card.mail,
    }

    onChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    }

    onSubmit = (id) => (e) => {
        e.preventDefault();
        const { getEditedCard } = this.props;
        getEditedCard({ ...this.state, id });
    }

    render() {
        const { address, tel, mail } = this.state;
        return (
            <form onSubmit={this.onSubmit(this.props.card.id)}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Address</label>
                <input type="address" name="address" value={address} onChange={this.onChange} className="form-control edit__input" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Phone</label>
                <input type="phone" name="tel" value={tel} onChange={this.onChange} className="form-control edit__input" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Email</label>
                <input type="email" name="mail" value={mail} onChange={this.onChange} className="form-control edit__input" />
            </div>
            <button type="submit" className="btn btn-primary">Edit</button>
            </form>
        );
    }
}