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
import { useSignUpUserMutation } from "../../store/authApi";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getFromLocalStorage } from "../../utils/localStorage";

export default function SignUpForm() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signUpUser] = useSignUpUserMutation();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordValid = (password) => {
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  React.useEffect(() => {
    const token = getFromLocalStorage("kt-auth-react-v");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid(password)) {
      toast.error(
        "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character."
      );
      return;
    }

    try {
      const userInfo = {
        name: name,
        email: email,
        password: password,
      };

      const response = await signUpUser(userInfo).unwrap();

      if (response) {
        console.log("try", response);
        toast.success("Registered successfully");
        navigate("/auth/login");
      }
    } catch (error) {
      toast.error(error?.data?.Message);
      console.log("vikas", error?.data?.Message);
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
          component="form"
          onSubmit={handleSubmit}
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
            Sign Up
          </Typography>

          <TextField
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />
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
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link to="/auth/login" underline="hover">
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
      <ToastContainer />{" "}
    </AppProvider>
  );
}
