export function WherePage () {
  return (
    <div className='wherePage'>
      <h1>Where?</h1>
      <p>The Carraige House at Teatown Nature Preserve</p>
      <p>1600 Spring Valley Rd. Ossining, NY 10562</p>
      <iframe className='map' title='Teatown Location' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.4824391652464!2d-73.82906968338361!3d41.211255979280736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2b864e4d06471%3A0x1357ce622b77077d!2sTeatown%20Lake%20Reservation!5e0!3m2!1sen!2sus!4v1680545788731!5m2!1sen!2sus" width="600" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}