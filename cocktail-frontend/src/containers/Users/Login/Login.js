import React from 'react';
import { useSelector } from 'react-redux';
import FacebookLogin from '../../../components/FacebookLogin/FacebookLogin';
import './Login.css';

const Login = () => {
    const error = useSelector(state => state.user.error);

    return (
        <div className='login-box user-sign-boxes'>
            <h2>Login</h2>
            {error ?
                <div>
                    {error.error}
                </div> : null}
            <FacebookLogin/>
        </div>
    );
};

export default Login;