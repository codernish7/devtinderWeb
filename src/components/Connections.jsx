import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../reduxContent/connections";

const Connections = () => {
  const dispatch = useDispatch();
  const showConnections = useSelector((store) => store.connections);
  const getConnections = async () => {
    try {
      const userConnections = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(userConnections?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Connections</h2>

        {showConnections?.map((connections) => {
          const { firstName, lastName, photoUrl, about } = connections;
          return (
            <div className="card card-border bg-base-300 w-[600px] p-4 mb-2">
              <div className="flex items-center gap-5">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={photoUrl} alt="profile" />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold">{`${firstName || ""} ${lastName || ""}`}</h2>

                  <p className="text-sm text-gray-400 mt-1">{about}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
