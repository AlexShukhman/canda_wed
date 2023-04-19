import claraArtie from 'assets/png/clara_artie.png';
import bbg from 'assets/png/bbg_cropped.png';
import pphood from 'assets/png/img6.png';
import bpl from 'assets/png/bpl_cropped.png';
import teatown from 'assets/png/teatown_cropped.png';

export function RegistryPage () {
  return (
    <div className='registryPage'>
      <h1>Registry-ish</h1>
      <p>As was mentioned in the <a href="/#/details">FAQ</a>, we are asking that guests refrain from buying us (or the kittens...) any gifts. Instead we'd prefer that you give what you're comfortable giving to one or more of these non-profit organizations that are near and dear to us as a couple.<br/><br/>Should you like to send us a note or question about your donation, we have a field on the <a href="/#/details">FAQ page</a> where you can do so!<br/><br/><i>Just click the organization's name to open its donation site.</i></p> 
      <hr />
      <div className="registryLine">
        <div className="registryItem">
          <h2><a target="_blank" rel="noopener noreferrer" href="https://www.nyanimalrescue.org/donate">Sean Casey Animal Rescue</a></h2>
          <p>Sean Casey is the no-kill animal rescue shelter where we adopted both Clara and Artie, who are both absolutely nuts and whom we love dearly.</p>
        </div>
        <div className="registryItem">
          <img src={claraArtie} alt="Two nutty cats" onClick={() => {window.open("https://www.nyanimalrescue.org/donate")}} />
        </div>
      </div>
      <hr />
      <div className="registryLine">
        <div className="registryItem">
          <img src={bbg} alt="A gorgeous garden" onClick={() => {window.open("https://www.bbg.org/support/donate")}} />
        </div>
        <div className="registryItem">
          <h2><a target="_blank" rel="noopener noreferrer" href="https://www.bbg.org/support/donate">The Brooklyn Botanic Garden</a></h2>
          <p>The garden is one of the few places we've found in New York City where we can go and forget - at least for a little while - that we're in the middle of one of the loudest, brightest, most exhausting (and exciting) cities in the world. Also, Alex likes the bonsai.</p>
        </div>
      </div>
      <hr />
      <div className="registryLine">
        <div className="registryItem">
          <h2><a target="_blank" rel="noopener noreferrer" href="https://www.weareplannedparenthood.org/onlineactions/cOJVhOyrzkq4uBcxVekXFA2?sourceid=1000061&affiliateID=091110&_gl=1*rzhr2h*_ga*MTA1MjMwODU4My4xNjgwNjU0NDUz*_gid*MTQzMDUxNDgyNi4xNjgwODc1MTM0">Planned Parenthood Brooklyn</a></h2>
          <p>In today's world, this one speaks for itself, unfortunately.</p>
        </div>
        <div className="registryItem">
          <img src={pphood} alt="A no-brainer" onClick={() => {window.open("https://www.weareplannedparenthood.org/onlineactions/cOJVhOyrzkq4uBcxVekXFA2?sourceid=1000061&affiliateID=091110&_gl=1*rzhr2h*_ga*MTA1MjMwODU4My4xNjgwNjU0NDUz*_gid*MTQzMDUxNDgyNi4xNjgwODc1MTM0")}}/>
        </div>
      </div>
      <hr />
      <div className="registryLine">
        <div className="registryItem">
          <img src={bpl} alt="A wonderful institution" onClick={() => {window.open("https://donate.bklynlibrary.org/give/387995#!/donation/checkout")}}/>
        </div>
        <div className="registryItem">
          <h2><a target="_blank" rel="noopener noreferrer" href="https://donate.bklynlibrary.org/give/387995#!/donation/checkout">The Brooklyn Public Library</a></h2>
          <p>Because free access to books and information is one of the most important things in the world.</p>
        </div>
      </div>
      <hr />
      <div className="registryLine">
        <div className="registryItem">
          <h2><a target="_blank" rel="noopener noreferrer" href="https://www.teatown.org/get-involved/donate/">Teatown Lake Reservation</a></h2>
          <p>In addition to hosting super hip weddings (like ours), Teatown offers some really great hiking, classes, exhibits, and summer camps.</p>
        </div>
        <div className="registryItem">
          <img src={teatown} alt="Our cute, alternative wedding venue!" onClick={() => {window.open("https://www.teatown.org/get-involved/donate/")}}/>
        </div>
      </div>
    </div>
  )
}