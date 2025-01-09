import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Toastify from '../components/Toastify';

export const PwReset = () => {

  const{message,resetPassword}=useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log( data.get('email'));
      console.log(message);
      
    resetPassword(data.get('email'))
  };

  return (
    <div className="page" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
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
          {"Password Reset"}
        </Typography>
        <form onSubmit={handleSubmit}>
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
            Reset Password
          </Button>
        </form>
        {message && <Toastify {...message} />}
      </Box>
    </div>
  );
};
