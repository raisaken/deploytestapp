import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/users/UserSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const success = useSelector((state) => state.user.isSuccess);

  const handleLogout = () => {
    dispatch(logout());
    console.log(success);
  };
  
  useEffect(() => {
    if (!success) {
      navigate("/login");
    }
  },[success]);

  return (
    <div>
      This is a navbar
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Navbar;
