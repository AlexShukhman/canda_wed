import { Button as LinkButton } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {useState} from 'react';

export function NavBar () {
  const [checked, setChecked] = useState(false);
  
  function unToggle () {
    setChecked(false);
  }
  
  return (
    <section className="top-nav">
      <input id="menu-toggle" type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)}/>
      <label className='menu-button-container' htmlFor="menu-toggle">
      <div className='menu-button'></div>
      </label>
      <ul className="menu" onClick={unToggle}>
        <li><Link to='/'><LinkButton>Home</LinkButton></Link></li>
        <li><Link to='/where_when'><LinkButton >Where/When</LinkButton></Link></li>
        <li><Link to='/details'><LinkButton >FAQ</LinkButton></Link></li>
        <li><Link to='/rsvp'><LinkButton >RSVP</LinkButton></Link></li>
        <li><Link to='/registry'><LinkButton >Registry</LinkButton></Link></li>
      </ul>
    </section>
  )
}