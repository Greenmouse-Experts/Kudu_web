import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ModalProvider } from "./hooks/modal";
import ReusableModal from "./components/ReusableModal";
import { accessType, isTokenValid } from "./helpers/tokenValidator";
import Chat from "./modules/Chatbot/Chat";
import { useDispatch } from "react-redux";
import { setIPInfo, setKuduUser } from "./reducers/userSlice";
import { IPInfoContext } from "ip-info-react";
import { useContext } from "react";
import { useEffect } from "react";

function App() {
  const router = createBrowserRouter(routes);
  const tokenValid = isTokenValid();
  const userData = accessType();
  const dispatch = useDispatch();
  const ipInfo = useContext(IPInfoContext);

  // Simplified authentication check - only handle critical redirects
  if (!tokenValid) {
    // Only remove token and user data if no valid token
    localStorage.removeItem("kuduUserToken");
    dispatch(setKuduUser(null));
  }

  useEffect(() => {
    dispatch(setIPInfo(ipInfo));
  }, [ipInfo]);

  return (
    <ModalProvider>
      <ReusableModal />
      <RouterProvider router={router} />
    </ModalProvider>
  );
}

export default App;
