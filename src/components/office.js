import React, { PureComponent } from 'react';
import INITIAL_DATA from '../adresses-data';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import EditForm from './editForm';

const makeContactsWithUniqueId = () => INITIAL_DATA.map((el) => {
    const id = _.uniqueId();
    return { ...el, id };
});

export default class Office extends PureComponent {

    state = {
        contacts: makeContactsWithUniqueId(),
        edit: false,
        editedCard: {},
        addCard: false,
    }

    deliteCard = (id) => () => {
        const { contacts } = this.state;
        const newContacts = contacts.filter((c) => c.id !== id);
        this.setState({ contacts: newContacts });
    }

    edit = (id) => () => {
        const { contacts } = this.state;
        const [ card ] = contacts.filter((c) => c.id === id);
        this.setState({ edit: true, editedCard: card });
    }

    getEditedCard = (card) => {
        const { contacts } = this.state;
        let uniqueId = true;
        const mapped = contacts.map((c) => {
            if (c.id === card.id) {
                uniqueId = false;
                return card;
            }
            return c;
        });
        if (uniqueId) return this.setState({ contacts: [...contacts, card], addCard: false });
        this.setState({ contacts: mapped, edit: false });
    } 

    createContactsCards = () => {
        const { contacts } = this.state;
        return contacts.map((c) => (
            <div className="office__card col-12" key={c.id}>
                <div>{c.address}</div>
                <div>{c.phone}</div>
                <div>{c.email}</div>
                <button type="button" className="btn btn-primary edit" onClick={this.edit(c.id)}>Редактировать</button>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.deliteCard(c.id)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        ));
    }

    addCard = () => {
        this.setState({ addCard: true });
    }

    render() {
        const { edit, editedCard, addCard } = this.state;
        if (edit) return <EditForm card={editedCard} getEditedCard={this.getEditedCard} />;
        if (addCard) return <EditForm id={_.uniqueId()} getEditedCard={this.getEditedCard} />;
        return (
            <div className="row office">
                <div className="col-12 office__title">Вы можете удалять, изменять или добавлять новые карточки с контактными данными</div>
                {this.createContactsCards()}
                <button type="button" className="btn btn-primary" onClick={this.addCard}>Добавить карточку с адресом</button>
                <Link to="/" className="office__link">Выйти из личного кабинета</Link>
            </div>
        )
    }
}