import React from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Category({url,name}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: 200,
        height: 400,
        padding: 2,
        cursor: "pointer",
        userSelect: "none",
        "&:hover .hoverEffect": {
          transform: "scale(1.05)",
        },
        "&:hover .hoverOverlay": {
          opacity: 1,
        },
        "&:hover .mainText": {
          opacity: 0,
        },
      }}
    >
      {/* Card and Hover Overlay Container */}
      <NavLink to={'/posts/?ctg='+name} >
      <Card
        className="hoverEffect"
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: 2,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* Image */} 
        <CardMedia
          component="img"
          image={url}
          alt="categs"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Centered Text (Shoes!) with Transparent Dark Background */}
        <Box
          className="mainText"
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: 2,
            padding: 1,
            transition: "opacity 0.3s",
          }}
        >
          <Typography
            variant="h6"
            color="white"
            sx={{ textAlign: "center", fontWeight: 700 }}
          >
            {name}  
          </Typography>
        </Box>

        {/* Hover Content */}
        <Box
          className="hoverOverlay"
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            opacity: 0,
            transition: "opacity 0.3s",
          }}
        >
          <CardContent sx={{ textAlign: "center", color: "white", px: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              More Details
            </Typography>
            <Typography variant="body2" mt={1}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
            </Typography>
          </CardContent>
        </Box>
      </Card>
      </NavLink>
    </Box>
  );
}
