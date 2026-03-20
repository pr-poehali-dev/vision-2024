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

const sights = [
  {
    title: "Москва-Сити",
    description: "Деловой квартал города Хазбиково. Высотные постройки и центр деловой жизни города. Здесь расположены основные организации и торговые площадки.",
    image: "https://cdn.poehali.dev/projects/1ee73772-ef6a-4321-ba4f-0fb745c59f7f/bucket/612a761a-ede8-4601-9488-461ec1e16fa4.jpg",
  },
  {
    title: "Центральная площадь",
    description: "Главное место сбора жителей. Здесь проходят городские мероприятия, встречи и важные события города Хазбиково на сервере ChichVAKA.",
    image: "https://cdn.poehali.dev/projects/1ee73772-ef6a-4321-ba4f-0fb745c59f7f/bucket/8b98bcf8-6e76-49f1-a491-ef89619030d0.jpg",
  },
  {
    title: "Суд",
    description: "Здание суда города Хазбиково — место разбирательства городских споров и конфликтов между жителями. Именно здесь мэр Xazbik_ выносит решения по особо важным делам.",
    image: "https://cdn.poehali.dev/projects/1ee73772-ef6a-4321-ba4f-0fb745c59f7f/bucket/b3f1cac8-0659-45c8-800c-43662d64afa0.jpg",
  },
  {
    title: "Портал",
    description: "Главный портал города соединяет Хазбиково с другими измерениями сервера ChichVAKA. Уникальная постройка, украшенная светящимися камнями и являющаяся символом города.",
    image: "https://cdn.poehali.dev/projects/1ee73772-ef6a-4321-ba4f-0fb745c59f7f/bucket/9684b4bd-5caa-4a70-b4fb-d5b789c606a8.jpg",
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

function ResidentModal({ resident, onClose }: { resident: typeof residentsData[string] | null, onClose: () => void }) {
  if (!resident) return null
  const skinUrl = resident.skinOverride || `https://mc-heads.net/body/${resident.nick}/200`
  const headUrl = `https://mc-heads.net/head/${resident.nick}/80`
  const color = roleColor[resident.role] || "text-gray-300"
  const badge = roleBg[resident.role] || "border-gray-500/25"

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} />
        <motion.div
          className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden"
          style={{
            background: "rgba(15,12,30,0.75)",
            backdropFilter: "blur(32px) saturate(200%)",
            WebkitBackdropFilter: "blur(32px) saturate(200%)",
            border: "1px solid rgba(139,92,246,0.2)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px rgba(139,92,246,0.1)",
          }}
          initial={{ opacity: 0, scale: 0.88, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 32 }}
          transition={{ type: "spring", stiffness: 340, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Шапка с градиентом */}
          <div className="relative px-6 pt-6 pb-4 flex items-start gap-4"
            style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, transparent 60%)" }}>
            <div className="rounded-2xl overflow-hidden flex-shrink-0"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                width: 90, height: 120
              }}>
              <img
                src={skinUrl}
                alt={resident.nick}
                className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLImageElement).src = headUrl }}
              />
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
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors rounded-full p-1"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <Icon name="X" size={16} fallback="Circle" />
            </button>
          </div>

          {/* Информация */}
          <div className="px-6 pb-6">
            <div className="rounded-2xl p-4 glass-card">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Info" size={14} className="text-violet-400" />
                <span className="text-white text-sm font-semibold">Информация</span>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Роль</span>
                  <span className={color}>{resident.role}</span>
                </div>
              </div>
            </div>

            {/* Юз */}
            <div className="mt-3 rounded-2xl p-4 glass-card">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Telegram</span>
                <span className="text-violet-400 font-medium text-sm">{resident.username}</span>
              </div>
            </div>
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

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #0a0a14 0%, #0d0a1a 50%, #0a0a0a 100%)" }}>
      <Header />

      {selectedResident && (
        <ResidentModal
          resident={selectedResident}
          onClose={() => setSelectedResident(null)}
        />
      )}

      <section className="max-w-5xl mx-auto px-4 py-10">
        <LiquidButton
          variant="ghost"
          onClick={() => { playSound(); navigate("/") }}
          glowColor="rgba(139,92,246,0.2)"
          className="mb-6 -ml-2 text-gray-400 hover:text-white"
        >
          <Icon name="ArrowLeft" size={16} /> На главную
        </LiquidButton>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-white mb-2">Город Хазбиково</h1>
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
                activeTab === t.id
                  ? "text-white shadow-[0_0_14px_rgba(139,92,246,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
              style={activeTab === t.id ? {
                background: "rgba(139,92,246,0.25)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(139,92,246,0.4)",
              } : {
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.07)",
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
            <motion.div key="residents" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              className="rounded-3xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
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
                      whileHover={{ backgroundColor: "rgba(139,92,246,0.08)" }}
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
                      <td className="px-6 py-4 text-violet-400 text-sm">{r.role}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {activeTab === "sights" && (
            <motion.div key="sights" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="flex flex-col gap-6">
              {sights.map((s, i) => {
                const reversed = i % 2 !== 0
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: reversed ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.015, boxShadow: "0 0 40px rgba(139,92,246,0.2)" }}
                    className={`rounded-3xl overflow-hidden flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"}`}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      backdropFilter: "blur(24px) saturate(180%)",
                      WebkitBackdropFilter: "blur(24px) saturate(180%)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    <img src={s.image} alt={s.title} className="w-full md:w-72 h-48 object-cover flex-shrink-0" />
                    <div className="p-6 flex flex-col justify-center">
                      <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {activeTab === "emergency" && (
            <motion.div key="emergency" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              className="rounded-3xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
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
                    <motion.tr key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
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
            <motion.div key="rules" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
              className="rounded-3xl p-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              <h2 className="text-white font-semibold flex items-center gap-2 mb-6">
                <Icon name="BookOpen" size={18} className="text-green-400" /> Правила города
              </h2>
              <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono rounded-2xl p-6"
                style={{
                  background: "rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
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
