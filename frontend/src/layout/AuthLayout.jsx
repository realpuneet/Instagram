import React, { useState } from "react";
import Register from "../components/AuthComponents/Register";
import Login from "../components/AuthComponents/Login";
// import Login from "../components/authComponents/Login";

const AuthLayout = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="h-screen w-screen">
      {toggle ? (
        <Login setToggle={setToggle} />
      ) : (
        <Register setToggle={setToggle} />
      )}
    </div>
  );
};

export default AuthLayout;