import React, { useEffect, useState } from 'react';
import AppRouter from './router';
// import firebase from '../firebase';
import { authService } from '../firebase';

function App() {
  // const auth = firebase.auth();
  // console.log(authService.currentUser);

  const [init, setInit] = useState(false);
  // 로그인 여부를 확인할 수 있다
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  console.log(authService.currentUser);
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[]);

  return (
  <>
   {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..." }
    <footer>&copy; {new Date().getFullYear()}Twitter</footer>
  </>);
}

export default App;