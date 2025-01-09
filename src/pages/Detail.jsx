import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, readPosts, toggleLike } from "../utility/crudUtility";
import parse from "html-react-parser";
import { MdDelete } from "react-icons/md";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { deletePhoto } from "../utility/uploadFile";
import { UserContext } from "../context/UserContext";
import Alerts from "../components/Alerts";

export default function Detail() {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const confirm = useConfirm();
  const { user } = useContext(UserContext);
  const [txt, setTxt] = useState(null);


  useEffect(() => {
    readPosts(params.id, setPost);
  }, []);

  const handleDelete = async () => {
    try {
      await confirm({
        description: "Warning this is a permanent operation!",
        confirmationText: "yessir!",
        cancellationText: "noperony!",
        title: "Are you sure you want to delete your post?",
      });
      deletePost(post.id);
      deletePhoto(post.photo.id);
      navigate("/posts");
    } catch (error) {
      console.log("nevermind:", error);
    }
  };

  const handleEdit = () => {
    // Navigate to the edit page
    navigate(`/update/${post.id}`);
  };

  const handleLikes = () => {
    if (!user) setTxt("Only logged in users may like the post!");
    else{
     toggleLike(post.id,user.uid)
    
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        gap: 2,
      }}
      className="page"
    >
      {post && (
        <>
          <Card
            sx={{
              maxWidth: 600,
              width: "100%",
              boxShadow: 3,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {/* Image Section */}
            <CardMedia
              component="img"
              image={post.photo["url"]}
              alt={post.title}
              sx={{
                maxHeight: 300,
                objectFit: "cover",
              }}
            />

            {/* Post Content */}
            <CardContent
              sx={{
                padding: 2,
                backgroundColor: "grey.900",
                color: "whitesmoke",
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  marginBottom: 1,
                  textAlign: "center",
                  fontSize: "2rem",
                }}
              >
                {post.title}
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {parse(post.story)}
              </Typography>
            </CardContent>
          </Card>
        </>
      )}

      {/* Navigation and Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginTop: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/posts")}
        >
          Go Back
        </Button>
        <Button onClick={handleLikes} variant="outlined" color="secondary">
          👍
        </Button>

        <span>likes nr:{post?.likes.length}</span>

        {user && post && (user.uid == post.userId) && (
          <>
            <Button variant="outlined" color="secondary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              <MdDelete /> delete
            </Button>
          </>
        )}
      </Box>
      {txt && <Alerts txt={txt} err={false} />}
    </Box>
  );
}
