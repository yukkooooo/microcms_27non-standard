import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

import { useEffect, useState } from "react";

interface PostType {
  displayName: string;
  username: string;
  verified: boolean;
  text: string;
  avatar: string;
  image: string;
}

// Postコンポーネントの定義
function Post({ displayName, username, verified, text, avatar, image }: PostType) {
  return (
    <div className="post">
      <Image
        src={avatar}
        alt={`${username}'s avatar`}
        width={500}
        height={500}
        layout="responsive"
      />
      <div className="post-details">
        <h2>{displayName} {verified && <span>✔️</span>}</h2>
        <h4>@{username}</h4>
        <p>{text}</p>
        {image &&
          <Image
            src={image}
            alt="Post image"
            width={500}
            height={500}
            layout="responsive"
          />}

      </div>
    </div>
  );
}

function Event() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const postData = collection(db, "post");
    getDocs(postData).then((querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => doc.data() as PostType));
    });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.text}
          displayName={post.displayName}
          username={post.username}
          verified={post.verified}
          text={post.text}
          avatar={post.avatar}
          image={post.image}
        />
      ))}
    </div>
  );
}

export default Event;