import React, {useState, useContext} from 'react';
import { registerUser, registerCoach } from '../api';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [role,setRole]=useState('user');
  const [form,setForm]=useState({username:'',password:'',email:'',mobile:'',dob:'',gender:'',city:''});
  const [msg,setMsg]=useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    try{
      if(role==='user'){
        const res = await registerUser(form);
        setUser(res);
  setMsg('User registered: '+res.username);
  navigate('/appointments');
      } else {
        const res = await registerCoach(form);
        setUser(res);
  setMsg('Coach registered: '+res.username);
  navigate('/appointments');
      }
    }catch(err){
      setMsg('Registration failed');
    }
  }

  return (
    <div>
      <h2 style={{marginTop:0, marginBottom:8, textAlign:'center'}}>Register</h2>
      <div className="form-row">
        <label>Role</label>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="coach">Coach</option>
        </select>
      </div>
      <form onSubmit={submit}>
        <div className="form-row">
          <label>Username</label>
          <input value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        </div>
        <div className="form-row">
          <label>Mobile</label>
          <input value={form.mobile} onChange={e=>setForm({...form, mobile:e.target.value})} />
        </div>
        <div className="form-row">
          <label>City</label>
          <input value={form.city} onChange={e=>setForm({...form, city:e.target.value})} />
        </div>
        <div style={{textAlign:'center'}}>
          <button className="btn" type="submit">Register</button>
        </div>
      </form>
      {msg && <div className={`message ${msg.startsWith('User registered')||msg.startsWith('Coach registered')? 'success':'error'}`}>{msg}</div>}
    </div>
  );
}
