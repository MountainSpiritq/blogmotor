import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { extractUrlAndId } from "../utility/utils";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { FaBlog } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login
  const { user, logoutUser } = useContext(UserContext);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true); // User is logged in
      user.photoURL && setAvatar(extractUrlAndId(user.photoURL).url);
      !user&&setAvatar(null)
    } else {
      setIsLoggedIn(false); // User is not logged in
      setAvatar(null);
    }
  }, [user,user?.photoURL]);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#1f2937",
          borderBottom: "2px solid #6B46C1",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Hamburger Menu (on the left for mobile view) */}
          <Box sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}>
            <IconButton
              color="inherit"
              onClick={toggleDrawer(true)}
              aria-label="menu"
              sx={{
                color: "#6B46C1",
                backgroundColor: "#1f2937",
                "&:hover": {
                  backgroundColor: "#6B46C1",
                  color: "#1f2937",
                },
                borderRadius: "50%",
                padding: "8px",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Left Section (Logo and Links) */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
              <FaBlog />
            </IconButton>
            <Button
              color="inherit"
              component={NavLink}
              to="/"
              sx={{
                mr: 2,
                color: "white",
                "&:hover": { color: "#6B46C1", textDecoration: "underline" },
              }}
            >
              Főoldal
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/posts"
              sx={{
                color: "white",
                "&:hover": { color: "#6B46C1", textDecoration: "underline" },
              }}
            >
              Posztok
            </Button>

            {user&& <Button
              color="inherit"
              component={NavLink}
              to="/create"
              sx={{
                mr: 2,
                color: "white",
                "&:hover": { color: "#6B46C1", textDecoration: "underline" },
              }}
            >
              Uj bejegyzes
            </Button>}
          </Box>

          {/* Right Section: Avatar and Logout */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!isLoggedIn ? (
              <>
                {/* Show these only on desktop view */}
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Button
                    color="inherit"
                    component={NavLink}
                    to="/auth/in"
                    sx={{
                      mr: 2,
                      color: "white",
                      "&:hover": {
                        color: "#6B46C1",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Belépés
                  </Button>
                  <Button
                    color="inherit"
                    component={NavLink}
                    to="/auth/up"
                    sx={{
                      color: "white",
                      "&:hover": {
                        color: "#6B46C1",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Regisztráció
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <IconButton color="inherit" onClick={handleMenu}>
                  <Avatar sx={{ bgcolor: "#FFFFFF" }}>
                    {avatar ? (
                      <img
                        className="myavatar"
                        src={avatar}
                        alt="profile"
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      "U"
                    )}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem component={NavLink} to="/profile" onClick={handleClose}>
                    personal data
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => { handleClose(); logoutUser(); }}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Hamburger Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#1f2937",
            color: "#6B46C1",
            width: "250px",
            padding: "16px",
          },
        }}
      >
        <List>
          <ListItem component={NavLink} to="/" onClick={toggleDrawer(false)}>
            <ListItemText primary="Főoldal" sx={{ color: "white" }} />
          </ListItem>
          <ListItem component={NavLink} to="/posts" onClick={toggleDrawer(false)}>
            <ListItemText primary="Posztok" sx={{ color: "white" }} />
          </ListItem>
          {!isLoggedIn ? (
            <>
              <ListItem component={NavLink} to="/auth/in" onClick={toggleDrawer(false)}>
                <ListItemText primary="Belépés" sx={{ color: "white" }} />
              </ListItem>
              <ListItem component={NavLink} to="/auth/up" onClick={toggleDrawer(false)}>
                <ListItemText primary="Regisztráció" sx={{ color: "white" }} />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem onClick={() => { logoutUser(); toggleDrawer(false)(); }}>
                <ListItemText primary="Kijelentkezés" sx={{ color: "white" }} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>

      <Box sx={{ marginTop: 8 }}></Box>
      <Outlet />
    </Box>
  );
};
