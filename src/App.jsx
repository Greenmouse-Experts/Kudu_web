import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { routes } from "./routes";
import { ModalProvider } from "./hooks/modal";
import ReusableModal from "./components/ReusableModal";

function App() {
  const router = createBrowserRouter(routes);

  return (
    <ModalProvider>
      <ReusableModal />
      <RouterProvider router={router} />
    </ModalProvider>
  );
}

export default App
