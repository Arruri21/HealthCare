import React, {useEffect, useState} from 'react';
import { fetchCoaches } from '../api';
import { Link } from 'react-router-dom';

export default function Coaches(){
  const [coaches,setCoaches]=useState(null);
  useEffect(()=>{ fetchCoaches().then(setCoaches).catch(()=>setCoaches([])); },[]);

    if(coaches===null) return <div style={{padding:20}}>Loading coaches...</div>;

    return (
      <div style={{padding:20}}>
        <h2>Coaches</h2>
        {coaches.length===0 && <div>No coaches found</div>}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px,1fr))', gap:12}}>
          {coaches.map(c=> (
            <div key={c.id} style={{border:'1px solid #ddd', padding:12, borderRadius:6}}>
              <h3>{c.username}</h3>
              <div style={{color:'#666'}}>{c.specialty}</div>
              <div style={{marginTop:8}}>
                <Link to={`/book/${c.id}`}>Book Appointment</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
