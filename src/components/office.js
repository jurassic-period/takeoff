import React, { PureComponent } from 'react';
import _ from 'lodash';
import EditForm from './editForm';

const INITIAL_DATA = [
    {
        address: "г. Москва, ул. Случайная, дом 4, стр. 2",
        tel: '+7 495 111-11-11',
        mail: 'random@gmail.com',
    },
    {
        address: "г. Пенза, ул. Научная, дом 3, кв. 7",
        tel: '+7 353 222-11-11',
        mail: 'penza@gmail.com',
    },
    {
        address: "г. Ялта, ул. Вишнёвая, 22/12",
        tel: '+7 322 333-11-21',
        mail: 'yalta@gmail.com',
    },
    {
        address: "г. Благовещенск, ул. Ленина, дом 3, стр. 11",
        tel: '+7 422 121-41-14',
        mail: 'bgk@gmail.com',
    },
    {
        address: "г. Воронеж, ул. Разбитая, дом 1, кв. 12",
        tel: '+7 222 133-18-14',
        mail: 'voronej@gmail.com',
    },
];

const makeContactsWithUniqueId = () => INITIAL_DATA.map((el) => {
    const id = _.uniqueId();
    return { ...el, id };
});

export default class Office extends PureComponent {

    state = {
        contacts: makeContactsWithUniqueId(),
        edit: false,
        editedCard: {},
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
        const mapped = contacts.map((c) => {
            if (c.id === card.id) {
                return card;
            }
            return c;
        });
        this.setState({ contacts: mapped, edit: false });
    } 

    createContactsCards = () => {
        const { contacts } = this.state;
        return contacts.map((c) => (
            <div className="office__card col-12" key={c.id}>
                <div>{c.address}</div>
                <div>{c.tel}</div>
                <div>{c.mail}</div>
                <button type="button" className="btn btn-primary edit" onClick={this.edit(c.id)}>Редактировать</button>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.deliteCard(c.id)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        ));
    }

    render() {
        const { edit, editedCard } = this.state;
        return (
            <div className="row office">
                {edit? <EditForm card={editedCard} getEditedCard={this.getEditedCard}/> : 
                <><div className="col-12 office__title">Вы можете удалять, изменять или добавлять новые карточки с контактными данными</div>
                {this.createContactsCards()}</>}
            </div>
        )
    }
}