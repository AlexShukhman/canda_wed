import img1 from 'assets/png/img1.png';

export const HeroPage = () => {
    return (
      <div>
        <div className="hero">
            <header className="hero-header">
               <div>
                  <h1>So...</h1>
                  <p>
                      Cecilia and Alex are getting married.
                  </p>
                </div>
                <img src={img1} alt="scroll down please!"/>
            </header>
        </div>
      </div>
    )
}