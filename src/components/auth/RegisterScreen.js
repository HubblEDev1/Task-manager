import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';

import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    //const state = useSelector( (state) => state);
    const { msgError } = useSelector( state => state.ui );

    const [formValues, handleInputChange, reset] = useForm({
        name: '',
        email: '',
        pass: '',
        pass2: ''
    });

    const {name, email, pass, pass2} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if( isFormValid() ){
            dispatch(startRegisterWithEmailPasswordName(email, pass, name));
        }
    }

    const isFormValid = () => {

        if(name.trim().length === 0){
            dispatch(setError('Name is required'));
            return false;
        }else if(!validator.isEmail(email)){
            dispatch(setError('Email is not valid'))
            return false;
        }else if( pass !== pass2 || pass < 5 ){
            dispatch(setError('Incorrect password'));
            return false;
        }

        dispatch(removeError());
        
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={handleRegister}>
                {
                    msgError && (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                }
                <input 
                    type="text"
                    placeholder="Name" 
                    name="name"
                    className="auth__input" 
                    value={name}    
                    onChange={handleInputChange}           
                />
                <input 
                    type="text"
                    placeholder="Email" 
                    name="email"
                    className="auth__input"
                    value={email} 
                    onChange={handleInputChange}                 
                />
                <input 
                    type="password"
                    placeholder="Password" 
                    name="pass"
                    className="auth__input"
                    value={pass} 
                    onChange={handleInputChange} 
                />
                <input 
                    type="password"
                    placeholder="Confirm password" 
                    name="pass2"
                    className="auth__input"
                    value={pass2} 
                    onChange={handleInputChange} 
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5" 
                >
                    Register
                </button>


                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already Registered?
                </Link>
            </form>
        </>
    )
}
