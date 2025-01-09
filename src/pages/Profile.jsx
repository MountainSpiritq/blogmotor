import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import { deletePhoto, uploadFile } from "../utility/uploadFile";
import { BarLoader } from "react-spinners";
import Toastify from "../components/Toastify";
import { extractUrlAndId } from "../utility/utils";
import { confirm, useConfirm } from "material-ui-confirm";
import { Navigate, useNavigate } from "react-router-dom";

export const Profile = () => {
  const { user, updateCredentials, message, deleteAccount, logoutUser } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const confirm = useConfirm();
  const navigate = useNavigate();
  useEffect(() => {
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url);
  }, [user]);

  const userImgId = user?.photoURL ? extractUrlAndId(user.photoURL).id : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const file = data?.file ? data.file[0] : null;
      const { url, id } = file ? await uploadFile(file) : null;

      updateCredentials(data.displayName, url + "/" + id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await confirm({
        description: "Warning this is a permanent operation!",
        confirmationText: "yessir!",
        cancellationText: "noperony!",
        title: "Are you sure you want to delete your account?",
      });
      deletePhoto(userImgId);
      deleteAccount();
      logoutUser();
    } catch (error) {
      console.log("nevermind:", error);
    }
  };

  useEffect(() => {
    !user && navigate("/");
  }, [user]);

  return (
    <div
      className="page"
      style={{
        backgroundColor: "#1f2937", // Gray-800 background (tailwind)
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "#1f2937", // Gray-800
          color: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        {/* Profile Picture */}
        {avatar && (
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
              src={avatar}
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
            Username
          </label>
          <input
            {...register("displayName", { required: "Username is required" })}
            placeholder="username"
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
        </div>

        {/* File Upload */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="file"
            style={{ display: "block", marginBottom: "8px", color: "gray" }}
          >
            Profile Picture
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
            onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
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

        <button
          onClick={handleDelete}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#D70040",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete Account
        </button>
      </form>
      {loading && <BarLoader />}
      {message && <Toastify {...message} />}
    </div>
  );
};
