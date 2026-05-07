import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Usercard from "./Usercard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { addFeed } from "../reduxContent/feedSlice";

const Feed = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log("feed in Feed.jsx", feed?.data?.[3]);

  const feedLoad = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true,
      });
      console.log("res data", res?.data);
      dispatch(addFeed(res?.data));
    } catch (error) {
      if(error?.response?.status===401){
        toast.error(error?.response?.data)
      }
    }
  };

  useEffect(() => {
    if (user) {
      feedLoad()
    } 
  }, [user]);

  return (
    <>
      {user && (
        <div className="flex justify-center my-5">
          <Usercard user={feed?.data?.[4]} />
        </div>
      )}
    </>
  );
};

export default Feed;
