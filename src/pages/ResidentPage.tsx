import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Header } from "@/components/Header"
import { LiquidButton } from "@/components/LiquidButton"
import Icon from "@/components/ui/icon"
import { useClickSound } from "@/hooks/useClickSound"

export const residentsData: Record<string, {
  nick: string
  role: string
  description: string
}> = {
  "xazbik_": {
    nick: "Xazbik_",
    role: "Мэр города",
    description: "Основатель и мэр города Хазбиково на сервере ChichWaka. Стоял у истоков города с самого начала, организовывает городскую жизнь, принимает ключевые решения и следит за порядком.",
  },
  "der1zon": {
    nick: "Der1zon",
    role: "Со-основатель",
    description: "Со-основатель города и компании Xaz&Der1. Лучший друг мэра, знакомый ещё с первого сезона сервера. Ежедневно помогает развивать город и участвует во всех важных делах.",
  },
  "astralch1k": {
    nick: "AstraLch1k",
    role: "Архитектор",
    description: "Главный архитектор города Хазбиково. Отвечает за строительство и внешний облик города, создаёт уникальные постройки и следит за архитектурным стилем.",
  },
  "nikita_2022": {
    nick: "nikita_2022",
    role: "Школьник",
    description: "Юный житель города Хазбиково. Активно участвует в жизни города несмотря на юный возраст, помогает другим жителям и развивается вместе с городом.",
  },
  "se1hhyt": {
    nick: "se1hhyt",
    role: "Житель",
    description: "Житель города Хазбиково. Вносит свой вклад в развитие города, соблюдает правила и активно участвует в жизни сообщества.",
  },
  "romdedd": {
    nick: "romdedd",
    role: "Житель",
    description: "Житель города Хазбиково. Вносит свой вклад в развитие города, соблюдает правила и активно участвует в жизни сообщества.",
  },
}

const roleColor: Record<string, string> = {
  "Мэр города": "text-violet-400",
  "Со-основатель": "text-violet-300",
  "Архитектор": "text-blue-400",
  "Школьник": "text-yellow-400",
  "Житель": "text-gray-300",
}

const roleBg: Record<string, string> = {
  "Мэр города": "bg-violet-500/15 border-violet-500/30",
  "Со-основатель": "bg-violet-400/10 border-violet-400/25",
  "Архитектор": "bg-blue-500/15 border-blue-500/30",
  "Школьник": "bg-yellow-500/10 border-yellow-500/25",
  "Житель": "bg-gray-500/10 border-gray-500/25",
}

export default function ResidentPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const playSound = useClickSound()
  const resident = id ? residentsData[id.toLowerCase()] : null

  if (!resident) {
    return (
      <main className="min-h-screen bg-[#0a0a0a]">
        <Header />
        <section className="flex flex-col items-center justify-center py-32 gap-4">
          <p className="text-gray-400 text-lg">Житель не найден</p>
          <LiquidButton variant="primary" onClick={() => { playSound(); navigate("/city?tab=residents") }}>
            К жителям
          </LiquidButton>
        </section>
      </main>
    )
  }

  const skinUrl = `https://mc-heads.net/body/${resident.nick}/200`
  const headUrl = `https://mc-heads.net/head/${resident.nick}/80`
  const color = roleColor[resident.role] || "text-gray-300"
  const badge = roleBg[resident.role] || "bg-gray-500/10 border-gray-500/25"

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <section className="max-w-4xl mx-auto px-4 py-10">
        <LiquidButton
          variant="ghost"
          onClick={() => { playSound(); navigate("/city?tab=residents") }}
          glowColor="rgba(139,92,246,0.2)"
          className="mb-8 -ml-2 text-gray-400 hover:text-white"
        >
          <Icon name="ArrowLeft" size={16} /> К жителям
        </LiquidButton>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col md:flex-row gap-8 items-start"
        >
          {/* Скин игрока */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center gap-3 flex-shrink-0"
          >
            <div className="rounded-2xl bg-[#111] border border-[#222] p-4 flex items-center justify-center"
              style={{ minWidth: 160, minHeight: 220 }}>
              <img
                src={skinUrl}
                alt={`Скин ${resident.nick}`}
                className="h-48 object-contain drop-shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = headUrl
                }}
              />
            </div>
          </motion.div>

          {/* Информация */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col gap-5 flex-1"
          >
            <div className="flex items-center gap-3">
              <img src={headUrl} alt="head" className="w-10 h-10 rounded-lg" />
              <div>
                <h1 className="text-2xl font-bold text-white">{resident.nick}</h1>
                <span className={`text-sm ${color}`}>Игрок ChichWaka</span>
              </div>
            </div>

            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 w-fit ${badge}`}>
              <Icon name="Star" size={14} className={color} fallback="Circle" />
              <span className={`text-sm font-medium ${color}`}>{resident.role}</span>
            </div>

            <div className="rounded-2xl bg-[#111] border border-[#222] p-5">
              <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Icon name="User" size={16} className="text-violet-400" /> О жителе
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">{resident.description}</p>
            </div>

            <div className="rounded-2xl bg-[#111] border border-[#222] p-5">
              <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Icon name="Info" size={16} className="text-violet-400" /> Информация
              </h2>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Ник</span>
                  <span className="text-white font-mono">{resident.nick}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Роль</span>
                  <span className={color}>{resident.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Город</span>
                  <span className="text-gray-300">Хазбиково</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Сервер</span>
                  <span className="text-gray-300">ChichWaka</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <footer className="py-8 text-center text-sm text-gray-500 border-t border-[#1a1a1a] mt-8">
        <p className="font-medium text-gray-400 mb-1">XAZBGAMES.RU</p>
        <p>© 2026 Хазбиково. Все права защищены.</p>
        <div className="flex items-center justify-center gap-6 mt-3">
          <a href="/" className="hover:text-gray-300 transition-colors">Главная</a>
          <a href="/city?tab=residents" className="hover:text-gray-300 transition-colors">Жители</a>
          <a href="/about" className="hover:text-gray-300 transition-colors">Описание</a>
          <a href="https://discord.gg/3gXZNwFr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Discord</a>
        </div>
      </footer>
    </main>
  )
}
