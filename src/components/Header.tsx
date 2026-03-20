import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useClickSound } from "@/hooks/useClickSound"
import { LiquidButton } from "@/components/LiquidButton"

export function Header() {
  const navigate = useNavigate()
  const playSound = useClickSound()
  const [showSoon, setShowSoon] = useState(false)

  const handleNav = (path: string) => {
    playSound()
    navigate(path)
  }

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4">
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
          onClick={() => { playSound(); setShowSoon(true) }}
          glowColor="rgba(139,92,246,0.5)"
          className="rounded-full bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 text-sm font-semibold"
        >
          Войти
        </LiquidButton>
      </header>

      {/* "Скоро" модалка */}
      <AnimatePresence>
        {showSoon && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSoon(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className="relative z-10 rounded-2xl bg-[#111] border border-violet-500/30 px-10 py-8 flex flex-col items-center gap-4 shadow-[0_0_40px_rgba(139,92,246,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-violet-500/15 flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
              <h2 className="text-white text-xl font-bold">Скоро будет доступно</h2>
              <p className="text-gray-400 text-sm text-center max-w-xs">
                Авторизация находится в разработке. Следите за обновлениями!
              </p>
              <LiquidButton
                variant="primary"
                onClick={() => setShowSoon(false)}
                glowColor="rgba(139,92,246,0.4)"
                className="rounded-full px-6 py-2 mt-1"
              >
                Понятно
              </LiquidButton>
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
