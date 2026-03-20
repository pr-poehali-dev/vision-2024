import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useClickSound } from "@/hooks/useClickSound"
import { LiquidButton } from "@/components/LiquidButton"
import Icon from "@/components/ui/icon"

type AuthMode = "login" | "register" | "confirm"

const glassModal = {
  background: "rgba(10,8,22,0.82)",
  backdropFilter: "blur(36px) saturate(200%)",
  WebkitBackdropFilter: "blur(36px) saturate(200%)",
  border: "1px solid rgba(139,92,246,0.2)",
  boxShadow: "0 24px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 40px rgba(139,92,246,0.08)",
}

const glassInput = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  outline: "none",
  transition: "border-color 0.2s",
}

export function Header() {
  const navigate = useNavigate()
  const playSound = useClickSound()
  const [showAuth, setShowAuth] = useState(false)
  const [mode, setMode] = useState<AuthMode>("login")
  const [nick, setNick] = useState("")
  const [password, setPassword] = useState("")
  const [confirmCode, setConfirmCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleNav = (path: string) => {
    playSound()
    navigate(path)
  }

  const openAuth = () => {
    playSound()
    setMode("login")
    setNick("")
    setPassword("")
    setConfirmCode("")
    setError("")
    setShowAuth(true)
  }

  const handleSubmit = async () => {
    if (!nick.trim() || !password.trim()) {
      setError("Заполните все поля")
      return
    }
    if (password.length < 4) {
      setError("Пароль слишком короткий")
      return
    }
    setLoading(true)
    setError("")
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    if (mode === "register") {
      setMode("confirm")
    } else {
      setShowAuth(false)
    }
  }

  const handleConfirm = async () => {
    if (!confirmCode.trim()) {
      setError("Введите код подтверждения")
      return
    }
    setLoading(true)
    setError("")
    await new Promise(r => setTimeout(r, 700))
    setLoading(false)
    setShowAuth(false)
  }

  return (
    <>
      <header
        className="flex items-center justify-between px-8 py-4 sticky top-0 z-40"
        style={{
          background: "rgba(10,8,20,0.55)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNav("/")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
        >
          <XazLogo />
          <span className="text-lg font-semibold text-white">XazGames</span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
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

        <LiquidButton
          variant="primary"
          onClick={openAuth}
          glowColor="rgba(139,92,246,0.5)"
          className="rounded-full bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 text-sm font-semibold"
        >
          Войти
        </LiquidButton>
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
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }} />
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="relative z-10 w-full max-w-sm rounded-3xl overflow-hidden"
              style={glassModal}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header полоса */}
              <div className="px-7 pt-7 pb-5" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, transparent 70%)" }}>
                <button
                  onClick={() => setShowAuth(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors rounded-full p-1"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <Icon name="X" size={16} fallback="Circle" />
                </button>

                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.3)" }}>
                    <Icon name={mode === "confirm" ? "MessageCircle" : "LogIn"} size={18} className="text-violet-400" fallback="Circle" />
                  </div>
                  <div>
                    <h2 className="text-white text-lg font-bold">
                      {mode === "login" ? "Вход" : mode === "register" ? "Регистрация" : "Подтверждение"}
                    </h2>
                    <p className="text-gray-500 text-xs">
                      {mode === "confirm" ? "Telegram-бот @Xazbikovo_bot" : "XazGames · Хазбиково"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-7 pb-7 flex flex-col gap-4">
                {mode !== "confirm" ? (
                  <>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-400 text-xs font-medium">Ник в Minecraft</label>
                      <input
                        type="text"
                        value={nick}
                        onChange={e => setNick(e.target.value)}
                        placeholder="Xazbik_"
                        className="rounded-xl px-4 py-2.5 text-sm w-full"
                        style={glassInput}
                        onFocus={e => (e.target.style.borderColor = "rgba(139,92,246,0.5)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-400 text-xs font-medium">Пароль</label>
                      <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="rounded-xl px-4 py-2.5 text-sm w-full"
                        style={glassInput}
                        onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        onFocus={e => (e.target.style.borderColor = "rgba(139,92,246,0.5)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="rounded-2xl p-4 text-center"
                      style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Напишите команду боту <span className="text-violet-400 font-medium">@Xazbikovo_bot</span> в Telegram для получения кода подтверждения
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-400 text-xs font-medium">Код подтверждения</label>
                      <input
                        type="text"
                        value={confirmCode}
                        onChange={e => setConfirmCode(e.target.value)}
                        placeholder="Введите код из бота"
                        className="rounded-xl px-4 py-2.5 text-sm w-full"
                        style={glassInput}
                        onKeyDown={e => e.key === "Enter" && handleConfirm()}
                        onFocus={e => (e.target.style.borderColor = "rgba(139,92,246,0.5)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <p className="text-red-400 text-xs text-center">{error}</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={mode === "confirm" ? handleConfirm : handleSubmit}
                  disabled={loading}
                  className="w-full rounded-xl py-2.5 text-sm font-semibold text-white transition-all"
                  style={{
                    background: loading ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.85)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(139,92,246,0.4)",
                    boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
                  }}
                >
                  {loading ? "Загрузка..." : mode === "login" ? "Войти" : mode === "register" ? "Зарегистрироваться" : "Подтвердить"}
                </motion.button>

                {mode !== "confirm" && (
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
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
