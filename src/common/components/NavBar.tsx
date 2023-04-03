import {Link} from 'react-router-dom';

export function NavBar () {
  return (
    <section className="top-nav">
      <input id="menu-toggle" type="checkbox" />
      <label className='menu-button-container' htmlFor="menu-toggle">
      <div className='menu-button'></div>
      </label>
      <ul className="menu">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/where'>Where</Link></li>
        <li>When</li>
        <li>Details</li>
        <li>Registry</li>
      </ul>
    </section>
  )
}