import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function Header() {
  const navigate = useNavigate()
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <XazLogo />
        <span className="text-lg font-semibold text-white">
          XazGames
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
          Главная
        </Link>
        <Link to="/city" className="text-sm text-gray-300 hover:text-white transition-colors">
          Жители
        </Link>
        <Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
          Политика
        </Link>
        <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white transition-colors">
          Discord
        </a>
      </nav>

      <Button
        variant="outline"
        className="rounded-full border-violet-500 text-violet-400 hover:bg-violet-500/10 hover:text-violet-300 bg-transparent"
        onClick={() => navigate("/city")}
      >
        Перейти к Сайту
      </Button>
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
