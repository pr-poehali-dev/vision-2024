import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useClickSound } from "@/hooks/useClickSound"
import { LiquidButton } from "@/components/LiquidButton"
import Icon from "@/components/ui/icon"

const AUTH_URL = "https://functions.poehali.dev/3c41912a-d663-433f-8bd3-c756444a1749"

type AuthMode = "login" | "register"

const glassInput: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
}

type User = { nick: string; id: number }

export function Header() {
  const navigate = useNavigate()
  const playSound = useClickSound()
  const [showAuth, setShowAuth] = useState(false)
  const [mode, setMode] = useState<AuthMode>("login")
  const [nick, setNick] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("xaz_user")
    if (saved) {
      try { setUser(JSON.parse(saved)) } catch (_e) { /* ignore */ }
    }
  }, [])

  const openAuth = () => {
    playSound()
    setMode("login")
    setNick("")
    setPassword("")
    setError("")
    setShowAuth(true)
  }

  const handleSubmit = async () => {
    if (!nick.trim() || !password.trim()) { setError("Заполните все поля"); return }
    if (password.length < 4) { setError("Пароль слишком короткий (мин. 4 символа)"); return }
    setLoading(true)
    setError("")
    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: mode, nick: nick.trim(), password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Ошибка сервера")
      } else {
        const u: User = { nick: data.nick, id: data.id }
        setUser(u)
        localStorage.setItem("xaz_user", JSON.stringify(u))
        setShowAuth(false)
      }
    } catch (_err) {
      setError("Нет соединения с сервером")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("xaz_user")
    setShowUserMenu(false)
    playSound()
  }

  const skinUrl = user ? `https://mc-heads.net/head/${user.nick}/40` : ""

  return (
    <>
      <header
        className="flex items-center justify-between px-6 py-3 sticky top-0 z-40 glass-header"
      >
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => { playSound(); navigate("/") }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
        >
          <XazLogo />
          <span className="text-base font-bold text-white hidden sm:block"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 11, textShadow: "1px 1px 0 rgba(0,0,0,0.8)" }}>
            XazGames
          </span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: "Главная", to: "/" },
            { label: "Жители", to: "/city" },
            { label: "Описание", to: "/about" },
          ].map((item) => (
            <motion.div key={item.to} whileHover={{ y: -1 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
              <Link
                to={item.to}
                onClick={playSound}
                className="text-sm text-gray-300 hover:text-white transition-colors duration-100 relative group"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-violet-400 group-hover:w-full transition-all duration-200" />
              </Link>
            </motion.div>
          ))}
          <motion.a
            href="https://discord.gg/3gXZNwFr"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playSound}
            className="text-sm text-gray-300 hover:text-white transition-colors duration-100 relative group"
            whileHover={{ y: -1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            Discord
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-violet-400 group-hover:w-full transition-all duration-200" />
          </motion.a>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            /* Скин вместо кнопки войти */
            <div className="relative">
              <motion.button
                onClick={() => { playSound(); setShowUserMenu(v => !v) }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className="flex items-center gap-2 rounded-full px-2 py-1.5 glass-btn"
              >
                <img
                  src={skinUrl}
                  alt={user.nick}
                  className="w-7 h-7 rounded-lg"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                />
                <span className="text-white text-xs font-medium hidden sm:block">{user.nick}</span>
                <Icon name="ChevronDown" size={12} className="text-gray-400" />
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 w-44 rounded-2xl overflow-hidden glass-modal"
                    initial={{ opacity: 0, y: -8, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.94 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-white text-xs font-semibold">{user.nick}</p>
                      <p className="text-gray-500 text-xs">Игрок ChichVAKA</p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-3 text-left text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                    >
                      <Icon name="LogOut" size={14} fallback="Circle" />
                      Выйти
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Кнопка Регистрация */}
              <motion.button
                onClick={() => { playSound(); setMode("register"); setNick(""); setPassword(""); setError(""); setShowAuth(true) }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="glass-btn rounded-full px-4 py-2 text-xs text-gray-300 hover:text-white font-medium hidden sm:flex items-center gap-1"
              >
                <Icon name="UserPlus" size={13} className="text-violet-400" />
                Регистрация
              </motion.button>
              {/* Кнопка Войти */}
              <motion.button
                onClick={openAuth}
                whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(139,92,246,0.45)" }}
                whileTap={{ scale: 0.95 }}
                className="glass-btn-purple rounded-full px-5 py-2 text-xs font-bold flex items-center gap-1"
              >
                <Icon name="LogIn" size={13} />
                Войти
              </motion.button>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAuth(false)}
          >
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(10px)" }} />
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="relative z-10 w-full max-w-sm rounded-3xl overflow-hidden glass-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-7 pt-7 pb-5" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, transparent 70%)" }}>
                <button
                  onClick={() => setShowAuth(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors rounded-full p-1 glass-btn"
                >
                  <Icon name="X" size={16} fallback="Circle" />
                </button>

                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.35)" }}>
                    <Icon name={mode === "register" ? "UserPlus" : "LogIn"} size={18} className="text-violet-400" fallback="Circle" />
                  </div>
                  <div>
                    <h2 className="text-white text-lg font-bold" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 13 }}>
                      {mode === "login" ? "Вход" : "Регистрация"}
                    </h2>
                    <p className="text-gray-500 text-xs mt-0.5">XazGames · Хазбиково</p>
                  </div>
                </div>
              </div>

              <div className="px-7 pb-7 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-xs font-medium">Ник в Minecraft</label>
                  <input
                    type="text"
                    value={nick}
                    onChange={e => setNick(e.target.value)}
                    placeholder="Xazbik_"
                    className="rounded-xl px-4 py-2.5 text-sm w-full glass-input"
                    onFocus={e => { e.target.style.borderColor = "rgba(139,92,246,0.5)"; e.target.style.boxShadow = "0 0 0 2px rgba(139,92,246,0.15)" }}
                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none" }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 text-xs font-medium">Пароль</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="rounded-xl px-4 py-2.5 text-sm w-full glass-input"
                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                    onFocus={e => { e.target.style.borderColor = "rgba(139,92,246,0.5)"; e.target.style.boxShadow = "0 0 0 2px rgba(139,92,246,0.15)" }}
                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none" }}
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs text-center rounded-xl py-2 px-3"
                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(139,92,246,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all glass-btn-purple"
                >
                  {loading ? "Загрузка..." : mode === "login" ? "Войти" : "Зарегистрироваться"}
                </motion.button>

                <div className="flex items-center justify-center gap-1 text-xs">
                  <span className="text-gray-500">
                    {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}
                  </span>
                  <button
                    onClick={() => { setMode(mode === "login" ? "register" : "login"); setError("") }}
                    className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
                  >
                    {mode === "login" ? "Зарегистрироваться" : "Войти"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Закрыть меню при клике снаружи */}
      {showUserMenu && (
        <div className="fixed inset-0 z-30" onClick={() => setShowUserMenu(false)} />
      )}
    </>
  )
}

function XazLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="10" height="10" rx="2" fill="#8B5CF6" />
      <rect x="16" y="2" width="10" height="10" rx="2" fill="#8B5CF6" opacity="0.6" />
      <rect x="2" y="16" width="10" height="10" rx="2" fill="#8B5CF6" opacity="0.6" />
      <rect x="16" y="16" width="10" height="10" rx="2" fill="#8B5CF6" opacity="0.3" />
    </svg>
  )
}