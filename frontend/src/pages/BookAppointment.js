import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { bookAppointment, fetchCoaches } from '../api';
import { AuthContext } from '../AuthContext';

export default function BookAppointment(){
  const { coachId } = useParams();
  const [coach, setCoach] = useState(null);
  const [form, setForm] = useState({userId:'', appointmentDate:'', slot:'', description:''});
  const [msg, setMsg] = useState('');

  const { user } = useContext(AuthContext);
  useEffect(()=>{
    if(user) setForm(f=>({ ...f, userId: user.id }));
  },[user]);

  useEffect(()=>{
    fetchCoaches().then(list=>{
      const c = list.find(x=>String(x.id)===String(coachId));
      setCoach(c);
    })
  },[coachId])

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const payload = {...form, coachId: Number(coachId)};
      const res = await bookAppointment(payload);
      setMsg('Booked id: '+res.id);
    }catch(err){
      setMsg('Booking failed');
    }
  }

  return (
    <div style={{padding:20}}>
      <h2>Book Appointment</h2>
      {coach && <div>Booking with <strong>{coach.username}</strong></div>}
      <form onSubmit={submit}>
        <div className="form-row">
          <label>Your User Id</label><br/>
          <input value={form.userId} onChange={e=>setForm({...form, userId:e.target.value})} disabled={!!user} />
          {user && <div style={{color:'#666'}}>Booking as {user.username}</div>}
        </div>
        <div>
          <label>Date</label><br/>
          <input type="date" value={form.appointmentDate} onChange={e=>setForm({...form, appointmentDate:e.target.value})} />
        </div>
        <div>
          <label>Slot</label><br/>
          <input value={form.slot} onChange={e=>setForm({...form, slot:e.target.value})} />
        </div>
        <div>
          <label>Description</label><br/>
          <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        </div>
  <button type="submit" style={{background:'#2c3e50', color:'#fff', padding:'8px 12px', border:'none', borderRadius:4}}>Book</button>
      </form>
      {msg && <div className={`message ${msg.startsWith('Booked')? 'success':'error'}`}>{msg}</div>}
    </div>
  );
}
