import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { AuthContext } from '../AuthContext';

export default function Home(){
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState('login'); // 'login' or 'register'
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(()=>{
    if(user && user.username) navigate('/appointments');
  },[user, navigate]);

  const handleTabClick = (t)=>{
    if(t===tab || isSwitching) return;
    setIsSwitching(true);
    // small delay to allow animation/UX buffer
    setTimeout(()=>{
      setTab(t);
      setIsSwitching(false);
    }, 220);
  }

  return (
    <div style={{padding:16}}>
      <div className="auth-card">
        <div className="auth-top">
          <div className="auth-logo">HC</div>
          <div>
            <div className="auth-title">HealthCare Application</div>
            <div className="muted">Connect with coaches — book appointments easily</div>
          </div>
        </div>
        <div className="auth-tabs">
          <button className={`auth-tab ${tab==='login'?'active':''}`} onClick={()=>handleTabClick('login')} disabled={isSwitching}>Login</button>
          <button className={`auth-tab ${tab==='register'?'active':''}`} onClick={()=>handleTabClick('register')} disabled={isSwitching}>Register</button>
        </div>
        <div style={{padding:'0 20px 12px'}}>
          <div style={{height:6}}>
            <div className="tabs-underline" style={{transform: tab==='login' ? 'translateX(0px)' : 'translateX(140px)'}} />
          </div>
        </div>
        <div className="auth-body">
          <div className="auth-pane">
            {tab === 'login' ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </div>
  );
}
