import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const selector = useSelector((store) => store.user);
  return <div>{selector?.firstName}'s Profile</div>;
};

export default Profile;
