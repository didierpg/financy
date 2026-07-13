import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Rascunho temporário do Dashboard para testar a rota privada
function TemporaryDashboard() {
  const handleLogout = () => {
    localStorage.removeItem("@financy:token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-gray-800">
        🔒 Área Protegida - Dashboard
      </h1>
      <p className="text-gray-500 text-sm mt-1">
        Sua sessão está ativa e segura.
      </p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 h-10 bg-danger text-white rounded-lg font-semibold text-sm cursor-pointer hover:bg-red-600 transition-colors"
      >
        Sair do App (Logout)
      </button>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <ProtectedRoute isPublicOnly={false} />,
    children: [
      {
        path: "/",
        element: <TemporaryDashboard />,
      },
    ],
  },
  {
    element: <ProtectedRoute isPublicOnly={true} />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
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
