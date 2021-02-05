import React, { useState } from 'react';
import AuthForm from '../components/authForm';
import { authService, firebaseInstance } from '../firebase';


const Auth = () => {
    const onSolcialClick = async (event) => {
        // console.log(event.target.name);
        const {target: {name}} = event;

        let provider;
        if(name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if(name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }
    return (
    <div>
        <AuthForm />
        <div>
            <button onClick={onSolcialClick} name="google">Continue with Google</button>
            <button onClick={onSolcialClick} name="github">Continue with Github</button>
        </div>
    </div>
    )}

export default Auth;