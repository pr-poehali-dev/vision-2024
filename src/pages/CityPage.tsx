import { useSearchParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
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

const emergency = [
  { nick: "reclomad", event: "Довёл мэра и был кикнут" },
  { nick: "—", event: "—" },
  { nick: "—", event: "—" },
]

const sights = [
  {
    title: "Москва-Сити",
    description: "Деловой квартал города Хазбиково. Высотные постройки и центр деловой жизни города. Здесь расположены основные организации и торговые площадки.",
    image: "/placeholder.jpg",
  },
  {
    title: "Центральная площадь",
    description: "Главное место сбора жителей. Здесь проходят городские мероприятия, встречи и важные события города Хазбиково на сервере ChichWaka.",
    image: "/placeholder.jpg",
  },
  {
    title: "Суд",
    description: "Здание суда города Хазбиково — место разбирательства городских споров и конфликтов между жителями. Именно здесь мэр Xazbik_ выносит решения по особо важным делам.",
    image: "/placeholder.jpg",
  },
  {
    title: "Портал",
    description: "Главный портал города соединяет Хазбиково с другими измерениями сервера ChichWaka. Уникальная постройка, украшенная светящимися камнями и являющаяся символом города.",
    image: "/placeholder.jpg",
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

export default function CityPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const playSound = useClickSound()
  const activeTab = params.get("tab") || "residents"

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />

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
          <p className="text-gray-400 mb-8 text-sm">Сервер ChichWaka · by Xaz&amp;Der1</p>
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
                  ? "bg-violet-600 text-white shadow-[0_0_14px_rgba(139,92,246,0.4)]"
                  : "bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#222]"
              }`}
            >
              <Icon name={t.icon as "Users"} size={14} fallback="Circle" />
              {t.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "residents" && (
            <motion.div key="residents" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="rounded-2xl bg-[#111] border border-[#222] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#222]">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <Icon name="Users" size={18} className="text-violet-400" /> Жители города Хазбиково
                </h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#222]">
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
                      whileHover={{ backgroundColor: "rgba(139,92,246,0.06)" }}
                      className="border-b border-[#1a1a1a] transition-colors cursor-default"
                    >
                      <td className="px-6 py-4 text-gray-500 text-sm">{i + 1}</td>
                      <td className="px-6 py-4 text-white font-medium text-sm">{r.nick}</td>
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
                    whileHover={{ scale: 1.015, boxShadow: "0 0 28px rgba(139,92,246,0.18)" }}
                    className={`rounded-2xl bg-[#111] border border-[#222] overflow-hidden flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"}`}
                  >
                    <img src={s.image} alt={s.title} className="w-full md:w-64 h-48 object-cover flex-shrink-0" />
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
            <motion.div key="emergency" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="rounded-2xl bg-[#111] border border-[#222] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#222]">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <Icon name="Shield" size={18} className="text-red-400" /> ЧС города Хазбиково
                </h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#222]">
                    <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">#</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Ник игрока</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-500 uppercase tracking-wider">Событие</th>
                  </tr>
                </thead>
                <tbody>
                  {emergency.map((e, i) => (
                    <motion.tr key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="border-b border-[#1a1a1a] hover:bg-[#161616] transition-colors">
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
            <motion.div key="rules" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="rounded-2xl bg-[#111] border border-[#222] p-6">
              <h2 className="text-white font-semibold flex items-center gap-2 mb-6">
                <Icon name="BookOpen" size={18} className="text-green-400" /> Правила города
              </h2>
              <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono bg-[#0d0d0d] rounded-xl p-6 border border-[#1e1e1e]">
                {rulesText}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
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