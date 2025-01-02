import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { landingRooutes } from "./routes/landingRoute";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";

function App() {
  const router = createBrowserRouter([
    ...landingRooutes,
    ...authRoutes,
    ...userRoutes
  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
