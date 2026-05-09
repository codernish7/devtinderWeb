import React from "react";
import { firstLetterCapital } from "../utils/helper";

const Usercard = ( { user = {} } ) => {
  const { firstName, lastName, age, gender, photoUrl, skills = [], about } = user;

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
        <div>
          <div>{skills}</div>
        </div>
        <div className="card-actions justify-center mt-2">
          <button className="btn btn-accent">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
