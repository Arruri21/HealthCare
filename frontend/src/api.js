const BASE = 'http://localhost:8080/api/v1';

export function saveSession(user){
  localStorage.setItem('hc_user', JSON.stringify(user));
}

export function loadSession(){
  const s = localStorage.getItem('hc_user');
  return s? JSON.parse(s): null;
}

export async function fetchCoaches(){
  const res = await fetch(`${BASE}/coaches/all`);
  return res.json();
}

export async function fetchUsers(){
  const res = await fetch(`${BASE}/users/all`);
  return res.json();
}

export async function fetchUser(id){
  const res = await fetch(`${BASE}/users/${id}`);
  if(!res.ok) return null;
  return res.json();
}

export async function registerUser(payload){
  const res = await fetch(`${BASE}/users/register`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
  return res.json();
}

export async function registerCoach(payload){
  const res = await fetch(`${BASE}/coaches/register`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
  return res.json();
}

export async function bookAppointment(payload){
  const res = await fetch(`${BASE}/bookings`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
  return res.json();
}

export async function fetchAppointments(){
  const res = await fetch(`${BASE}/bookings`);
  return res.json();
}

export async function fetchCoach(id){
  const res = await fetch(`${BASE}/coaches/${id}`);
  if(!res.ok) return null;
  return res.json();
}

export async function fetchAppointmentsByUser(userId){
  const res = await fetch(`${BASE}/bookings/user/${userId}`);
  return res.json();
}

export async function fetchAppointmentsByCoach(coachId){
  const res = await fetch(`${BASE}/bookings/coach/${coachId}`);
  return res.json();
}

export async function updateAppointment(id, payload){
  const res = await fetch(`${BASE}/bookings/${id}`, {method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
  return res.json();
}

export default {saveSession, loadSession, fetchCoaches, fetchUsers, fetchUser, registerUser, registerCoach, bookAppointment, fetchAppointments, fetchAppointmentsByUser, fetchAppointmentsByCoach, fetchCoach, updateAppointment};
