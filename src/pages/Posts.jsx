import React, { useContext, useEffect, useState } from "react";

import PostCard from "../components/PostCard";
import { readPost } from "../utility/crudUtility";
import { CategContext } from "../context/CategContext";
import Categs from "../components/Categs";
import { useSearchParams } from "react-router-dom";

export const Posts = () => {
  const[searchParams]=useSearchParams()
  const { categories } = useContext(CategContext);
  const [selCateg,setSelCateg]=useState(searchParams.get('ctg')?[searchParams.get('ctg')]:[])
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    readPost(setPosts, selCateg);
  }, [selCateg]);
  console.log(selCateg);
  console.log('urlparams:'+searchParams.get('ctg'));
  

  
  console.log(posts);

  return (
    <>
      <div className="page">
        {/* Radio Buttons Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px", // Spacing between radio buttons
            marginBottom: "20px", // Spacing below the radio buttons
          }}
        >
          {categories &&
            categories.map((obj) => (
             <Categs key={obj.name} selCateg={selCateg} setSelCateg={setSelCateg} ctg={obj.name} />
            ))}
        </div>

        {/* Posts Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "center", // Center items horizontally
            alignItems: "center", // Center items vertically
            flexWrap: "wrap", // Allow wrapping of the cards
            gap: "10px", // Add spacing between cards (optional)
          }}
        >
          {posts?.length > 0 &&
            posts.map((key) => (
              <PostCard
                id={key.id}
                url={key.photo.url}
                name={key.displayName}
                username={key.author}
                key={key.photo.id}
                story={key.story}
              />
            ))}
        </div>
      </div>
    </>
  );
};
