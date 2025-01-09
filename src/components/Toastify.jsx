import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";

export default function Toastify({ err, signin, signup, resetPassword,update }) {
  const navigate = useNavigate();
  const { setMessage } = useContext(UserContext);

  useEffect(() => {
    if (err) {
      toast.error(err, { position: "top-center" });
    } else if (signin || signup) {
      toast.success(signin, { position: "top-center" });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else if (resetPassword) {
      toast.success(resetPassword, { position: "top-center" });
      setTimeout(() => {
        navigate("/auth/in");
      }, 2000);
    } else if (update) {
      toast.success(update, { position: "top-center" });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    setMessage({});
  }, [err, signin, signup, resetPassword,update]);
  return (
    <div>
      <ToastContainer />
    </div>
  );
}
