import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { routes } from "./routes";
import { ModalProvider } from "./hooks/modal";
import ReusableModal from "./components/ReusableModal";
import { accessType, isTokenValid } from "./helpers/tokenValidator";

function App() {
  const router = createBrowserRouter(routes);
  const tokenValid = isTokenValid();
  const userData = accessType();

  if(tokenValid) {
    if(userData.user?.name === "Administrator") {
      if(!window.location.href.includes('admin')) {
        window.location.href = `/auth/admin/login`;
      }
    } else {
      if(window.location.href.includes('admin')) {
        window.history.back();
      }
    }
  }

  return (
    <ModalProvider>
      <ReusableModal />
      <RouterProvider router={router} />
    </ModalProvider>
  );
}

export default App
