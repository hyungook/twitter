import React, { useState } from 'react';
import { authService } from '../firebase';


const AuthForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAcount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        console.log(event.target.name);
        const {target:{name,value}} = event;

        if(name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
          let data;
          if (newAccount) {
            data = await authService.createUserWithEmailAndPassword(
              email,
              password
            );
          } else {
            data = await authService.signInWithEmailAndPassword(email, password);
          }
          console.log(data);
        } catch (error) {
          setError(error.message);
        }
    };

    const toggleAccount = () => {
        setNewAcount(prev => !prev )
    }

    return (
        <>
        <form onSubmit={onSubmit} className="container">
            <input name="email" type="email" placeholder="Email" className="authInput" required value={email} onChange={onChange} />
            <input name="password" type="password" placeholder="Password" className="authInput" required value={password} onChange={onChange} />
            <input type="submit" className="authInput authSubmit" value={newAccount ? "Create Account" : "Sign In"} />
            {/* <input type="submit" value={newAccount ? "Create Account" : "Log in"} /> */}
            {error && <span className="authError">{error}</span>}
            <span onClick={toggleAccount} className="authSwitch">
              {newAccount ? "Sign In" : "Create Account"}
            </span>
        </form>
        </>
    )
}

export default AuthForm;