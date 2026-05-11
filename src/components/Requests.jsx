import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../reduxContent/requests";

const Requests = () => {
  const dispatch = useDispatch();

  const readRequests = useSelector((store) => store.requests);

  const getPendingRequests = async () => {
    try {
      const requests = await axios.get(BASE_URL + "user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(requests?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      const reviewRequestAction = await axios.post(
        BASE_URL + "request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getPendingRequests();
  }, []);

  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Requests</h2>
        {readRequests?.map((requests) => {
          const { firstName, lastName, about, photoUrl } = requests.fromUserId;
          const { _id } = requests;
          return (
            <div className="card card-border bg-base-300 w-[600px] p-4 mb-2">
              <div className="flex items-center gap-5">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={photoUrl} alt="profile" />
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold">{`${firstName || ""} ${lastName || ""}`}</h2>

                  <p className="text-sm text-gray-400 mt-1">{about}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => reviewRequest("rejected", _id)}
                  >
                    Reject
                  </button>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => reviewRequest("accepted", _id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
