import { createBrowserRouter } from "react-router-dom";
import { App } from "../app/app";
import { ProcessPage } from "../pages/process";
import { ProcessListPage } from "../pages/process-list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ProcessListPage />,
      },
      {
        path: "process/:id",
        element: <ProcessPage />,
      },
    ],
  },
]);
