import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import logoPro from "@/assets/Logo profesional.webp";

export const ClientNavbar = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login-clientes");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          <Link to="/cliente" className="flex items-center gap-3">
            <img src={logoPro} alt="ABP" className="h-9 w-auto" />
            <span className="text-sm font-semibold text-slate-800 hidden sm:inline">
              Portal de Clientes
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {user?.email && (
              <span className="text-sm text-slate-500 hidden sm:inline">
                {user.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 transition"
            >
              <FiLogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
