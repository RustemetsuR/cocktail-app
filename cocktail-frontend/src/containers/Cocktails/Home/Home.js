import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CocktailListItems from '../../../components/ListItems/CocktailListItems/CocktailListItems';
import Spinner from '../../../components/Spinner/Spinner';
import { fetchGetCocktails, fetchGetSingleCocktail } from '../../../store/actions/cocktailActions';
import './Home.css';

const Home = props => {
    const dispatch = useDispatch();
    const cocktails = useSelector(state => state.cocktails.cocktails);

    useEffect(() => {
        dispatch(fetchGetCocktails());
    }, [dispatch]);

    const getToSingleCocktailPage = id => {
        dispatch(fetchGetSingleCocktail(id));
    };

    return (
        <div>
            {cocktails.length === 0 ? <Spinner /> : <div className='cocktails-box'>
                {cocktails.map(ct => {
                    return <CocktailListItems
                        key={ct._id}
                        name={ct.name}
                        image={ct.image} 
                        clicked={() => getToSingleCocktailPage(ct._id)}/>
                })}
            </div>}
        </div>
    );
};

export default Home;