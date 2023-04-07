import { useState, useEffect } from 'react';
import {Autocomplete} from 'common/components'
import img2 from 'assets/png/img2.png';

type Person = {
  id: string,
  rsvped: boolean,

  plusOneAllowed?: boolean,
  plusOneAdded: boolean,
  plusOneName: string,

  name: string,
  partnerName: string,
  partnerComing: boolean,

  dietaryRestrictions: string,
  songRequest: string,
};

async function readInvited ():Promise<[Person[], string[]]> {
  const inviteListURL = "https://us-central1-candawedding-3f172.cloudfunctions.net/widgets/inviteList";

  const response = await fetch(inviteListURL);
  const inviteList = await response.json();

  console.log(JSON.stringify(inviteList));

  const invitedPeople:Person[] = [];
  const primaryInvitedNames:string[] = [];

  inviteList.forEach(({
    id,
    plusOneAllowed = false,
    name,
    plusOneName = "",
    plusOneAdded = false,
    partnerName = "",
    rsvped = false,
    partnerComing = false,
    dietaryRestrictions = "",
    songRequest = "",
  } : Person) => {
    primaryInvitedNames.push(name);
    invitedPeople.push({
      id,
      rsvped,

      plusOneAllowed,
      plusOneAdded,
      plusOneName,

      name: name,
      partnerName: partnerName,

      partnerComing: partnerComing,

      dietaryRestrictions,
      songRequest,
    });

    if (partnerName) {
      invitedPeople.push({
        id,
        rsvped: partnerComing,
  
        plusOneAllowed,
        plusOneAdded,
        plusOneName,
  
        name: partnerName,
        partnerName: name,
        partnerComing: rsvped,

        dietaryRestrictions,
        songRequest,
      });
    }
  });

  return [invitedPeople, primaryInvitedNames];
}

async function updateList () {
  const keyElement = document.getElementById('key') as HTMLInputElement;
  const key = keyElement.value;
  const listElement = document.getElementById('list') as HTMLInputElement;
  const list = JSON.parse(listElement.value || '');

  console.log('key', key);
  console.log('list', list);

  const inviteListURL = "https://us-central1-candawedding-3f172.cloudfunctions.net/widgets/setUsers";

  try {
    const response = await fetch(inviteListURL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({key, users: list}),
    });

    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

export function RSVPPage () {
  const [invitedPeople, setInvitedPeople] = useState<Person[]>([]);
  const [primaryIdHolders, setPrimaryIdHolders] = useState<string[]>([])
  
  const [toShowRSVPContent, setShowRSVPContent] = useState(false);
  const [toShowWarning, setShowWarning] = useState(false);
  const [warning, setWarning] = useState("");
  const [workingUser, setWorkingUser] = useState<Person>({
    id: "",
    plusOneAllowed: false,
    name: "",
    plusOneName: "",
    plusOneAdded: false,
    partnerName: "",
    rsvped: false,
    partnerComing: false,
    dietaryRestrictions: "",
    songRequest: "",
  });

  useEffect(() => {
    async function getUsers() {
      const [foundInvitedPeople, foundPrimaryIdHolders] = await readInvited();
      setInvitedPeople(foundInvitedPeople);
      setPrimaryIdHolders(foundPrimaryIdHolders);
    }

    getUsers();
  }, []);

  function showRSVPContent () {
    const nameElement = document.getElementById('rsvpName') as HTMLInputElement;
    const name = nameElement.value;

    const person = invitedPeople.find(invitedPerson => invitedPerson.name === name);

    if (!person) {
      setWarning(`${name} doesn't seem to be on the list, please click the name of the person you'd like to RSVP`);
      setShowWarning(true);
    } else {
      setShowWarning(false);
      setWorkingUser(person);
    }

    setShowRSVPContent(true);
  }

  function hideRSVPContent () {
    setShowRSVPContent(false);
    setShowWarning(false);
  }

  // const [workingUser, setWorkingUser] = useState<Person>({
  //   id: "",
  //   plusOneAllowed: false,
  //   name: "",
  //   plusOneName: "",
  //   plusOneAdded: false,
  //   partnerName: "",
  //   rsvped: false,
  //   partnerComing: false,
  //   dietaryRestrictions: "",
  //   songRequest: "",
  // });

  async function submitRSVP() {
    let userToSubmit:Person = {...workingUser};
    if (!primaryIdHolders.includes(workingUser.name)) {
      userToSubmit.name = workingUser.partnerName;
      userToSubmit.partnerName = workingUser.name;
      userToSubmit.rsvped = workingUser.partnerComing;
      userToSubmit.partnerComing = workingUser.rsvped;
    }

    const rsvpUrl = "https://us-central1-candawedding-3f172.cloudfunctions.net/widgets/rsvp";

    try {
      const response = await fetch(rsvpUrl, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(userToSubmit),
      });
  
      console.log(response);
    } catch (e) {
      console.log(e);
    }

    window.location.reload();
  }

  return (
    <div>
      {/* <input type="text" id='key' defaultValue='key'/>
      <input type="text" id='list' defaultValue='list'/>
      <button onClick={updateList}>Update List</button> */}
      <div className='rsvpPage'>
        <img src={img2} alt="scroll down please!"/>
        <h1>RSVP</h1>
        <Autocomplete updateListener={hideRSVPContent} id="rsvpName" suggestions={invitedPeople.map(person => person.name)}/>
        <button onClick={showRSVPContent}>Update RSVP</button>
        <div className={toShowRSVPContent ? 'rsvpContent' : 'hidden'}>
          <div className={toShowWarning ? 'warning' : 'hidden'}>{warning}</div>
          <p>Hello {workingUser.name.split(' ')[0]}, we're glad to hear from you. Please update the below information as needed.</p>
          <table className="rsvpForm table-light">
            {/* Are they coming */}
            <tr><td colSpan={2}><p>First things first: are you coming?</p></td></tr>
            <tr>
              <td className="left"><input type="checkbox" checked={workingUser.rsvped} onChange={()=>{setWorkingUser({
                  ...workingUser,
                  rsvped: !workingUser.rsvped
                });}} /></td>
                <td className="right"><label>I'm coming!</label></td>
            </tr>
            <tr><td colSpan={2}></td></tr>

            {/* Plus-One Coming */}
            <tr>
              <td colSpan={2}><p>{workingUser.plusOneAllowed
                ? "We made room for a plus-one for you. Will you be bringing one?"
                : workingUser.partnerName ? `Will ${workingUser.partnerName.split(' ')[0]} be joining you?` : "Unfortunately due to limited space, we couldn't offer you a plus-one, sorry for the inconvenience."}</p></td>
            </tr>
            {workingUser.partnerName
              ? <tr>
                <td className="left"><input checked={workingUser.partnerComing} onChange={()=>{setWorkingUser({
                  ...workingUser,
                  partnerComing: !workingUser.partnerComing
                });}} type="checkbox" /></td>
                <td className="right"><label>{`${workingUser.partnerName} will be coming.`}</label></td>
              </tr>
              : workingUser.plusOneAllowed ? <tr>
                <td className="left"><input checked={workingUser.plusOneAdded} onChange={()=>{setWorkingUser({
                  ...workingUser,
                  plusOneAdded: !workingUser.plusOneAdded
                });}} type="checkbox" /></td>
                <td className="right"><label>My plus-one will be coming.</label></td>
              </tr> : <tr><td colSpan={2}><i>No action necessary...</i></td></tr>}
              <tr> </tr>

              {/* Plus-One Name */}
              {workingUser.plusOneAdded ? <tr>
                <td colSpan={2}><p>What's your plus-one's name?</p></td>
              </tr> : null}{workingUser.plusOneAdded ? <tr><td colSpan={2}><input type="text" value={workingUser.plusOneName} onChange={(e)=>{
                setWorkingUser({
                  ...workingUser,
                  plusOneName: e.target.value,
                })
              }} /></td></tr> : null}
              {workingUser.plusOneAdded ? <tr> </tr> : null}

              {/* Dietary Restrictions */}
              <tr>
                <td colSpan={2}><p>Any dietary restrictions?</p></td>
              </tr>
              <tr><td colSpan={2}><input type="text" value={workingUser.dietaryRestrictions} onChange={(e)=>{
                setWorkingUser({
                  ...workingUser,
                  dietaryRestrictions: e.target.value,
                })
              }} /></td></tr><tr></tr>
              
              {/* Song Request */}
              {/* <tr>
                <td colSpan={2}><p>Any song requests?</p></td>
              </tr>
              <tr><td colSpan={2}><input type="text" value={workingUser.songRequest} onChange={(e)=>{
                setWorkingUser({
                  ...workingUser,
                  songRequest: e.target.value,
                })
              }} /></td></tr><tr></tr> */}
          </table>

          <button onClick={submitRSVP}>Submit</button>
        </div>
      </div>
    </div>
  )
}