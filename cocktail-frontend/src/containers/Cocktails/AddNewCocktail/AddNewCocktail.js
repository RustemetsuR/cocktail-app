import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IngredientInput from '../../../components/IngredientInput/IngredientInput';
import './AddNewCocktail.css';
import { closeModalAction, fetchAddCocktail } from '../../../store/actions/cocktailActions';
import Modal from '../../../components/Modal/Modal';

const AddNewCocktail = props => {

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const success = useSelector(state => state.cocktails.successModal);

    useEffect(() => {
        if (user.length === 0) {
            props.history.replace('/register');
        }
    }, [user.length, props.history]);

    const [everyIngredient, setEveryIngredient] = useState([{
        name: '',
        amount: '',
        id: nanoid(8)
    }]);

    const [data, setData] = useState({
        name: '',
        recipe: '',
        image: '',
    });

    const add = () => {
        const everyIngredientCopy = [...everyIngredient];

        everyIngredientCopy.push({
            name: '',
            amount: '',
            id: nanoid(8)
        });
        setEveryIngredient(everyIngredientCopy);
    };

    const del = id => {
        let index = everyIngredient.findIndex(i => i.id === id);
        const everyIngredientCopy = [...everyIngredient];
        everyIngredientCopy.splice(index, 1);
        setEveryIngredient(everyIngredientCopy);
    };

    const changeName = (event, id) => {
        let index = everyIngredient.findIndex(i => i.id === id);
        const everyIngredientCopy = [...everyIngredient];
        everyIngredientCopy[index].name = event.target.value;

        setEveryIngredient(everyIngredientCopy);
    };

    const changeAmount = (event, id) => {
        let index = everyIngredient.findIndex(i => i.id === id);
        const everyIngredientCopy = [...everyIngredient];
        everyIngredientCopy[index].amount = event.target.value;

        setEveryIngredient(everyIngredientCopy);
    };

    const changeData = event => {
        const name = event.target.name;
        const value = event.target.value;

        const dataCopy = { ...data, [name]: value };
        setData(dataCopy);
    };

    const changeImage = event => {
        setData({ ...data, image: event.target.files[0] });
    };

    const closeModal = () =>{
        dispatch(closeModalAction());
        props.history.replace("/home");
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        const ingredientsData = [...everyIngredient];
        ingredientsData.map(d => {
            return delete d.id
        });
        const stringedArr = JSON.stringify(ingredientsData);
        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('name', data.name);
        formData.append('recipe', data.recipe);
        formData.append('ingredients', stringedArr);
        formData.append('userID', user._id);
        dispatch(fetchAddCocktail(formData));
    };

    return (
        <div>
            <h1>Add New Cocktail!</h1>
            <form className='add-cocktail-form' onSubmit={submitFormHandler}>
                <div className='name-input-box input-boxes'>
                    <label htmlFor='name'>Name: </label>
                    <input
                        onChange={changeData}
                        value={data.name}
                        required
                        id='name'
                        name='name' />
                </div>
                <div className='ingredients-inputs-box input-boxes'>
                    <label htmlFor='ingredient'>Ingredients:</label>
                    {everyIngredient.map(i => {
                        return <IngredientInput
                            key={i.id}
                            changeName={(event) => changeName(event, i.id)}
                            changeAmount={(event) => changeAmount(event, i.id)}
                            value_name={i.name}
                            value_amount={i.amount}
                            array={everyIngredient}
                            delete={() => del(i.id)} />
                    })}

                    <button className='add-input-button' type='button' onClick={add}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                <div className='recipe-input-box input-boxes'>
                    <label htmlFor='recipe'>Recipe: </label>
                    <textarea onChange={changeData} required id='recipe' name='recipe' value={data.recipe} />
                </div>
                <input required onChange={changeImage} type='file' className='input-boxes' />

                <button type='submit'>Add a cocktail</button>
            </form>
            <Modal show={success} closed={closeModal}>
                We will add it soon!
            </Modal> 
        </div>
    );
};

export default AddNewCocktail;