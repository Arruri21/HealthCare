import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function Navbar(){
  const navigate = useNavigate();
  const {user, setUser} = useContext(AuthContext);

  const logout = ()=>{
    setUser(null);
    navigate('/');
  }

  return (
    <div style={{background:'#2c3e50', color:'#fff', padding:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <div>
        <Link to="/" style={{color:'#fff', textDecoration:'none', marginRight:12}}>HealthCare</Link>
        <Link to="/coaches" style={{color:'#fff', textDecoration:'none', marginRight:12}}>Coaches</Link>
        <Link to="/appointments" style={{color:'#fff', textDecoration:'none'}}>Appointments</Link>
      </div>
      <div>
        {user ? (
          <>
            <span style={{marginRight:12}}>Hi, {user.username}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{color:'#fff', textDecoration:'none', marginRight:12}}>Login</Link>
            <Link to="/register" style={{color:'#fff', textDecoration:'none'}}>Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
