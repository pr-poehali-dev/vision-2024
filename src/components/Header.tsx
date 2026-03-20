import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useClickSound } from "@/hooks/useClickSound"
import { LiquidButton } from "@/components/LiquidButton"

export function Header() {
  const navigate = useNavigate()
  const playSound = useClickSound()

  const handleNav = (path: string) => {
    playSound()
    navigate(path)
  }

  return (
    <header className="flex items-center justify-between px-8 py-4">
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => handleNav("/")}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
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
              className="text-sm text-gray-300 hover:text-white transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-violet-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </motion.div>
        ))}
        <motion.a
          href="https://discord.gg/3gXZNwFr"
          target="_blank"
          rel="noopener noreferrer"
          onClick={playSound}
          className="text-sm text-gray-300 hover:text-white transition-colors relative group"
          whileHover={{ y: -1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          Discord
          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-violet-400 group-hover:w-full transition-all duration-300" />
        </motion.a>
      </nav>

      <LiquidButton
        variant="outline"
        onClick={() => { playSound(); window.open("https://discord.gg/3gXZNwFr", "_blank") }}
        glowColor="rgba(139,92,246,0.35)"
        className="rounded-full border-violet-500 text-violet-400 hover:text-violet-300 px-4 py-2 text-sm"
      >
        Discord
      </LiquidButton>
    </header>
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