import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { routes } from "./routes";
import { ModalProvider } from "./hooks/modal";
import ReusableModal from "./components/ReusableModal";
import { accessType, isTokenValid } from "./helpers/tokenValidator";
import Chat from "./modules/Chatbot/Chat";
import { useDispatch } from "react-redux";
import { setKuduUser } from "./reducers/userSlice";

function App() {
  const router = createBrowserRouter(routes);
  const tokenValid = isTokenValid();
  const userData = accessType();
  const dispatch = useDispatch();

  setInterval(() => {
    if (tokenValid) {
      if (userData.user?.name === "Administrator") {
        if (!window.location.href.includes('admin')) {
          window.location.href = `/auth/admin/login`;
        }
      } else {
        if (window.location.href.includes('admin')) {
          window.history.back();
        }
      }
    }
    else {
      if (userData.user?.name === "Administrator") {
        if (window.location.pathname !== '/auth/admin/login') {
          window.location.href = `/auth/admin/login`;
        }
      } else {
        if (window.location.pathname !== '/login') {
          window.location.href = `/login`;
        }
      }
      localStorage.removeItem('kuduUserToken');
      dispatch(setKuduUser(null))
    }
  }, 1000)

  return (
    <ModalProvider>
      <ReusableModal />
      <RouterProvider router={router} />
    </ModalProvider>
  );
}

export default App
