import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Icon from "@/components/ui/icon"
import { LiquidButton } from "@/components/LiquidButton"
import { tryPlayWelcome, useClickSound } from "@/hooks/useClickSound"

const menuItems = [
  {
    icon: "Users",
    label: "Жители города",
    desc: "Список жителей",
    tab: "residents",
    color: "text-violet-400",
    glow: "rgba(139,92,246,0.45)",
    borderColor: "rgba(139,92,246,0.3)",
    bgColor: "rgba(139,92,246,0.08)",
  },
  {
    icon: "MapPin",
    label: "Достопримечательности",
    desc: "Места города",
    tab: "sights",
    color: "text-blue-400",
    glow: "rgba(59,130,246,0.45)",
    borderColor: "rgba(59,130,246,0.3)",
    bgColor: "rgba(59,130,246,0.08)",
  },
  {
    icon: "Shield",
    label: "ЧС города",
    desc: "Важные события",
    tab: "emergency",
    color: "text-red-400",
    glow: "rgba(239,68,68,0.45)",
    borderColor: "rgba(239,68,68,0.3)",
    bgColor: "rgba(239,68,68,0.08)",
  },
  {
    icon: "BookOpen",
    label: "Правила города",
    desc: "Правила жизни",
    tab: "rules",
    color: "text-green-400",
    glow: "rgba(34,197,94,0.45)",
    borderColor: "rgba(34,197,94,0.3)",
    bgColor: "rgba(34,197,94,0.08)",
  },
]

export function HeroSection() {
  const navigate = useNavigate()
  const playSound = useClickSound()
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    tryPlayWelcome()
  }, [])

  return (
    <section className="flex flex-col items-center justify-center px-4 pt-12 pb-8 text-center overflow-hidden">
      {/* Верхний контент — уезжает вниз при showMenu */}
      <AnimatePresence>
        {!showMenu && (
          <motion.div
            key="hero-top"
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full py-2 text-sm px-3"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span className="rounded-full px-2 py-0.5 text-xs font-medium text-violet-400"
                style={{ background: "rgba(139,92,246,0.15)" }}>XazGames</span>
              <span className="text-gray-300">Официальный сайт города Хазбиково</span>
              <Icon name="ArrowUpRight" size={16} className="text-gray-400" />
            </motion.div>

            <h1 className="mb-4 max-w-3xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance">
              ChichVAKA Xaz&amp;Der1 Minecraft
            </h1>

            <p className="mb-8 max-w-xl text-gray-400 leading-relaxed">
              Добро пожаловать на сайт города <span className="text-violet-400 font-medium">'Хазбиково'</span>, здесь вы можете ознакомиться со всей информацией о городе, а также зайти на тест-сервер, созданный такими игроками как <span className="text-white font-medium">Xazbik_</span> и <span className="text-white font-medium">Der1zon</span> by Xaz&amp;Der1
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Кнопки */}
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
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <LiquidButton
                variant="primary"
                onClick={() => { playSound(); setShowMenu(true) }}
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
              initial={{ opacity: 0, scale: 0.88, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: -20 }}
              transition={{ duration: 0.38, type: "spring", stiffness: 300, damping: 26 }}
              className="flex flex-col items-center gap-4 mt-2"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-gray-400 text-sm"
              >
                Выберите раздел
              </motion.p>
              <div className="grid grid-cols-2 gap-3">
                {menuItems.map((item, i) => (
                  <motion.button
                    key={item.tab}
                    initial={{ opacity: 0, scale: 0.82, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, type: "spring", stiffness: 360, damping: 26 }}
                    onClick={() => { playSound(); navigate(`/city?tab=${item.tab}`) }}
                    whileHover={{ scale: 1.06, boxShadow: `0 0 28px 2px ${item.glow}` }}
                    whileTap={{ scale: 0.92 }}
                    className="relative flex flex-col items-start gap-2 rounded-2xl px-5 py-4 w-56 text-left overflow-hidden transition-all"
                    style={{
                      background: item.bgColor,
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      border: `1px solid ${item.borderColor}`,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
                    }}
                  >
                    <span
                      className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)" }}
                    />
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <Icon name={item.icon as "Users"} size={16} className={item.color} fallback="Circle" />
                    </div>
                    <span className="text-white text-sm font-semibold leading-tight">{item.label}</span>
                    <span className={`text-xs ${item.color} opacity-80`}>{item.desc}</span>
                  </motion.button>
                ))}
              </div>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                onClick={() => setShowMenu(false)}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-150 mt-1"
              >
                ← Назад
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
