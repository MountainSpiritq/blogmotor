import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { UserContext } from "../context/UserContext";
import Toastify from "../components/Toastify";

export const Auth = () => {
  const { user, signInUser, signUpUser, message } = useContext(UserContext);

  const navigate=useNavigate()

  const location = useLocation();

  const isSignIn = location.pathname === "/auth/in";

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(
      data.get("email"),
      data.get("password"),
      data.get("displayName")
    );

    if (isSignIn) {
      signInUser(data.get("email"), data.get("password"));
    } else {
      signUpUser(
        data.get("email"),
        data.get("password"),
        data.get("displayName")
      );
    }
  };

  return (
    <div className="page">
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "flex-start", // Align items at the top
          justifyContent: "center", // Center horizontally
          pt: 4, // Add some padding-top to give space from the top
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            bgcolor: "#1f2937", // Gray-800 background (tailwind)
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ color: "white", mb: 2 }}
          >
            {isSignIn ? "Login to Your Account" : "Create an Account"}
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Display Name - For Sign Up Only */}
            {!isSignIn && (
              <Box sx={{ mb: 2 }}>
                <TextField
                  name="displayName"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#374151", // Darker gray background
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "gray", // Light gray text for labels
                    },
                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "#6b46c1", // Purple hover focus border
                      },
                    },
                  }}
                />
              </Box>
            )}

            {/* Email Input */}
            <Box sx={{ mb: 2 }}>
              <TextField
                name="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#374151", // Darker gray background
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray",
                  },
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: "#6b46c1", // Purple hover focus border
                    },
                  },
                }}
              />
            </Box>

            {/* Password Input */}
            <Box sx={{ mb: 2 }}>
              <TextField
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#374151", // Darker gray background
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray",
                  },
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: "#6b46c1", // Purple hover focus border
                    },
                  },
                }}
              />
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                bgcolor: "#6b46c1", // Purple button background
                "&:hover": {
                  bgcolor: "#553c9a", // Darker purple on hover
                },
                "&.Mui-disabled": {
                  bgcolor: "gray",
                  color: "white",
                },
              }}
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          <a href="#" onClick={()=>{navigate('/pwreset')}} >forgot password?</a>
          {message && <Toastify {...message} />}
        </Box>
      </Box>
    </div>
  );
};
