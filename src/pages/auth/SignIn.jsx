import React, { useState } from "react";
import { AppProvider } from "@toolpad/core";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSignInUserMutation } from "../../store/authApi";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../../utils/localStorage";

export default function SignInForm() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signInUser] = useSignInUserMutation();
  const navigate = useNavigate();

  // Toggles password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  React.useEffect(() => {
    const token = getFromLocalStorage("kt-auth-react-v");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  // Handle sign-in action on button click
  const handleSignIn = async () => {
    try {
      const userInfo = {
        email,
        password,
      };

      const response = await signInUser(userInfo).unwrap();

      if (response) {
        saveToLocalStorage("kt-auth-react-v", response.token);
        saveToLocalStorage("name", response.name);
        toast.success("Login successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid username or password");
      console.error("Error:", error);
    }
  };

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
          sx={{
            width: "100%",
            maxWidth: 500,
            p: 3,
            bgcolor: "white",
            borderRadius: 4,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom align="center">
            Sign In
          </Typography>

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSignIn} // Trigger sign-in on button click
          >
            Sign In
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link to="/auth/register" underline="hover">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
      <ToastContainer />
    </AppProvider>
  );
}
