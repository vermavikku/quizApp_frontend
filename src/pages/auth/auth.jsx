import { useState } from "react";

import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Auth() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Outlet />
    </ThemeProvider>
  );
}

export default Auth;
