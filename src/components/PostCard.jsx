import React from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PostCard({ url, name, username, story,id }) {
  // Function to remove HTML tags and get the first 8 words
  const formatStory = (text) => {
    // Remove HTML tags
    const plainText = text.replace(/<\/?[^>]+(>|$)/g, "");

    console.log(plainText);
    
    // Get the first 8 words
    return plainText.split(" ").slice(0, 8).join(" ");
  };
  const navigate=useNavigate()

  return (
    <Box
    onClick={()=>navigate('/detail/'+id)}

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
          alt="category"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Centered Text with Name and Username */}
        <Box
          className="mainText"
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
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
          <Typography
            variant="body2"
            color="white"
            sx={{ textAlign: "center", marginTop: 0.5 }}
          >
            @{username}
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
              {name}
            </Typography>
            <Typography variant="body2" mt={1}>
              {formatStory(story)}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
