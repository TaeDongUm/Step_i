import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Community from './components/Community';
import PostDetail from './components/PostDetail';
import WritePost from './components/WritePost';
import './global.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './router';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<AppRoutes />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/post/:id" element={<PostDetail />} />
            <Route path="/community/write" element={<WritePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;