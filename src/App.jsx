import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ModalProvider } from "./hooks/modal";
import ReusableModal from "./components/ReusableModal";
import useAuthCheck from "./hooks/useAuth"; // Import the new hook

function App() {
  // useAuthCheck(); // Runs authentication check on load and navigation

  const router = createBrowserRouter(routes);

  return (
    <ModalProvider>
      <ReusableModal />
      <RouterProvider router={router} />
    </ModalProvider>
  );
}

export default App;
