import * as React from "react";
import { AppProvider, SignInPage } from "@toolpad/core";
import { useTheme } from "@mui/material/styles";
import { useSignInUserMutation } from "../../store/authApi";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../../utils/localStorage";
import { useState } from "react";
import { Box, Typography } from "@mui/material"; // Import Box
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const providers = [{ id: "credentials", name: "Email and Password" }];

export default function CredentialsSignInPage() {
  const [signInUser] = useSignInUserMutation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const token = getFromLocalStorage("kt-auth-react-v");
    if (token) {
      navigate("/");
    }
  }, []);

  const signIn = async (provider, formData) => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const email = formData.get("email");
      const password = formData.get("password");
      const response = await signInUser({ email, password }).unwrap();

      if (response) {
        const token = response.token;
        const name = response.name;
        saveToLocalStorage("kt-auth-react-v", token);
        saveToLocalStorage("name", name);
        toast.success("login successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      toast.success(error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const theme = useTheme();
  return (
    <AppProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#f5f5f5"
      >
        <Box
          width="100%"
          maxWidth="500px"
          p={3}
          bgcolor="white"
          borderRadius={4}
          boxShadow={3}
        >
          {error && <div style={{ color: "red" }}>{error}</div>}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <SignInPage signIn={signIn} providers={providers} />
          )}

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link to="/auth/register" underline="hover">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </AppProvider>
  );
}
