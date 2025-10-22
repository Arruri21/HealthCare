import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('hc_user');
      if(raw) setUser(JSON.parse(raw));
    }catch(e){ }
  },[]);

  useEffect(()=>{
    if(user) localStorage.setItem('hc_user', JSON.stringify(user));
    else localStorage.removeItem('hc_user');
  },[user]);

  return (
    <AuthContext.Provider value={{user,setUser}}>
      {children}
    </AuthContext.Provider>
  );
}
