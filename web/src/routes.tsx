import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Redirect } from "./pages/redirect";

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
    path: "*",
    element: <div />,
  },
]);
