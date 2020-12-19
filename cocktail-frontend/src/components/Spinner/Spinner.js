import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCocktail } from '@fortawesome/free-solid-svg-icons';
import './Spinner.css';

const Spinner = () => {
    return (
        <div>
            <span className='spinner'>
                 <FontAwesomeIcon icon={faCocktail} size='10x' color='black'/>
                 <h4>Loading...</h4>
            </span>
        </div>
    );
};

export default Spinner;