import React, {useEffect, useState, useContext} from 'react';
import { fetchAppointments, updateAppointment, fetchUser, fetchCoach, fetchAppointmentsByUser, fetchAppointmentsByCoach } from '../api';
import { AuthContext } from '../AuthContext';

export default function Appointments(){
  const [appointments,setAppointments]=useState([]);
  const { user } = useContext(AuthContext);
  useEffect(()=>{
    if(user && user.username && user.id){
      // determine role by presence of specialty (coach) or other heuristic
      if(user.specialty){
        fetchAppointmentsByCoach(user.id).then(setAppointments).catch(()=>setAppointments([]));
      } else {
        fetchAppointmentsByUser(user.id).then(setAppointments).catch(()=>setAppointments([]));
      }
    } else {
      fetchAppointments().then(setAppointments).catch(()=>setAppointments([]));
    }
  },[user]);
  const [resolved, setResolved] = useState({});

  useEffect(()=>{
    (async ()=>{
      const users = {};
      const coaches = {};
      await Promise.all(appointments.map(async (a)=>{
        if(a.userId && !users[a.userId]){
          users[a.userId] = await fetchUser(a.userId).catch(()=>({username:a.userId}));
        }
        if(a.coachId && !coaches[a.coachId]){
          coaches[a.coachId] = await fetchCoach(a.coachId).catch(()=>({username:a.coachId}));
        }
      }));
      setResolved({users, coaches});
    })();
  },[appointments]);

  const takeAction = async (id, action, comment)=>{
    await updateAppointment(id, {status: action, coachComments: comment || (action==='ACCEPTED'? 'Accepted':'Rejected')});
    // refresh
    if(user && user.specialty) fetchAppointmentsByCoach(user.id).then(setAppointments);
    else if(user) fetchAppointmentsByUser(user.id).then(setAppointments);
    else fetchAppointments().then(setAppointments);
  }

  return (
    <div style={{padding:20}}>
      <h2>Appointments</h2>
      {appointments.length===0 && <div>No appointments found</div>}
      <div style={{display:'grid', gap:12}}>
        {appointments.map(a=> (
          <div key={a.id} style={{border:'1px solid #eee', padding:12, borderRadius:6}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <div style={{fontWeight:700}}>#{a.id} <span style={{marginLeft:8, color:'#666'}}>{a.status}</span></div>
                <div>User: {resolved.users && resolved.users[a.userId]?.username || a.userId}</div>
                <div>Coach: {resolved.coaches && resolved.coaches[a.coachId]?.username || a.coachId}</div>
                <div>Date: {a.appointmentDate} Slot: {a.slot}</div>
              </div>
              <div>
                {a.status==='PENDING' && (
                  <ActionButtons appointment={a} onAction={takeAction} />
                )}
                {a.coachComments && <div style={{marginTop:8, color:'#333'}}>Coach notes: {a.coachComments}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionButtons({appointment, onAction}){
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  return (
    <div>
      {!showComment ? (
        <>
          <button onClick={()=>{ setShowComment(true); setComment(''); }} style={{marginRight:8}}>Accept / Comment</button>
          <button onClick={()=>{ setShowComment(true); setComment(''); }}>Reject / Comment</button>
        </>
      ) : (
        <div>
          <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Enter coach comments (optional)" />
          <div>
            <button onClick={()=>{ onAction(appointment.id, 'ACCEPTED', comment); setShowComment(false); }}>Confirm Accept</button>
            <button onClick={()=>{ onAction(appointment.id, 'REJECTED', comment); setShowComment(false); }}>Confirm Reject</button>
            <button onClick={()=>setShowComment(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
