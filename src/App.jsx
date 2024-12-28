import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { landingRooutes } from "./routes/landingRoute";

function App() {
  const router = createBrowserRouter([
    ...landingRooutes
  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
