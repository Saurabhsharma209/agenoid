import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  DashboardPage,
  CampaignPage
} from './pages';
import { AgentAssist } from './components';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="app-header">c
      <div className="container-responsive">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-display font-bold text-primary-600 dark:text-primary-400">
                Agenoid™ Agentic  Orchestrator
              </span>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'nav-link-active' : 'nav-link-inactive'}`}
            >
              Dashboard
            </Link>
            <Link
              to="/campaign"
              className={`nav-link ${isActive('/campaign') ? 'nav-link-active' : 'nav-link-inactive'}`}
            >
              Orchestrator
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/')
                ? 'border-primary-500 text-primary-600 bg-primary-50 dark:bg-primary-900/50'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/campaign"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/campaign')
                ? 'border-primary-500 text-primary-600 bg-primary-50 dark:bg-primary-900/50'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Campaign
          </Link>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="app-main">
          <div className="container-responsive">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/campaign" element={<CampaignPage />} />
            </Routes>
          </div>
        </main>
        <footer className="app-footer">
          <div className="container-responsive">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Agenoid™. All rights reserved.
            </p>
          </div>
        </footer>
        <AgentAssist />
      </div>
    </Router>
  );
};

export default App;
