import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { useClickSound } from "@/hooks/useClickSound"

export function HeroSection() {
  const navigate = useNavigate()
  const playSound = useClickSound()

  const handleNav = (path: string) => {
    playSound()
    navigate(path)
  }

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
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <motion.div
          whileHover={{ scale: 1.07, boxShadow: "0 0 24px rgba(139,92,246,0.45)" }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          <Button
            className="rounded-full bg-violet-600 px-8 py-3 hover:bg-violet-700 text-white text-base"
            onClick={() => handleNav("/city")}
          >
            Перейти к Сайту <Icon name="ArrowUpRight" size={18} className="ml-2" />
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          <Button
            variant="outline"
            className="rounded-full border-gray-700 bg-transparent text-white hover:bg-gray-800"
            onClick={() => handleNav("/about")}
          >
            <Icon name="BookOpen" size={16} className="mr-2 text-violet-400" /> Описание
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
