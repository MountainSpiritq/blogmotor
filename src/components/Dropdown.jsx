import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CategContext } from "../context/CategContext";
import { useContext } from "react";

export default function Dropdown({ setMyCateg }) {
  const { categories } = useContext(CategContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selCateg, setSelCateg] = React.useState("Coffee");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (category) => {
    if (category) {
      setSelCateg(category.name);
      setMyCateg(category.name); // Update selected category
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: "", // Purple button
          color: "white", // White text
          "&:hover": {
            backgroundColor: "darkviolet", // Darker shade on hover
          },
          "&:focus": {
            outline: "none", // Remove default focus outline
            boxShadow: "0 0 0 2px #6b46c1", // Custom focus outline
          },
          borderRadius: "8px", // Rounded corners
          padding: "8px 16px", // Adjust padding
        }}
      >
        {selCateg}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add subtle shadow to the menu
        }}
      >
        {categories && categories.map((category) => (
          <MenuItem 
            key={category.name} // Add a unique key for each MenuItem
            onClick={() => handleClose(category)}
            sx={{
              "&:hover": {
                backgroundColor: "lavender", // Highlight the item on hover
              },
            }}
          >
            {category.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
