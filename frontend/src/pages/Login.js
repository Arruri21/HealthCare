import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function Login(){
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [role,setRole]=useState('user');
  const [msg,setMsg]=useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const submit = async (e)=>{
    e.preventDefault();
  const endpoint = role==='user' ? 'users' : 'coaches';
  const res = await fetch(`http://localhost:8080/api/v1/${endpoint}/login`,{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username,password})});
    if(res.status===200){
      const user = await res.json();
      setUser(user);
      setMsg('Login successful: '+user.username);
      navigate('/appointments');
    } else {
      setMsg('Login failed');
    }
  }

  return (
    <div>
      <h2 style={{marginTop:0, marginBottom:8, textAlign:'center'}}>Login</h2>
      <form onSubmit={submit}>
        <div className="form-row">
          <label>Role</label>
          <select value={role} onChange={e=>setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="coach">Coach</option>
          </select>
        </div>
        <div className="form-row">
          <label>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div style={{textAlign:'center'}}>
          <button className="btn" type="submit">Login</button>
        </div>
      </form>
      {msg && <div className={`message ${msg.startsWith('Login successful')? 'success':'error'}`}>{msg}</div>}
    </div>
  );
}
