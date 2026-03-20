import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

export function HeroSection() {
  const navigate = useNavigate()
  return (
    <section className="flex flex-col items-center justify-center px-4 pt-12 pb-8 text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] py-2 text-sm px-3">
        <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-400">ChichWaka</span>
        <span className="text-gray-300">Официальный сайт города Хазбиково</span>
        <Icon name="ArrowUpRight" size={16} className="text-gray-400" />
      </div>

      <h1 className="mb-4 max-w-3xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance">
        XazGames
      </h1>

      <p className="mb-8 max-w-xl text-gray-400 leading-relaxed">
        Добро пожаловать на сайт города <span className="text-violet-400 font-medium">'Хазбиково'</span>, здесь вы можете ознакомиться со всей информацией о городе, а также зайти на тест-сервер, созданный такими игроками как <span className="text-white font-medium">Xazbik_</span> и <span className="text-white font-medium">Der1zon</span> by Xaz&amp;Der1
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button
          className="rounded-full bg-violet-600 px-6 hover:bg-violet-700 text-white"
          onClick={() => navigate("/city")}
        >
          Перейти к Сайту <Icon name="ArrowUpRight" size={16} className="ml-2" />
        </Button>
        <Button
          variant="outline"
          className="rounded-full border-gray-700 bg-transparent text-white hover:bg-gray-800"
          onClick={() => navigate("/about")}
        >
          <Icon name="BookOpen" size={16} className="mr-2 text-violet-400" /> Описание
        </Button>
      </div>
    </section>
  )
}
