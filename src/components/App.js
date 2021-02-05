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
  
  // console.log(authService.currentUser);
  
useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
        // setUserObj(user);
      } else {
        setUserObj(null);  //  logout
      }
      setInit(true);
    })
  },[]);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj(
      {
      displayName: user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args)
    }
    // Object.assign({},user));
    )}

  return (
  <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />
         : "Initializing..." }
    {/* <footer className="footer">&copy; {new Date().getFullYear()}Twitter</footer> */}
  </>);
}

export default App;