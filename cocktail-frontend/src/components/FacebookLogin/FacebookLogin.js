import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import { useDispatch } from 'react-redux';
import { fbAppId } from '../../constants';
import { facebookLogin } from '../../store/actions/userActions';

const FacebookLogin = () => {

    const dispatch = useDispatch();

    const facebookResponse = response => {
        if(response.id){
            dispatch(facebookLogin(response))
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

export default FacebookLogin;