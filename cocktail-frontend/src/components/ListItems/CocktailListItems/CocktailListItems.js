import React from 'react';
import { apiURL } from '../../../constants';
import './CocktailListItems.css';

const CocktailListItems = props => {
    return (
        <div className='cocktail-card'>
            <div onClick={props.clicked}>
                <img src={apiURL + '/uploads/' + props.image} alt={props.name} />
                <h3>{props.name}</h3>
            </div>
        </div>
    );
};

export default CocktailListItems;