import { useSearchParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Header } from "@/components/Header"
import Icon from "@/components/ui/icon"
import { LiquidButton } from "@/components/LiquidButton"
import { useClickSound } from "@/hooks/useClickSound"

const tabs = [
  { id: "residents", label: "Жители города", icon: "Users" },
  { id: "sights", label: "Достопримечательности", icon: "MapPin" },
  { id: "emergency", label: "ЧС города", icon: "Shield" },
  { id: "rules", label: "Правила города", icon: "BookOpen" },
]

const residents = [
  { nick: "Xazbik_", role: "Мэр города" },
  { nick: "Der1zon", role: "Со-основатель" },
  { nick: "AstraLch1k", role: "Архитектор" },
  { nick: "nikita_2022", role: "Школьник" },
  { nick: "se1hhyt", role: "Житель" },
  { nick: "romdedd", role: "Житель" },
]

const residentsData: Record<string, {
  nick: string
  role: string
  description: string
  username: string
  skinOverride?: string
}> = {
  "xazbik_": {
    nick: "Xazbik_",
    role: "Мэр города",
    description: "Основатель и мэр города Хазбиково на сервере ChichVAKA. Стоял у истоков города с самого начала, организовывает городскую жизнь, принимает ключевые решения и следит за порядком.",
    username: "@lostyy43",
  },
  "der1zon": {
    nick: "Der1zon",
    role: "Со-основатель",
    description: "Со-основатель города и компании Xaz&Der1. Лучший друг мэра, знакомый ещё с первого сезона сервера. Ежедневно помогает развивать город и участвует во всех важных делах.",
    username: "@der1zon",
  },
  "astralch1k": {
    nick: "AstraLch1k",
    role: "Архитектор",
    description: "Главный архитектор города Хазбиково. Отвечает за строительство и внешний облик города, создаёт уникальные постройки и следит за архитектурным стилем.",
    username: "@Astrals",
  },
  "nikita_2022": {
    nick: "nikita_2022",
    role: "Школьник",
    description: "Юный житель города Хазбиково. Активно участвует в жизни города несмотря на юный возраст, помогает другим жителям и развивается вместе с городом.",
    username: "@nikita_22120",
  },
  "se1hhyt": {
    nick: "se1hhyt",
    role: "Житель",
    description: "Житель города Хазбиково. Вносит свой вклад в развитие города, соблюдает правила и активно участвует в жизни сообщества.",
    username: "@se1hhyt",
    skinOverride: "https://cdn.poehali.dev/projects/1ee73772-ef6a-4321-ba4f-0fb745c59f7f/bucket/ca2b246f-a546-4e8d-b293-202f1c180399.png",
  },
  "romdedd": {
    nick: "romdedd",
    role: "Житель",
    description: "Житель города Хазбиково. Вносит свой вклад в развитие города, соблюдает правила и активно участвует в жизни сообщества.",
    username: "@romdedd",
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
  "Мэр города": "border-violet-500/30",
  "Со-основатель": "border-violet-400/25",
  "Архитектор": "border-blue-500/30",
  "Школьник": "border-yellow-500/25",
  "Житель": "border-gray-500/25",
}

const emergency = [
  { nick: "reclomad", event: "Довёл мэра и был кикнут" },
  { nick: "—", event: "—" },
  { nick: "—", event: "—" },
]

type Sight = {
  title: string
  description: string
  image: string
  architect: string
  builders: string[]
}

const sights: Sight[] = [
  {
    title: "Москва-Сити",
    description: "Деловой квартал города Хазбиково. Высотные постройки и центр деловой жизни города. Здесь расположены основные организации и торговые площадки.",
    image: "https://cdn.poehali.dev/projects/1ee73772-ef6a-4321-ba4f-0fb745c59f7f/bucket/612a761a-ede8-4601-9488-461ec1e16fa4.jpg",
    architect: "Xazbik_",
    builders: ["Xazbik_", "Der1zon", "reclamad"],
  },
  {
    title: "Центральная площадь",
    description: "Главное место сбора жителей. Здесь проходят городские мероприятия, встречи и важные события города Хазбиково на сервере ChichVAKA.",
    image: "https://cdn.poehali.dev/projects/1ee73772-ef6a-4321-ba4f-0fb745c59f7f/bucket/8b98bcf8-6e76-49f1-a491-ef89619030d0.jpg",
    architect: "Xazbik_",
    builders: ["Xazbik_", "Der1zon"],
  },
  {
    title: "Суд",
    description: "Здание суда города Хазбиково — место разбирательства городских споров и конфликтов между жителями. Именно здесь мэр Xazbik_ выносит решения по особо важным делам.",
    image: "https://cdn.poehali.dev/projects/1ee73772-ef6a-4321-ba4f-0fb745c59f7f/bucket/b3f1cac8-0659-45c8-800c-43662d64afa0.jpg",
    architect: "Xazbik_",
    builders: ["Xazbik_", "Der1zon"],
  },
  {
    title: "Портал",
    description: "Главный портал города соединяет Хазбиково с другими измерениями сервера ChichVAKA. Уникальная постройка, украшенная светящимися камнями и являющаяся символом города.",
    image: "https://cdn.poehali.dev/projects/1ee73772-ef6a-4321-ba4f-0fb745c59f7f/bucket/9684b4bd-5caa-4a70-b4fb-d5b789c606a8.jpg",
    architect: "Интернет",
    builders: ["Xazbik_", "Забытый Игрок"],
  },
  {
    title: "Офис Xazbik_",
    description: "Личный офис мэра города Хазбиково — уютное рабочее пространство, украшенное деревянной мебелью, растениями и лампами. Здесь Xazbik_ принимает важные городские решения и встречает гостей.",
    image: "https://cdn.poehali.dev/projects/1ee73772-ef6a-4321-ba4f-0fb745c59f7f/bucket/7f76c6c3-d5fd-432e-98f7-201b660c4cc0.jpg",
    architect: "AstraLch1k",
    builders: ["Xazbik_", "Der1zon", "reclamad"],
  },
]

const rulesText = `📖 ПРАВИЛА ГОРОДА ХАЗБИКОВО:
┣ 1.Соблюдать правила сервера
┣ 2.1 Не гриферить
┣ 2.2 Не воровать
┣ 2.3 Не драться где попало
┣ 3.Хорошо себя вести
┣ 4.Помогать друг другу
┣ 5.1 Развивать город
┣ 5.2 Приглашать вступить других
┣ 6.1 Слушаться мэра Xazbik
┗ 6.2 Любить и уважать мэра

‼️На территории Москва-сити запрещается‼️:
┣ 1. Использование взрывоопасных предметов: ТНТ, кристаллов Края, зарядов ветра.🧨
┣ 2. Использование источников огня: огнива, оружия с зачарованием «Заговор огня», а также лука с зачарованием «Воспламенение».🔥
┣ 3. Разливание воды.💧
┣ 4. Применение булавы.🪓
┣ 5. Провоцирование драк и ведение боя в непредназначенных для этого местах.👊
┣ 6. Использование любых иных предметов, механизмов или действий, способных причинить вред игрокам или постройкам.⚙️

❗️ПРОСЬБА:
┣ 1.Соблюдать правила
┣ 2.1 Помогать городу и жителям
┣ 2.2 Развивать город
┣ 3.1 Быть не афк
┣ 3.2 Быть активным в тг города
┗ 4.Покупать лицензию для ларьков и магазинов

При проблемах или жалобах писать Хазбику — @Xazbik_`

/* ─── Модалка достопримечательности ─── */
function SightModal({ sight, onClose }: { sight: Sight | null; onClose: () => void }) {
  if (!sight) return null
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)" }} />
        <motion.div
          className="relative z-10 w-full max-w-xl rounded-3xl overflow-hidden glass-modal"
          initial={{ opacity: 0, scale: 0.88, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 32 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Фото */}
          <div className="relative h-52 overflow-hidden">
            <img src={sight.image} alt={sight.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(10,7,22,0.92) 100%)" }} />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 rounded-full p-1.5 text-white transition-all glass-btn"
            >
              <Icon name="X" size={15} fallback="Circle" />
            </button>
            <div className="absolute bottom-3 left-5">
              <h2 className="text-white font-bold text-xl" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, textShadow: "2px 2px 0 rgba(0,0,0,0.9)" }}>
                {sight.title}
              </h2>
            </div>
          </div>

          {/* Содержимое */}
          <div className="p-5 flex flex-col gap-3">
            <p className="text-gray-300 text-sm leading-relaxed">{sight.description}</p>

            <div className="rounded-2xl p-4 glass-card flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="Hammer" size={14} className="text-violet-400" fallback="Circle" />
                <span className="text-white text-sm font-semibold">Строительство</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Архитектор</span>
                <span className="text-blue-300 font-medium">{sight.architect}</span>
              </div>
              <div className="flex items-start justify-between text-sm gap-4">
                <span className="text-gray-500 flex-shrink-0">Строители</span>
                <span className="text-violet-300 font-medium text-right">{sight.builders.join(", ")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── Модалка жителя ─── */
function ResidentModal({ resident, onClose }: { resident: typeof residentsData[string] | null; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const [infoHover, setInfoHover] = useState(false)
  if (!resident) return null

  const skinUrl = resident.skinOverride || `https://mc-heads.net/body/${resident.nick}/200`
  const headUrl = `https://mc-heads.net/head/${resident.nick}/80`
  const color = roleColor[resident.role] || "text-gray-300"
  const badge = roleBg[resident.role] || "border-gray-500/25"

  const copyUsername = () => {
    navigator.clipboard.writeText(resident.username)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)" }} />
        <motion.div
          className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden glass-modal"
          initial={{ opacity: 0, scale: 0.88, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 32 }}
          transition={{ type: "spring", stiffness: 340, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative px-6 pt-6 pb-4 flex items-start gap-4"
            style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, transparent 60%)" }}>
            <div className="rounded-2xl overflow-hidden flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", width: 90, height: 120 }}>
              <img src={skinUrl} alt={resident.nick} className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLImageElement).src = headUrl }} />
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 mb-2">
                <img src={headUrl} alt="head" className="w-8 h-8 rounded-lg" />
                <h2 className="text-xl font-bold text-white">{resident.nick}</h2>
              </div>
              <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 mb-3 glass-card ${badge}`}>
                <Icon name="Star" size={12} className={color} fallback="Circle" />
                <span className={`text-xs font-medium ${color}`}>{resident.role}</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">{resident.description}</p>
            </div>
            <button onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors rounded-full p-1 glass-btn">
              <Icon name="X" size={16} fallback="Circle" />
            </button>
          </div>

          <div className="px-6 pb-6">
            {/* Информация с тултипом */}
            <div className="rounded-2xl p-4 glass-card">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative"
                  onMouseEnter={() => setInfoHover(true)}
                  onMouseLeave={() => setInfoHover(false)}
                >
                  <Icon name="Info" size={14} className="text-violet-400 cursor-help" />
                  <AnimatePresence>
                    {infoHover && (
                      <motion.div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs text-white whitespace-nowrap glass-purple pointer-events-none z-10"
                        initial={{ opacity: 0, y: 4, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                      >
                        Информация о игроке
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-white text-sm font-semibold">Информация</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Роль</span>
                <span className={color}>{resident.role}</span>
              </div>
            </div>

            {/* Юз с копированием */}
            <button
              onClick={copyUsername}
              className="mt-3 w-full rounded-2xl p-4 glass-card flex items-center justify-between group transition-all hover:border-violet-500/30"
            >
              <span className="text-gray-400 text-sm">Telegram</span>
              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      className="text-green-400 text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      скопировано
                    </motion.span>
                  ) : (
                    <motion.span
                      key="username"
                      className="text-violet-400 font-medium text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {resident.username}
                    </motion.span>
                  )}
                </AnimatePresence>
                <Icon name={copied ? "Check" : "Copy"} size={14} className={copied ? "text-green-400" : "text-gray-500 group-hover:text-violet-400"} fallback="Circle" />
              </div>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function CityPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const playSound = useClickSound()
  const activeTab = params.get("tab") || "residents"
  const [selectedResident, setSelectedResident] = useState<typeof residentsData[string] | null>(null)
  const [selectedSight, setSelectedSight] = useState<Sight | null>(null)

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #07050f 0%, #0a0616 50%, #060408 100%)" }}>
      <Header />

      {selectedResident && (
        <ResidentModal resident={selectedResident} onClose={() => setSelectedResident(null)} />
      )}
      {selectedSight && (
        <SightModal sight={selectedSight} onClose={() => setSelectedSight(null)} />
      )}

      <section className="max-w-5xl mx-auto px-4 py-10">
        <LiquidButton
          variant="ghost"
          onClick={() => { playSound(); navigate(-1) }}
          glowColor="rgba(139,92,246,0.2)"
          className="mb-6 -ml-2 text-gray-400 hover:text-white"
        >
          <Icon name="ArrowLeft" size={16} /> Назад
        </LiquidButton>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-white mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(14px, 3vw, 24px)", textShadow: "2px 2px 0 rgba(0,0,0,0.9), 0 0 20px rgba(139,92,246,0.3)" }}>
            Город Хазбиково
          </h1>
          <p className="text-gray-400 mb-8 text-sm">XazGames · by Xaz&amp;Der1</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {tabs.map((t) => (
            <motion.button
              key={t.id}
              onClick={() => { playSound(); navigate(`/city?tab=${t.id}`) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === t.id ? "text-white" : "text-gray-400 hover:text-white"
              }`}
              style={activeTab === t.id ? {
                background: "rgba(80,30,160,0.4)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(139,92,246,0.45)",
                boxShadow: "0 0 18px rgba(139,92,246,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              } : {
                background: "rgba(8,6,18,0.7)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}
            >
              <Icon name={t.icon as "Users"} size={14} fallback="Circle" />
              {t.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "residents" && (
            <motion.div key="residents"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              className="rounded-3xl overflow-hidden glass-dark"
            >
              <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <Icon name="Users" size={18} className="text-violet-400" /> Жители города Хазбиково
                </h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">#</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Ник</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Роль</th>
                  </tr>
                </thead>
                <tbody>
                  {residents.map((r, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ backgroundColor: "rgba(139,92,246,0.1)" }}
                      className="transition-colors cursor-pointer group"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      onClick={() => {
                        playSound()
                        const data = residentsData[r.nick.toLowerCase()]
                        if (data) setSelectedResident(data)
                      }}
                    >
                      <td className="px-6 py-4 text-gray-500 text-sm">{i + 1}</td>
                      <td className="px-6 py-4 text-white font-medium text-sm group-hover:text-violet-300 transition-colors duration-100">
                        {r.nick}
                        <Icon name="ArrowUpRight" size={12} className="inline ml-1 opacity-0 group-hover:opacity-60 transition-opacity" fallback="Circle" />
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: roleColor[r.role]?.replace("text-", "") || "#9ca3af" }}>
                        <span className={roleColor[r.role]}>{r.role}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {activeTab === "sights" && (
            <motion.div key="sights"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {sights.map((s, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 36px rgba(139,92,246,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { playSound(); setSelectedSight(s) }}
                  className="rounded-3xl overflow-hidden text-left glass-dark flex flex-col group cursor-pointer"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(139,92,246,0.3) 100%)" }} />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="rounded-full p-1.5 glass-btn">
                        <Icon name="ExternalLink" size={12} className="text-white" fallback="Circle" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="text-white font-bold text-sm mb-1">{s.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{s.description}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="Info" size={11} fallback="Circle" />
                      <span>Нажмите для подробностей</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {activeTab === "emergency" && (
            <motion.div key="emergency"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              className="rounded-3xl overflow-hidden glass-dark"
            >
              <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <Icon name="Shield" size={18} className="text-red-400" /> ЧС города Хазбиково
                </h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">#</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Ник игрока</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Событие</th>
                  </tr>
                </thead>
                <tbody>
                  {emergency.map((e, i) => (
                    <motion.tr key={i}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                      className="transition-colors"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    >
                      <td className="px-6 py-4 text-gray-500 text-sm">{i + 1}</td>
                      <td className="px-6 py-4 text-white font-medium text-sm">{e.nick}</td>
                      <td className="px-6 py-4 text-red-400 text-sm">{e.event}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {activeTab === "rules" && (
            <motion.div key="rules"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              className="rounded-3xl p-6 glass-dark"
            >
              <h2 className="text-white font-semibold flex items-center gap-2 mb-6">
                <Icon name="BookOpen" size={18} className="text-green-400" /> Правила города
              </h2>
              <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono rounded-2xl p-6"
                style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {rulesText}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer className="py-8 text-center text-sm text-gray-500 mt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
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
