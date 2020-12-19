import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CocktailListItems from '../../../components/ListItems/CocktailListItems/CocktailListItems';
import Spinner from '../../../components/Spinner/Spinner';
import { fetchGetSingleCocktail, fetchGetUsersCocktails } from '../../../store/actions/cocktailActions';

const MyCocktailsPage = props => {
    const dispatch = useDispatch();
    const usersCocktails = useSelector(state => state.cocktails.usersCocktails);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        if (user.length === 0) {
            props.history.replace("/register");
        } else {
            dispatch(fetchGetUsersCocktails());
        };
    }, [dispatch]);

    const getToSingleCocktailPage = id => {
        dispatch(fetchGetSingleCocktail(id));
    };

    return (
        <div>
            <div className='cocktails-box'>
                {usersCocktails && usersCocktails.length > 0 ? usersCocktails.map(ct => {
                    return <CocktailListItems
                        key={ct._id}
                        name={ct.name}
                        image={ct.image}
                        clicked={() => getToSingleCocktailPage(ct._id)} />
                }) : <Spinner />}
            </div>
        </div>
    );
};

export default MyCocktailsPage;