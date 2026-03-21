import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Redirect } from "./pages/redirect";
import { NotFound } from "./pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:shortUrl",
    element: <Redirect />,
  },
  {
    path: "/link/not-found",
    element: <NotFound />,
  },
]);
