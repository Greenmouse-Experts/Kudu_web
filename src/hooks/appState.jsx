import { useSelector } from "react-redux";

const useAppState = () => {
  const state = useSelector((state) => state);

  return {
    user: state.userData?.data,
    // products: state.products?.data,
  };
};

export default useAppState;
  