import React from 'react';
import './IngredientInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const IngredientInput = props => {
    return (
        <div className='ingredientInput'>
            <input
                id='ingredient'
                name='ingredient'
                className='ingredient-input'
                required
                onChange={props.changeName}
                value={props.value_name} />

            <input
                required
                className='amount-input'
                onChange={props.changeAmount}
                value={props.value_amount} />

            {props.array.length > 1 ?
                <button type='button' onClick={props.delete}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button> : null}
        </div>
    );
};

export default IngredientInput;