import { NavLink, Outlet, Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';

export function AppLayout() {
  // Mock inicial das iniciais do usuário para o avatar
  const userInitials = 'CT';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans antialiased">
      <header className="w-full bg-white border-b border-gray-100 h-20 px-12 flex items-center justify-between sticky top-0 z-50">
        
        <div className="flex items-center gap-2 text-brand-dark font-bold text-xl tracking-tight select-none">
          <Wallet className="w-6 h-6 text-brand-base" />
          <span>FINANCY</span>
        </div>

        <nav className="flex items-center gap-8 h-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center h-full text-sm font-medium border-b-2 transition-all px-1 ${
                isActive
                  ? 'border-brand-base text-brand-dark font-semibold'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
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
                  ? 'border-brand-base text-brand-dark font-semibold'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
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
                  ? 'border-brand-base text-brand-dark font-semibold'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`
            }
          >
            Categorias
          </NavLink>
        </nav>

        <Link 
          to="/profile" 
          className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 tracking-tight transition-colors cursor-pointer select-none"
        >
          {userInitials}
        </Link>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-12 py-10">
        <Outlet />
      </main>
    </div>
  );
}