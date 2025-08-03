import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="navbar">
          <div className="navbar-brand">
            <Link to="/">
              <span className="brand-icon">📊</span>
              <span className="brand-text">Investor <span className="brand-highlight">Insights</span></span>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="app-content">
        <Outlet />
      </main>
      
    </div>
  );
}

export default Layout;
