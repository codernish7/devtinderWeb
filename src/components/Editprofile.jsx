import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Usercard from "./Usercard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../reduxContent/userSlice";
import toast from "react-hot-toast";

const Editprofile = () => {
  const currentUser = useSelector((store) => store.user);
  const [firstName, setfirstName] = useState(currentUser?.firstName || "");
  const [lastName, setlastName] = useState(currentUser?.lastName || "");
  const [age, setAge] = useState(currentUser?.age || "");
  const [gender, setGender] = useState(currentUser?.gender || "");
  const [skills, setSkills] = useState(currentUser?.skills || "");
  const [about, setAbout] = useState(currentUser?.about || "");
  const [photoUrl, setPhotoUrl] = useState(currentUser?.photoUrl || "");

  const dispatch = useDispatch();

  const handleEdit = async () => {
    try {
      const skillArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
      const res = await axios.patch(
        BASE_URL + "profile/edit",
        {
          age,
          gender,
          skills: skillArray,
          about,
          photoUrl,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data));
      toast.success("Profile edit successful");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    setfirstName(currentUser?.firstName || "");
    setlastName(currentUser?.lastName || "");
    setAge(currentUser?.age || "");
    setGender(currentUser?.gender || "");
    setSkills(currentUser?.skills?.join(", ") || "");
    setAbout(currentUser?.about || "");
    setPhotoUrl(currentUser?.photoUrl || "");
  }, [currentUser]);
  return (
    <div className="h-[calc(100vh-68px)] flex items-center justify-center gap-10 bg-base-300 px-4">
      <fieldset className="fieldset bg-base-200 border border-base-300 rounded-box w-80 max-h-[90vh] overflow-y-auto mb-3 p-6 shadow-lg">
        <legend className="fieldset-legend text-lg font-semibold">
          Edit Profile
        </legend>

        <label className="label mt-2">Age</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label className="label mt-2">Gender</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <label className="label mt-2">PhotoUrl</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <label className="label mt-2">Skills</label>
        <textarea
          className="textarea textarea-bordered w-full"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <label className="label mt-2">About</label>
        <textarea
          className="textarea textarea-bordered w-full"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <button className="btn btn-primary w-full mt-10" onClick={handleEdit}>
          Save
        </button>
      </fieldset>
      <Usercard
        user={{ firstName, lastName, age, gender, photoUrl, skills, about }}
      />
    </div>
  );
};

export default Editprofile;
