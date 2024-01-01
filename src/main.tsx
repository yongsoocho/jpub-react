import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages";
import { SessionProvider } from "./context/login.context";
import { PostProvider } from "./context/post.context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <PostProvider>
      <SessionProvider>
        <RouterProvider router={router} />
      </SessionProvider>
    </PostProvider>
  </ChakraProvider>
);
