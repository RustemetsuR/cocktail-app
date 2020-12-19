import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import { useDispatch } from 'react-redux';
import { fbAppId } from '../../constants';
import { facebookRegister } from '../../store/actions/userActions';

const FacebookRegister = () => {

    const dispatch = useDispatch();

    const facebookResponse = response => {
        if(response.id){
            console.log(response)
            dispatch(facebookRegister(response))
        }
    };

    return <FacebookLoginButton 
    appId={fbAppId} 
    fields="name,email,picture"
    render={renderProps =>{
        return <button onClick={renderProps.onClick}>
            Enter With Facebook
        </button>
    }}
    callback={facebookResponse}
    />
};

export default FacebookRegister;