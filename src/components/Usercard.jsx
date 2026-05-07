import React from "react";

const Usercard = ({ user }) => {
  console.log(user);
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={user?.photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {`${user?.firstName} ${user?.lastName || ""}`}
        </h2>

        <span className="card-title">{user?.age}</span>

        <p>{user?.about}</p>
        <div className="card-actions justify-center mt-2">
          <button className="btn btn-accent">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
