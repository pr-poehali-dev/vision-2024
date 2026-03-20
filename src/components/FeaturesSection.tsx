import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const features = [
  {
    icon: "Users",
    title: "Жители города",
    description: "Познакомьтесь с жителями города Хазбиково — игроками сервера ChichWaka.",
    tab: "residents",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: "MapPin",
    title: "Достопримечательности",
    description: "Уникальные места и постройки города — архитектура, которой гордятся жители.",
    tab: "sights",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: "Shield",
    title: "ЧС города",
    description: "Информация о чрезвычайных ситуациях и важные контакты для жителей.",
    tab: "emergency",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    icon: "BookOpen",
    title: "Правила города",
    description: "Правила проживания и поведения в городе Хазбиково. Обязательны для всех.",
    tab: "rules",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
]

export function FeaturesSection() {
  const navigate = useNavigate()
  return (
    <section className="px-4 md:px-8 py-8">
      <h2 className="text-center text-2xl font-bold text-white mb-2">Разделы города</h2>
      <p className="text-center text-gray-400 mb-8 text-sm">Выберите раздел для ознакомления</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.tab}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            className="rounded-2xl bg-[#111] border border-[#222] p-5 flex flex-col gap-3 cursor-pointer hover:border-violet-500/40 hover:bg-[#161616] transition-colors"
            onClick={() => navigate(`/city?tab=${f.tab}`)}
          >
            <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center`}>
              <Icon name={f.icon as "Users"} size={20} className={f.color} fallback="Circle" />
            </div>
            <h3 className="text-white font-semibold text-sm">{f.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{f.description}</p>
            <div className={`text-xs font-medium ${f.color} flex items-center gap-1 mt-auto`}>
              Открыть <Icon name="ArrowRight" size={12} fallback="ArrowUpRight" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}