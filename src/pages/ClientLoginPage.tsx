import { useEffect, useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import logo from "@/assets/Logo profesional.webp";

export const ClientLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [reset, setReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) navigate("/cliente", { replace: true });
      }),
    [navigate],
  );
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isLoading) return;
    setError("");
    setNotice("");
    setIsLoading(true);
    try {
      if (reset) {
        await sendPasswordResetEmail(auth, email.trim());
        setNotice(
          "Si el correo tiene una cuenta asociada, recibirás un enlace para cambiar tu contraseña. Revisa también la carpeta de spam.",
        );
      } else {
        await setPersistence(
          auth,
          remember ? browserLocalPersistence : browserSessionPersistence,
        );
        await signInWithEmailAndPassword(auth, email.trim(), password);
        navigate("/cliente", { replace: true });
      }
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (reset && code === "auth/user-not-found")
        setNotice(
          "Si el correo tiene una cuenta asociada, recibirás un enlace para cambiar tu contraseña. Revisa también la carpeta de spam.",
        );
      else if (
        [
          "auth/invalid-credential",
          "auth/wrong-password",
          "auth/user-not-found",
        ].includes(code || "")
      )
        setError("Correo o contraseña incorrectos.");
      else if (code === "auth/too-many-requests")
        setError(
          "Hubo varios intentos seguidos. Espera unos minutos e intenta de nuevo.",
        );
      else if (code === "auth/network-request-failed")
        setError(
          "No pudimos conectarnos. Revisa tu conexión e intenta nuevamente.",
        );
      else
        setError(
          reset
            ? "No pudimos enviar el enlace. Revisa el correo e intenta nuevamente."
            : "No pudimos iniciar sesión. Intenta nuevamente.",
        );
    } finally {
      setIsLoading(false);
    }
  };
  const switchMode = () => {
    setReset((value) => !value);
    setError("");
    setNotice("");
  };
  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-11 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100";
  return (
    <div className="flex min-h-screen flex-1 bg-[#f5f6fa]">
      <section className="hidden w-[44%] flex-col justify-between bg-[#101c32] p-12 text-white lg:flex">
        <Link to="/" className="flex items-center gap-3 text-white hover:text-white">
          <img
            src={logo}
            alt="ABP Seguros"
            className="h-14 w-14 rounded-xl bg-white object-contain p-1"
          />
          <span className="font-semibold">ABP Seguros</span>
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-abp-gold">
            Tu portal de clientes
          </p>
          <h1 className="mt-5 max-w-md text-4xl font-semibold leading-tight text-white">
            Tu tranquilidad,
            <br />
            en un solo lugar.
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-slate-300">
            Consulta tus pólizas, mantén al día tus asegurados y gestiona tus
            novedades con el acompañamiento de ABP.
          </p>
        </div>
        <p className="text-xs text-slate-400">
          Acompañamiento cercano, en cada paso.
        </p>
      </section>
      <div className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
          >
            <FiArrowLeft />
            Volver al sitio web
          </Link>
          <div className="mb-7">
            <span className="inline-flex rounded-xl bg-amber-100 p-3 text-amber-700">
              <FiUser className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900">
              {reset ? "Recupera tu acceso" : "Bienvenido de nuevo"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              {reset
                ? "Ingresa el correo de tu cuenta para recibir un enlace de recuperación."
                : "Ingresa a tu espacio de ABP Seguros."}
            </p>
          </div>
          {error && (
            <p
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            >
              {error}
            </p>
          )}
          {notice && (
            <p
              role="status"
              className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
            >
              {notice}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <fieldset disabled={isLoading} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="tu@empresa.com"
                    className={inputClass}
                  />
                </div>
              </div>
              {!reset && (
                <>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Contraseña
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-3.5 text-slate-400" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className={inputClass}
                      />
                      <button
                        type="button"
                        aria-label={
                          showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                        }
                        aria-pressed={showPassword}
                        onClick={() => setShowPassword((value) => !value)}
                        className="absolute right-3 top-3.5 text-slate-500"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between gap-3 text-xs">
                    <label className="flex items-center gap-2 text-slate-600">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(event) => setRemember(event.target.checked)}
                        className="h-4 w-4 accent-slate-900"
                      />
                      Recordarme
                    </label>
                    <button
                      type="button"
                      onClick={switchMode}
                      className="font-medium text-slate-700 underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
              >
                {isLoading
                  ? "Procesando…"
                  : reset
                    ? "Enviar enlace de recuperación"
                    : "Ingresar a mi portal"}
              </button>
            </fieldset>
          </form>
          {reset ? (
            <button
              type="button"
              disabled={isLoading}
              onClick={switchMode}
              className="mt-6 w-full text-sm text-slate-600 underline"
            >
              Volver a iniciar sesión
            </button>
          ) : (
            <p className="mt-8 text-center text-sm text-slate-500">
              ¿Aún no tienes acceso?{" "}
              <a
                href="https://wa.me/573135707125"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-800 underline hover:text-slate-600"
              >
                Solicítalo a tu asesor
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
