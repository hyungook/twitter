import React, { useEffect, useState } from 'react';
import { dbService } from '../firebase';

const Tweet = ({tweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        // console.log(ok)
        if(ok) {
            //delete tweet
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit =  async (event) => {
        event.preventDefault();
        console.log(tweetObj, newTweet);
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text:newTweet,
        })
        setEditing(false);
    }

    const onChange = (event) => {
        const {target: {value},} = event;
        setNewTweet(value);
    }

    return (
        <div>
      {editing ? (
        <>
            <form onSubmit={onSubmit}>
                <input
                type="text"
                placeholder="Edit your tweet"
                value={newTweet}
                required
                onChange={onChange}
                />
                <input type="submit" value="Update Tweet" />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} width="50ox" height="50px" />}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
