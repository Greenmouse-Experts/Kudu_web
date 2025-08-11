import { Link } from "react-router-dom";
import JobItem from "../../../components/JobItem";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/apiFactory";

const TrendingJobs = (props) => {
  const query = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      let resp = await apiClient.get("/fetch/jobs");
      return resp.data;
    },
  });

  if (query.isFetching)
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <span className="text-lg text-gray-700 font-medium">
          Loading jobs...
        </span>
      </div>
    );

  if (query.isError)
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-red-500 text-2xl mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-1.414-1.414A9 9 0 105.636 18.364l1.414 1.414A9 9 0 1018.364 5.636z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01"
            />
          </svg>
        </div>
        <span className="text-lg text-gray-700 font-medium mb-4">
          Error fetching jobs.
        </span>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => query.refetch()}
        >
          Retry
        </button>
      </div>
    );

  const jobs = query.data.data;

  const filteredJobs =
    jobs?.filter((job) =>
      `${job.title} ${job.location} ${job.type}`.toLowerCase(),
    ) || [];
  return (
    <div className="w-full">
      <div className="bg-[#192D4C] w-full flex justify-between p-6 rounded-md mb-10 cursor-pointer">
        <h2 className="text-lg text-white font-semibold">Trending Jobs</h2>
        <Link to={"/career"} className="text-white font-semibold">
          See All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => <JobItem job={job} key={index} />)
        ) : (
          <p className="text-center text-gray-500">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default TrendingJobs;
