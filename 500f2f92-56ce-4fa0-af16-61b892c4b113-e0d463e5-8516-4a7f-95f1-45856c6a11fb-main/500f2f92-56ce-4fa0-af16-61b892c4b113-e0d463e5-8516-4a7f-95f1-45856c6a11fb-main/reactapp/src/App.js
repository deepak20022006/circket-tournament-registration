import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LoadingRedirect from './components/LoadingRedirect'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './components/Home';
import AddPlayer from './components/AddPlayer';
import ViewPlayer from './components/ViewPlayer';
import OrganiserDashboard from './pages/OrganiserDashboard';
import FanDashboard from './pages/FanDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CreateTeam from './pages/CreateTeam';
import TeamsPage from './pages/TeamsPage';
import MatchesPage from './pages/MatchesPage';



function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <div className='main-content'>
          <Routes>
            <Route path="/" element={<LoadingRedirect />} />
            {/* <Route path="/" element = {<AddPlayer/>} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add-player" element={<AddPlayer />} />
            <Route path="/view-players" element={<ViewPlayer />} />

            <Route path="/teams" element={<TeamsPage/>}/>
            <Route path="/manage-matches" element={<MatchesPage/>}/>
            <Route path="/organiser-dashboard" element={<OrganiserDashboard />} />
            <Route path="/fan-dashboard" element={<FanDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
        <Footer />

      </div>
    </Router>
  );
}

export default App;
