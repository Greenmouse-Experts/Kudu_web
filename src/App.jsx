import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { landingRooutes } from "./routes/landingRoute";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { productRoutes } from "./routes/productRoutes";

function App() {
  const router = createBrowserRouter([
    ...landingRooutes,
    ...authRoutes,
    ...userRoutes,
    ...productRoutes
  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
