import React from "react";
import { useSelector } from "react-redux";

const Feed = () => {
  const user = useSelector((store) => store.user);

  return <>{user && <div>{user?.firstName}'s Feed</div>}</>;
};

export default Feed;
