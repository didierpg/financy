import { NavLink, Outlet, Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { ME_QUERY } from "@/graphql/queries";
import { UserAvatar } from "./UserAvatar";
import { Logo } from "./Logo";

export function AppLayout() {
  const { data, loading } = useQuery(ME_QUERY, {
    fetchPolicy: "cache-first", 
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans antialiased">
      <header className="w-full bg-white border-b border-gray-100 h-20 px-12 flex items-center justify-between sticky top-0 z-50">
      <div className="text-brand-dark flex items-center justify-center mb-6">
          <Logo />
        </div>

        <nav className="flex items-center gap-8 h-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center h-full text-sm font-medium border-b-2 transition-all px-1 ${
                isActive
                  ? "border-brand-base text-brand-dark font-semibold"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `flex items-center h-full text-sm font-medium border-b-2 transition-all px-1 ${
                isActive
                  ? "border-brand-base text-brand-dark font-semibold"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`
            }
          >
            Transações
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `flex items-center h-full text-sm font-medium border-b-2 transition-all px-1 ${
                isActive
                  ? "border-brand-base text-brand-dark font-semibold"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`
            }
          >
            Categorias
          </NavLink>
        </nav>

        <Link
          to="/profile"
          className={`hover:opacity-85 transition-opacity cursor-pointer ${
            loading ? "animate-pulse" : ""
          }`}
        >
          <UserAvatar name={data?.me?.name} size="md" />
        </Link>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-12 py-10">
        <Outlet />
      </main>
    </div>
  );
}
