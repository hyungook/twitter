import React, { useEffect, useState } from 'react';
import AppRouter from './router';
// import firebase from '../firebase';
import { authService } from '../firebase';

function App() {
  // const auth = firebase.auth();
  // console.log(authService.currentUser);

  const [init, setInit] = useState(false);
  // 로그인 여부를 확인할 수 있다
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  console.log(authService.currentUser);
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        // setIsLoggedIn(true);
        setUserObj(user);
      } 
      setInit(true);
    })
  },[]);

  return (
  <>
   {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..." }
    <footer>&copy; {new Date().getFullYear()}Twitter</footer>
  </>);
}

export default App;