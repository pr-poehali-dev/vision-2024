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
    borderColor: "rgba(139,92,246,0.35)",
    bgColor: "rgba(20,10,45,0.7)",
  },
  {
    icon: "MapPin",
    label: "Достопримечательности",
    desc: "Места города",
    tab: "sights",
    color: "text-blue-400",
    glow: "rgba(59,130,246,0.45)",
    borderColor: "rgba(59,130,246,0.3)",
    bgColor: "rgba(10,20,50,0.7)",
  },
  {
    icon: "Shield",
    label: "ЧС города",
    desc: "Важные события",
    tab: "emergency",
    color: "text-red-400",
    glow: "rgba(239,68,68,0.45)",
    borderColor: "rgba(239,68,68,0.3)",
    bgColor: "rgba(40,8,8,0.7)",
  },
  {
    icon: "BookOpen",
    label: "Правила города",
    desc: "Правила жизни",
    tab: "rules",
    color: "text-green-400",
    glow: "rgba(34,197,94,0.45)",
    borderColor: "rgba(34,197,94,0.3)",
    bgColor: "rgba(8,35,15,0.7)",
  },
]

export function HeroSection() {
  const navigate = useNavigate()
  const playSound = useClickSound()
  const [phase, setPhase] = useState<"hero" | "split" | "menu">("hero")

  useEffect(() => {
    tryPlayWelcome()
  }, [])

  const handleEnter = () => {
    playSound()
    setPhase("split")
    setTimeout(() => setPhase("menu"), 600)
  }

  return (
    <section className="relative flex flex-col items-center justify-center px-4 pt-12 pb-8 text-center overflow-hidden min-h-[60vh]">

      {/* ФАЗА HERO — кнопка и описание улетают вверх */}
      <AnimatePresence>
        {phase === "hero" && (
          <motion.div
            key="hero-content"
            className="flex flex-col items-center w-full"
            exit={{ opacity: 0, y: -120 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 1, 1] }}
          >
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full py-2 text-sm px-3 glass"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="rounded-full px-2 py-0.5 text-xs font-medium text-violet-400"
                style={{ background: "rgba(139,92,246,0.18)" }}>XazGames</span>
              <span className="text-gray-300 text-xs">Официальный сайт города Хазбиково</span>
              <Icon name="ArrowUpRight" size={14} className="text-gray-400" />
            </motion.div>

            <motion.h1
              className="mb-4 max-w-3xl text-3xl md:text-5xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "clamp(18px, 4vw, 42px)",
                lineHeight: 1.4,
                textShadow: "3px 3px 0px rgba(0,0,0,0.9), 0 0 24px rgba(139,92,246,0.4)",
              }}
            >
              XazGames
            </motion.h1>

            <motion.p
              className="mb-8 max-w-xl text-gray-400 leading-relaxed text-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
            >
              Добро пожаловать на сайт города <span className="text-violet-400 font-medium">'Хазбиково'</span>, здесь вы можете ознакомиться со всей информацией о городе, а также зайти на тест-сервер, созданный такими игроками как <span className="text-white font-medium">Xazbik_</span> и <span className="text-white font-medium">Der1zon</span> by Xaz&amp;Der1
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
            >
              <motion.button
                onClick={handleEnter}
                whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(139,92,246,0.55)" }}
                whileTap={{ scale: 0.95 }}
                className="glass-btn-purple rounded-full px-8 py-3 text-sm flex items-center gap-2"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 11 }}
              >
                Перейти к Сайту <Icon name="ArrowUpRight" size={16} />
              </motion.button>
              <LiquidButton
                variant="outline"
                onClick={() => { playSound(); navigate("/about") }}
                glowColor="rgba(139,92,246,0.25)"
                className="rounded-full px-6 py-3"
              >
                <Icon name="BookOpen" size={16} className="text-violet-400" /> Описание
              </LiquidButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ФАЗА SPLIT — экран делится на две части */}
      <AnimatePresence>
        {phase === "split" && (
          <motion.div
            key="split-screen"
            className="fixed inset-0 z-40 flex overflow-hidden pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Верхняя половина уезжает вверх */}
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 glass-dark"
              style={{ borderBottom: "2px solid rgba(139,92,246,0.4)" }}
              initial={{ y: 0 }}
              animate={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
            {/* Нижняя половина уезжает вниз */}
            <motion.div
              className="absolute inset-x-0 bottom-0 h-1/2 glass-dark"
              style={{ borderTop: "2px solid rgba(139,92,246,0.4)" }}
              initial={{ y: 0 }}
              animate={{ y: "100%" }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ФАЗА MENU — выбор раздела */}
      <AnimatePresence>
        {phase === "menu" && (
          <motion.div
            key="menu-content"
            className="flex flex-col items-center gap-4 w-full"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 280, damping: 24 }}
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-xs"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              Выберите раздел
            </motion.p>

            <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
              {menuItems.map((item, i) => (
                <motion.button
                  key={item.tab}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.08, type: "spring", stiffness: 340, damping: 26 }}
                  onClick={() => { playSound(); navigate(`/city?tab=${item.tab}`) }}
                  whileHover={{ scale: 1.05, boxShadow: `0 0 32px 4px ${item.glow}` }}
                  whileTap={{ scale: 0.93 }}
                  className="relative flex flex-col items-start gap-2 rounded-2xl px-5 py-4 text-left overflow-hidden"
                  style={{
                    background: item.bgColor,
                    backdropFilter: "blur(28px) saturate(200%)",
                    WebkitBackdropFilter: "blur(28px) saturate(200%)",
                    border: `1px solid ${item.borderColor}`,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.3)",
                  }}
                >
                  <span className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)" }} />
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <Icon name={item.icon as "Users"} size={16} className={item.color} fallback="Circle" />
                  </div>
                  <span className="text-white text-xs font-semibold leading-tight">{item.label}</span>
                  <span className={`text-xs ${item.color} opacity-80`}>{item.desc}</span>
                </motion.button>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              onClick={() => setPhase("hero")}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-150 mt-1 glass-btn rounded-full px-4 py-2"
            >
              ← Назад
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
