import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Home } from "./Home";
import { useForm } from "react-hook-form";
import { Story } from "../components/Story";
import { uploadFile } from "../utility/uploadFile";
import { addPost, readPost } from "../utility/crudUtility";
import Dropdown from "../components/Dropdown";
import Alerts from "../components/Alerts";
import { useParams } from "react-router-dom";

export const AddEditPost = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [myCateg, setMyCateg] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [story, setStory] = useState(null);
  const [post, setPost] = useState(null);
  const params = useParams();

  console.log(params.id);

  useEffect(() => {
    if (params?.id) readPost(params.id, setPost);
  }, [params?.id]);

  console.log(post);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let newPostData = {
      ...data,
      story,
      author: user.displayName,
      userId: user.uid,
      category: myCateg,
      likes: [],
    };

    console.log(newPostData);

    try {
      const file = data?.file ? data.file[0] : null;
      const { url, id } = file ? await uploadFile(file) : {};
      delete newPostData.file;
      newPostData = { ...newPostData, photo: { url, id } };
      console.log(newPostData);
      addPost(newPostData);
      setUploaded(true);
      reset();
      setPhoto(null);
      setStory(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <Home />;
  return (
    <div
      className="page"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6", // Light gray background
        padding: "20px", // Ensure proper spacing on smaller screens
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "#1f2937", // Gray-800
          color: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "600px", // Increased width for better layout
          width: "100%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        {/* Profile Picture */}
        {photo && (
          <div
            style={{
              width: "100px",
              height: "100px",
              margin: "0 auto 20px auto",
              border: "2px solid #6b46c1", // Purple border
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#374151", // Darker gray for placeholder
            }}
          >
            <img
              src={photo}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* Username Input */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="displayName"
            style={{ display: "block", marginBottom: "8px", color: "gray" }}
          >
            My title
          </label>
          <input
            {...register("displayName", { required: "Title is required" })}
            placeholder="title"
            type="text"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #374151", // Darker gray border
              backgroundColor: "#374151",
              color: "white",
            }}
          />
          {errors.displayName && (
            <p style={{ color: "#f87171", marginTop: "5px" }}>
              {errors.displayName.message}
            </p>
          )}
          <p>Select a category</p>
          <Dropdown setMyCateg={setMyCateg} />
        </div>

        {/* Story Component */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="story"
            style={{ display: "block", marginBottom: "8px", color: "gray" }}
          >
            Story
          </label>
          <div
            style={{
              width: "100%",
              minHeight: "100px", // Minimum height for better visibility
              padding: "10px",
              border: "1px solid #374151",
              borderRadius: "8px",
              backgroundColor: "#374151",
              wordWrap: "break-word", // Ensures long words break into the next line
              overflowWrap: "break-word", // Modern alternative
              whiteSpace: "pre-wrap", // Preserves newlines but still wraps text
            }}
          >
            <Story setStory={setStory} uploaded={uploaded} />
          </div>
        </div>

        {/* File Upload */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="file"
            style={{ display: "block", marginBottom: "8px", color: "gray" }}
          >
            Display picture
          </label>
          <input
            type="file"
            {...register("file", {
              validate: (value) => {
                if (!value || value.length === 0) return "File is required";
                const fileExtension = value[0]?.name
                  .split(".")
                  .pop()
                  .toLowerCase();
                const acceptedFormats = ["jpg", "png"];
                if (!acceptedFormats.includes(fileExtension))
                  return "Invalid file format!";
                if (value[0].size > 2 * 1000 * 1024)
                  return "The file exceeds the allowed size";
                return true;
              },
            })}
            onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #374151", // Darker gray border
              backgroundColor: "#374151",
              color: "white",
            }}
          />
          {errors.file && (
            <p style={{ color: "#f87171", marginTop: "5px" }}>
              {errors.file.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#6b46c1", // Purple button background
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </form>
      {uploaded && <Alerts txt="sikeres feltoltes" />}
    </div>
  );
};
