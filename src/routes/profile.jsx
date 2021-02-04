import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, dbService } from '../firebase';

const Profile = ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    };

const getMyTweets = async() => {
    const tweets = await dbService.collection("twwets").where("creatorId", "==", userObj.uid).orderBy("createAt","desc").get();
    console.log(tweets.docs.map(doc => doc.data()))
};

const onChange = (event) => {
    const {
    target: {value},
    } = event;
    setNewDisplayName(value);
}

useEffect(() => {
    getMyTweets();    
}, [])


const onSubmit = async(event) => {
    event.preventDefault();

    if(userObj.displayName !== newDisplayName) {
        // console.log(userObj.updataProfile);
        await userObj.updateProfile({displayName: newDisplayName});
    }
    refreshUser();
}
    return <>
    <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display Name"  value={newDisplayName} onChange={onChange}/>
        <input type="submit" value="Update Profile" />
    </form>
        <button onClick={onLogOutClick}>Log out</button>
    </>
}

export default Profile;