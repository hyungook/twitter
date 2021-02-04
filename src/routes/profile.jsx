import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, dbService } from '../firebase';

const Profile = ({userObj}) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    }

const getMyTwwts = async() => {
    const tweets = await dbService.collection("twwets").where("creatorId", "==", userObj.uid).orderBy("createAt","desc").get();
    console.log(tweets.docs.map(doc => doc.data()))
};

useEffect(() => {
    getMyTwwts();    
}, [])

    return <>
        <button onClick={onLogOutClick}>Log out</button>
    </>
}

export default Profile;