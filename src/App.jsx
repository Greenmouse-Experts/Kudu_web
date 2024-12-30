import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { landingRooutes } from "./routes/landingRoute";
import { authRoutes } from "./routes/authRoutes";

function App() {
  const router = createBrowserRouter([
    ...landingRooutes,
    ...authRoutes
  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
