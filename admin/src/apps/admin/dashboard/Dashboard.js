import DashAdminsList from './DashAdminsList.js';
import DashClientsList from './DashClientsList.js';

const Dashboard = () => {
  return (
    <>
      <h2>Dashboard</h2>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 border border-dark">
            <DashClientsList />
          </div>
          <div className="col-lg-4 border border-dark">
            <DashAdminsList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
