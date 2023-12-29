import { createBrowserRouter } from "react-router-dom";
import MainPage from "./main.page";
import DetailPage from "./detail.page";
import PublishPage from "./publish.page";
import LoginPage from "./login.page";
import Layout from "../layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/publish",
        element: <PublishPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/detail/:postId",
        element: <DetailPage />,
      },
    ],
  },
]);
