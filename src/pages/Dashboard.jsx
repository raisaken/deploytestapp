import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate()
  useEffect(()=>{
    const access = localStorage.getItem('access_token')
    if(!access){
      navigate('/login')
    }
  })
  return (
    <div>
      <Navbar />
      Dashboard
    </div>
  );
}

export default Dashboard;
