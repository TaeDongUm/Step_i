import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HeroSection from './components/HeroSection';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Community from './components/Community';
import ProfileStatistics from './components/ProfileStatistics';
import ProfileTaskHistory from './components/ProfileTaskHistory';
import TodayAchievements from './components/TodayAchievements';
import RoutineCreate from './components/RoutineCreate';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/today" element={<TodayAchievements />} />
      <Route path="/community" element={<Community />} />
      <Route path="/routine-create" element={<RoutineCreate />} />
      <Route path="/profile" element={<ProfileStatistics />} />
      <Route path="/profile/history" element={<ProfileTaskHistory />} />
    </Routes>
  );
}