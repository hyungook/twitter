import React, { useEffect, useState } from 'react';
import Tweet from '../components/tweet';
import TweetFactory from '../components/tweetFactory';
import { dbService, storageService } from '../firebase';

const Home = ({userObj}) => {

    const [tweets, setTweets] = useState([]);
    const [file, setFile] = useState([]);
    const [attachment, setAttachment] = useState("");
    
    // const getTweets = async() => {
    //     const dbTweets = await dbService.collection("tweets").get();
    //     dbTweets.forEach((document) => {
    //         const tweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //         }
    //         setTweets(prev => [tweetObject, ...prev])
    //     });
    // }

    useEffect(() => {
        // getTweets();
        dbService.collection("tweets").onSnapshot(snapshot => {
        const tweetArray = snapshot.docs.map(doc => ({
            id: doc.id, ...doc.data(),
        }));
        setTweets(tweetArray)
        })
    }, []);

    return (
        <div className="container">
            <TweetFactory userObj={userObj} tweets={tweets} />
            <div style={{ marginTop: 30 }}>
                {tweets.map(tweet => (
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}

export default Home;