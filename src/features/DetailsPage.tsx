/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect } from 'react';
import img4 from 'assets/png/img4.png';
import img5 from 'assets/png/img5.png';
import photo from 'assets/jpg/photo1.jpeg';

type Message = {
  message: String,
  private?: Boolean,
  response?: String,
};

export function DetailsPage () {
  const [message, setMessage] = useState('');
  const [messagePrivate, setMessagePrivate] = useState(false);
  const [changed, setChanged] = useState(false);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function getMessages() {
      const getMessagesURL = "https://us-central1-candawedding-3f172.cloudfunctions.net/widgets/message";
      
      try {
        const response = await fetch(getMessagesURL);

        const body:{messages:Message[]} = await response.json();

        setCurrentMessages(body.messages);
      } catch (e) {
        console.error(e)
      }
    }

    getMessages();
  }, []);

  async function sendMessage () {
    if (changed) {
      setChanged(false); // debounce

      try {
        const messageMeURL = "https://us-central1-candawedding-3f172.cloudfunctions.net/widgets/message";

        await fetch(messageMeURL, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify({
            private: messagePrivate,
            message,
          }),
        });
    
        console.log('Success');
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className='detailsPage'>
      <div className="faq">
        <h1>FAQ</h1>
        <p><i>You've got questions, we've got answers.</i><br/></p>
        <h2>Why are you guys getting married?</h2>
        <p>Because we love each other truly, madly, and deeply. Plus, our two cats want us to make everything official.</p>
        <img src={img5} alt="they don't know I'm puppeteering them..."/>
        <h2>When do you need to know if I'm coming?</h2>
        <p>Ideally, as soon as you can, but definitely by <b>no later than September 1<sup>st</sup></b>.</p>
        <h2>How do I get there?</h2>
        <p><i>For those of you with cars:</i> Drive. We'll have our own parking lot at Teatown, so you don't have to worry about that.<br/><br/><i>For those of you without cars:</i> Take the Hudson Line on Metro North (from Grand Central) to <b>Croton-Harmon</b> (not Ossining) and get a cab or carshare to Teatown. It's about a 10-minute ride.</p>
        <h2>What should I wear?</h2>
        <p>Look nice, but don't go crazy. For context, Alex will be wearing a suit - not a tux - and Cecilia will be wearing flats. Plus, it's at a nature preserve, so dress accordingly.</p>
        <h2>Do I get a plus-one?</h2>
        <p>We tried really, really hard to keep things small (under 60 people). If you go to the <a href="/#/rsvp">RSVP page</a> and type in your name, it will specify if you get a plus-one. Let us know if you have any questions or concerns.</p>
        <h2>These drawings are cute, but what do you actually look like?</h2>
        <p>Why thank you! Alex worked for about 2 minutes apiece on them! Here's a photo so you don't miss us at the party. (Photo credit goes to Dante!)</p>
        <img src={photo} alt="Trust us, this one's a cute-ass photo" />
        <h2>What should I give you guys?</h2>
        <p>Because we have plenty of stuff, we ask that in lieu of gifts, you give whatever you can to one (or more!) of a list of organizations that we care a lot about. See the <a href="/#/registry">registry page</a> for details, links, and cat pictures.</p>
        <h2>Nature preserve, you say?</h2>
        <p>Don't worry, most - if not all - of the festivities will take place inside, but Westchester in October is gorgeous and leaf-y and we highly recommend you take a walk around at some point. Since we'll basically be in the woods, though, we also recommend you bring some non-drowsy Benadryl - or generic of your choice! - if you, too, are allergic to, well, nature.<br/><br/><i>Teatown is also a totally smoke (of any variety)-free campus.</i></p>
        <h2>What if I have mobility issues?</h2>
        <p>Both the parking lot and Carriage House at Teatown are ADA-accessible.</p>
        <h2>What will you feed me?</h2>
        <p>The most important question. We will be feeding you BBQ. (Don't worry, vegetarians, you won't just have to eat side dishes.) If you have any dietary restrictions that we don't know about, just let us know on your RSVP and we'll work it out.</p>
        <h2>What about COVID stuff?</h2>
        <p>We're living in a very weird time, but the same rules apply now as have for a while: if you're feeling sick or have reason to think you might have COVID, please don't come. We'll still love you and will be extremely grateful to you for not potentially getting a bunch of other people sick. In the weeks leading up the wedding, Cecilia - at least - anticipates going around in a giant protective hamster ball. (Kidding...kind of.)</p>
        <img src={img4} alt="she... actually did the hamster ball..."/>
        <h2>How can I send my well wishes, cooking tips, random facts, and general inquiries?</h2>
        <p>Shoot us a message here:<br/>(we'll check the private ones eventually, we promise!)</p>
        <textarea rows={5} name="text" placeholder="Enter scribbles..." value={message} onChange={(e)=>{
          setMessage(e.target.value);
          setChanged(true);
        }}></textarea><div className="submitArea"><button onClick={sendMessage}>Submit</button> <label><input type='checkbox' onChange={()=>{setMessagePrivate(!messagePrivate)}} checked={messagePrivate}/>Private</label></div>
        {currentMessages.filter(message => !message.private).length 
          ?<div>
            <h3>Previous Messages</h3>
            <div id="messages">{
            currentMessages
              .filter(message => !message.private)
              .map(message => <div className="messageContainer">
                <p className="message">{message.message}</p>
                {message.response
                  ? <p className="response">{message.response}</p>
                  : null}
              </div>)
            }</div>
          </div>
          : null
        }
      </div>
    </div>
  )
}