import React, { useState } from 'react';
import AppRouter from './router';
// import firebase from '../firebase';
import { authService } from '../firebase';

function App() {
  // const auth = firebase.auth();

  console.log(authService.currentUser);
  // 로그인 여부를 확인할 수 있다
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  
  return <>
    <AppRouter isLoggedIn={isLoggedIn} />
    <footer>&copy; {new Date().getFullYear()}Twitter</footer>
    </>
}

export default App;