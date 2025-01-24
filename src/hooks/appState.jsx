import { useSelector } from "react-redux";

const useAppState = () => {
  const state = useSelector((state) => state);

  return {
    user: state.userData?.data,
    currency: state.userData.currencies
    // products: state.products?.data,
  };
};

export default useAppState;
  