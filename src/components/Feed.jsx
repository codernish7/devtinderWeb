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

  const feedLoad = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error(error?.response?.data);
      }
    }
  };

  useEffect(() => {
    if (user) {
      feedLoad();
    }
  }, [user]);

  return (
    <>
      {user && (
        <div className="flex justify-center my-5">
          <Usercard user={feed?.[0]} />
        </div>
      )}
    </>
  );
};

export default Feed;
