export function NavBar () {
  return (
    <section className="top-nav">
      <input id="menu-toggle" type="checkbox" />
      <label className='menu-button-container' htmlFor="menu-toggle">
      <div className='menu-button'></div>
      </label>
      <ul className="menu">
        <li>Home</li>
        <li>Where</li>
        <li>When</li>
        <li>Details</li>
        <li>Registry</li>
      </ul>
    </section>
  )
}