import React from 'react';
import '../../Users/Login/Login.css';
import { useSelector } from 'react-redux';
import FacebookRegister from '../../../components/FacebookLogin/FacebookRegister';

const Register = () => {
    const error = useSelector(state => state.user.error);
    return (
        <div className='register-box user-sign-boxes'>
            <h2>Create your account</h2>
            {error ?
                <div>
                    {error}
                </div> : null}
            <FacebookRegister />
        </div>
    );
};

export default Register;