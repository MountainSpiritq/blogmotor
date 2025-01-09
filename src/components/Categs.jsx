import React from "react";

export default function Categs({ ctg, selCateg, setSelCateg }) {
  const handleChange = (event) => {
    const {value,checked}=event.target
    setSelCateg(prev=>checked?[...prev,value]:prev.filter(categ=>categ!=value))
  };
  return (
    <div>
      <label>
        <input
          type="checkbox"
          name="filter"
          value={ctg
            
          }
          checked={selCateg.includes(ctg)}
          onChange={handleChange}
        />{" "}
        {ctg}
      </label>
    </div>
  );
}
