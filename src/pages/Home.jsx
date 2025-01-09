import React, { useContext } from "react";
import Category from "../components/Category";
import { Typography, Box, Avatar, Container } from "@mui/material";
import { CategContext } from "../context/CategContext";

export const Home = () => {

const{categories}=useContext(CategContext)
console.log(categories);


  return (
    <div className="page">
      <Typography
        variant="h4" // Adjusts the font size
        align="center" // Centers the text horizontally
        sx={{
          color: "whitesmoke", // Set the text color to white smoke
          fontWeight: "bold", // Makes the text bold
        }}
      >
        My hobbies
      </Typography>
      <Typography
        variant="body1"
        padding='1rem'
        align="center" // Corrected the typo here
        sx={{
          color: "whitesmoke", // Text color for the introduction
        }}
      >
        I made this humble blog project to express my major interests, I welcome
        you to the egyszeru blogmotor incidens.
      </Typography>

      <div
        style={{
          display: "flex", // Apply flexbox layout
          justifyContent: "center", // Center items horizontally
          alignItems: "center", // Center items vertically
          flexWrap: "wrap", // Allow wrapping of the cards
          gap: "10px", // Add spacing between cards (optional)
        }}
      >
       {categories&&categories.map(obj=>
        <Category url={obj.photoUrl} name={obj.name}/>
       )}
      </div>

      {/* Footer Section */}
      <Box
        component="footer"
        sx={{
          width: "100%",
          backgroundColor: "#282c34", // Dark background color for the footer
          padding: "20px 0", // Add vertical padding
          marginTop: "20px", // Add space between content and footer
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          {/* Profile Picture and Introduction */}
          <Avatar
            alt="Profile Picture"
            src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
            sx={{
              width: 100, // Size of the avatar
              height: 100,
              marginBottom: "10px", // Space between image and text
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "whitesmoke", // Text color for the introduction
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Hello, I'm Balint Szlavik!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "whitesmoke", // Text color for the introduction
            }}
          >
            I love coffee,hardver,and video games so i decided to make a blog
            website to entail them all as well as help people find things they
            are interested in.
          </Typography>
        </Container>
      </Box>
    </div>
  );
};
