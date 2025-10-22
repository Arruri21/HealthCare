import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Coaches from './pages/Coaches';
import BookAppointment from './pages/BookAppointment';
import Appointments from './pages/Appointments';
import Navbar from './components/Navbar';
import { AuthProvider, AuthContext } from './AuthContext';

function AppRoutes(){
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/coaches" element={<Coaches/>} />
        <Route path="/book/:coachId" element={<BookAppointment/>} />
        <Route path="/appointments" element={<Appointments/>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthRenderer />
      </Router>
    </AuthProvider>
  );
}

function AuthRenderer(){
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && <Navbar />}
      <AppRoutes />
    </>
  );
}
