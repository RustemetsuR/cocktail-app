import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner/Spinner';
import { apiURL } from '../../../constants';
import { fetchDeleteCocktail, fetchGetSingleCocktail, fetchPublishCocktail } from '../../../store/actions/cocktailActions';
import './SingleCocktail.css';

const SingleCocktail = props => {
    const dispatch = useDispatch();
    const cocktail = useSelector(state => state.cocktails.singleCocktailInfo);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        dispatch(fetchGetSingleCocktail(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    const deleteCocktail = () => {
        dispatch(fetchDeleteCocktail(cocktail._id));
    };

    const publishCocktail = () => {
        dispatch(fetchPublishCocktail(cocktail._id));
    };

    return (
        <div>
          
            {Object.keys(cocktail).length > 0 ?
                <div className='single-cocktail-info-box'>
                    {user.role === 'admin' ? cocktail.published ?
                        <div className='published-sign status-sign'>
                            <h5>Status:<span> Published</span></h5>
                            <button
                                onClick={() => deleteCocktail()}
                                className='delete-cocktail-button admin-cocktail-buttons'>
                                Delete
                            </button>
                        </div> :
                        <div className='unpublished-sign status-sign'>
                            <h5>Status:<span> Unpublished</span></h5>
                            <button
                            onClick={() => publishCocktail()}
                                className='publish-cocktail-button admin-cocktail-buttons'>
                                Publish
                            </button>

                            <button
                                onClick={() => deleteCocktail()}
                                className='delete-cocktail-button admin-cocktail-buttons'>
                                Delete
                            </button>
                        </div> : null}
                    <h2 className='single-cocktail-title'>
                        {cocktail.name}
                    </h2>
                    <img src={apiURL + '/uploads/' + cocktail.image} alt={cocktail.name} />
                    <div className='ingredients-box'>
                        <h2 className='ingredients-title'>
                            Ingredients
                        </h2>
                        <hr className='line'></hr>
                        <ul>
                            {cocktail.ingredients.map(i => {
                                return <li key={i.name}>{i.name}: {i.amount}</li>
                            })}
                        </ul>
                    </div>
                    <div className='recipe-box'>
                        <h2 className='recipe-title'>
                            Recipe
                        </h2>
                        <hr className='line'></hr>
                        <p>{cocktail.recipe}</p>
                    </div>
                </div> : <Spinner />
            }
        </div >
    );
};

export default SingleCocktail;