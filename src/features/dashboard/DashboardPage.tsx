import img1 from 'assets/png/img1.png';

export const DashboardPage = () => {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
               <div>
                  <h1>So...</h1>
                  <p>
                      Cecilia and Alex are getting married.
                  </p>
                </div>
                <img src={img1} className="dashboard-logo" alt="scroll down please!"/>
            </header>
        </div>
    )
}