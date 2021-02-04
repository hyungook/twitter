import React, { useEffect, useState } from 'react';
import Tweet from '../components/tweet';
import { dbService } from '../firebase';

const Home = ({userObj}) => {

    // console.log(userObj);

    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

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


    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("tweets").add({
            text:tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setTweet("");
    }

    const onChange = (event) => {
        const {target:{value}} = event;
        setTweet(value);
    }

    console.log(tweets);

    const onFileChange = (event) => {
        // console.log(event.target.files);
        const {target: {files},} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
        }
        reader.readAsDataURL(theFile);

        // console.log(theFile);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={tweet} onChange={onChange} type="text" placeholder="what's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Tweet" />
            </form>
            <div>
                {tweets.map(tweet => (
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}

export default Home;