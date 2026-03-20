import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Icon from "@/components/ui/icon"
import { LiquidButton } from "@/components/LiquidButton"
import { playWelcomeSound, useClickSound } from "@/hooks/useClickSound"

const menuItems = [
  {
    icon: "Users",
    label: "Жители города",
    desc: "Список жителей",
    tab: "residents",
    color: "text-violet-400",
    glow: "rgba(139,92,246,0.45)",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
  },
  {
    icon: "MapPin",
    label: "Достопримечательности",
    desc: "Места города",
    tab: "sights",
    color: "text-blue-400",
    glow: "rgba(59,130,246,0.45)",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  {
    icon: "Shield",
    label: "ЧС города",
    desc: "Важные события",
    tab: "emergency",
    color: "text-red-400",
    glow: "rgba(239,68,68,0.45)",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
  },
  {
    icon: "BookOpen",
    label: "Правила города",
    desc: "Правила жизни",
    tab: "rules",
    color: "text-green-400",
    glow: "rgba(34,197,94,0.45)",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
  },
]

export function HeroSection() {
  const navigate = useNavigate()
  const playSound = useClickSound()
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => playWelcomeSound(), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="flex flex-col items-center justify-center px-4 pt-12 pb-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] py-2 text-sm px-3"
      >
        <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-400">ChichWaka</span>
        <span className="text-gray-300">Официальный сайт города Хазбиково</span>
        <Icon name="ArrowUpRight" size={16} className="text-gray-400" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="mb-4 max-w-3xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance"
      >
        XazGames
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.22 }}
        className="mb-8 max-w-xl text-gray-400 leading-relaxed"
      >
        Добро пожаловать на сайт города <span className="text-violet-400 font-medium">'Хазбиково'</span>, здесь вы можете ознакомиться со всей информацией о городе, а также зайти на тест-сервер, созданный такими игроками как <span className="text-white font-medium">Xazbik_</span> и <span className="text-white font-medium">Der1zon</span> by Xaz&amp;Der1
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.32 }}
        className="flex flex-col items-center gap-4"
      >
        <AnimatePresence mode="wait">
          {!showMenu ? (
            <motion.div
              key="hero-btns"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <LiquidButton
                variant="primary"
                onClick={() => setShowMenu(true)}
                glowColor="rgba(139,92,246,0.5)"
                className="rounded-full px-8 py-3 text-base"
              >
                Перейти к Сайту <Icon name="ArrowUpRight" size={18} />
              </LiquidButton>
              <LiquidButton
                variant="outline"
                onClick={() => { playSound(); navigate("/about") }}
                glowColor="rgba(139,92,246,0.25)"
                className="rounded-full px-6 py-3"
              >
                <Icon name="BookOpen" size={16} className="text-violet-400" /> Описание
              </LiquidButton>
            </motion.div>
          ) : (
            <motion.div
              key="menu-grid"
              initial={{ opacity: 0, scale: 0.9, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 14 }}
              transition={{ duration: 0.28, type: "spring", stiffness: 280, damping: 22 }}
              className="flex flex-col items-center gap-3"
            >
              <p className="text-gray-400 text-sm mb-1">Выберите раздел</p>
              <div className="grid grid-cols-2 gap-3">
                {menuItems.map((item, i) => (
                  <motion.button
                    key={item.tab}
                    initial={{ opacity: 0, scale: 0.82 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.065, type: "spring", stiffness: 320, damping: 22 }}
                    onClick={() => { playSound(); navigate(`/city?tab=${item.tab}`) }}
                    whileHover={{ scale: 1.06, boxShadow: `0 0 22px 2px ${item.glow}` }}
                    whileTap={{ scale: 0.92 }}
                    className={`relative flex flex-col items-start gap-2 rounded-xl border ${item.border} px-5 py-4 w-44 text-left overflow-hidden transition-colors`}
                    style={{ background: "rgba(17,17,17,0.88)" }}
                  >
                    <span className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)" }} />
                    <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                      <Icon name={item.icon as "Users"} size={16} className={item.color} fallback="Circle" />
                    </div>
                    <span className="text-white text-sm font-semibold leading-tight">{item.label}</span>
                    <span className={`text-xs ${item.color} opacity-75`}>{item.desc}</span>
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => setShowMenu(false)}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors mt-1"
              >
                ← Назад
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
