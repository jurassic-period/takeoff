import React, { PureComponent } from 'react';
import _ from 'lodash';

const INITIAL_DATA = [
    {
        adress: "г. Москва, ул. Случайная, дом 4, стр. 2",
        tel: '+7 495 111-11-11',
        mail: 'random@gmail.com',
    },
    {
        adress: "г. Пенза, ул. Научная, дом 3, кв. 7",
        tel: '+7 353 222-11-11',
        mail: 'penza@gmail.com',
    },
    {
        adress: "г. Ялта, ул. Вишнёвая, 22/12",
        tel: '+7 322 333-11-21',
        mail: 'yalta@gmail.com',
    },
    {
        adress: "г. Благовещенск, ул. Ленина, дом 3, стр. 11",
        tel: '+7 422 121-41-14',
        mail: 'bgk@gmail.com',
    },
    {
        adress: "г. Воронеж, ул. Разбитая, дом 1, кв. 12",
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
    }

    createContactsList = () => {
        const { contacts } = this.state;
        return contacts.map((c) => (
            <li key={c.id}>
                <div>{c.adress}</div>
                <div>{c.tel}</div>
                <div>{c.mail}</div>
            </li>
        ));
    }

    render() {
        console.log(this.state)
        return (
            <div className="row">
                <ul>
                    {this.createContactsList()}
                </ul>
            </div>
        )
    }
}