import React from "react";
import { firstLetterCapital } from "../utils/helper";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserfromFeed } from "../reduxContent/feedSlice";

const Usercard = ({ user = {} }) => {
  const {
    _id,
    firstName,
    lastName,
    age,
    gender,
    photoUrl,
    skills = [],
    about,
  } = user;
  console.log("skilssssssssssssssss", skills);

  const dispatch = useDispatch();
  const handleConnectionRequest = async (status, id) => {
    try {
      const sendConnectionRequest = await axios.post(
        BASE_URL + "request/send/" + status + "/" + id,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserfromFeed(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure>
        <img src={photoUrl || null} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName || ""} ${lastName || ""}`}</h2>

        <span className="card-title">
          {age + ", " + firstLetterCapital(gender)}
        </span>

        <p>{about}</p>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(skills)
            ? skills
                .filter((skill) => skill.trim() !== "")
                .map((skill, index) => (
                  <span key={index} className="badge badge-primary">
                    {skill}
                  </span>
                ))
            : typeof skills === "string" &&
              skills
                .split(",")
                .filter((skill) => skill.trim() !== "")
                .map((skill, index) => (
                  <span key={index} className="badge badge-primary">
                    {skill.trim()}
                  </span>
                ))}
        </div>
        <div className="card-actions justify-center mt-2">
          <button
            className="btn btn-accent"
            onClick={() => handleConnectionRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleConnectionRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
