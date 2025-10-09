import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import HomeLayout from "../layout/HomeLayout";
import HomePage from "../pages/HomePage";
import MessageLayout from "../layout/MessageLayout";
import ExplorePage from "../pages/ExplorePage";
import MessagePage from "../pages/MessagePage";
import SearchPage from "../pages/SearchPage";
import ProtectedRoute from "../components/AuthComponents/ProtectedRoute";
import PublicRoute from "../components/AuthComponents/PublicRoute"; // 👈 new import

const AppRouter = () => {
  const router = createBrowserRouter([
    // 🟢 Public route (login/register)
    {
      element: <PublicRoute />,
      children: [
        {
          path: "/",
          element: <AuthLayout />,
        },
      ],
    },

    // 🔒 Protected routes (only after login)
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/home",
          element: <HomeLayout />,
          children: [
            { path: "", element: <HomePage /> },
            { path: "explore", element: <ExplorePage /> },
            {
              path: "messages",
              element: <MessageLayout />,
              children: [{ path: "", element: <MessagePage /> }],
            },
            { path: "search", element: <SearchPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
