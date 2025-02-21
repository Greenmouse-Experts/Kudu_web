import React from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const JobItem = ({ job }) => {
  return (
    <div className="border p-7 rounded-lg bg-white">
      <h3 className="text-lg font-semibold leading-loose">{job.title}</h3>
      <div className="flex items-center gap-2 text-sm text-gray-500 my-2 leading-loose">
        <FaMapMarkerAlt className="text-orange-500" />
        <span className="text-orange-500 leading-loose">{job.location}</span>
        <FaClock className="text-blue-500 ml-4" />
        <span className="text-blue-500 leading-loose">{job.jobType}</span>
      </div>

      <div
        className="text-sm text-gray-700 leading-loose"
        dangerouslySetInnerHTML={{ __html: job?.description.slice(0, 200) }}
      ></div>

      <button className="border w-full mt-4 py-4 rounded-lg text-sm hover:bg-gray-100">
        <Link to={`/jobs-details/${job.id}`}>View Job Details</Link>
      </button>
    </div>
  );
};

export default JobItem;
