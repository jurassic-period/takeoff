import React from 'react';

export default function SearchInput({ changeTerm })  {
    return <input type="text" placeholder="Поиск" onChange={changeTerm} className="form-control search__input" />;
};