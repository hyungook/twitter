import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { dbService, storageService } from '../firebase';

const TweetFactory = ({userObj,tweets}) => {

    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("");
    
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";

        if(attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const reponse = await attachmentRef.putString(attachment, "data_url");

            attachmentUrl = await reponse.ref.getDownloadURL();
        }
        const TweetObjet = {
            text:tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        };
        await dbService.collection("tweets").add(TweetObjet)
        setTweet("");
        setAttachment("");
    }

    const onChange = (event) => {
        const {target:{value}} = event;
        setTweet(value);
    }

    // console.log(tweets);

    const onFileChange = (event) => {
        // console.log(event.target.files);
        const {target: {files},} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
            const {currentTarget: {result},} = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
        // console.log(theFile);
    };
    const onClearAttachment = () => setAttachment(null);

        return (
            <form onSubmit={onSubmit}>
                <input value={tweet} onChange={onChange} type="text" placeholder="what's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Tweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>)}
            </form>
        )
    };

export default TweetFactory;