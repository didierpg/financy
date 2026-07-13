import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { Dashboard } from "@/pages/Dashboard";
import { Transactions } from "@/pages/Transactions";
import { Categories } from "@/pages/Categories";
import { Profile } from "@/pages/Profile";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/AppLayout";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute isPublicOnly={false} />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/transactions", element: <Transactions /> },
          { path: "/categories", element: <Categories /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute isPublicOnly={true} />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
