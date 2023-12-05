import React from 'react';
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/home';
import SignUp from './components/signup';
import Stats from './components/stats';
import BetPage from './components/bets';
import './styles/layout.css';

const Layout = () => (
  <Router>
    <div>
      <nav className="BigNav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Sign In/Up</Link></li>
          <li><Link to="/stats">Stats</Link></li>
          <li><Link to="/bets">Bets</Link></li>
        </ul>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/bets" element={<BetPage />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default Layout;

