import { useState } from "react";
import { useSelector } from "react-redux";

const useAppState = () => {
  const state = useSelector((state) => state);

  return {
    user: state.user?.data,
    currency: state.user?.currencies,
    ipInfo: state.user?.ipInfo,
    // products: state.products?.data,
  };
};

export default useAppState;

export const usePagination = () => {
  const [params, setParams] = useState({ page: 1, limit: 10 });

  const handlePageChange = (page) => {
    setParams({ ...params, page });
  };
  const nextPage = (total) => {
    console.log("nextPage");

    if (params.page <= Math.ceil(total / params.limit)) {
      handlePageChange(params.page + 1);
    }
  };
  const prevPage = (total) => {
    console.log("prevPage");
    if (params.page > 1) {
      handlePageChange(params.page - 1);
    }
  };

  const handleLimitChange = (limit) => {
    setParams({ ...params, limit });
  };

  return { params, handlePageChange, handleLimitChange, nextPage, prevPage };
};
