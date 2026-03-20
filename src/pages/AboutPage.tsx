import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const sections = [
  {
    title: "Вся Информация о Сайте",
    icon: "Globe",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    content: `Сайт был создан компанией Xaz&Der1 специально для города 'Хазбиково' на сервере ChichWaka. Наш сайт создан, чтобы познакомить вас с уникальными чертами города.

На сайте можно найти: Жители города, Тест-сервер города, Правила города, Достопримечательности города и многое другое.

Путешествуйте с удовольствием — Хазбиково ждёт вас!`,
  },
  {
    title: "Для чего был Создан сайт?",
    icon: "Info",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    content: `Сайт был создан в исключительно информационных целях — для обеспечения открытого и оперативного доступа жителей, гостей города и представителей организаций к достоверным сведениям о деятельности органов местного самоуправления, городских программах, мероприятиях и услугах.

Никого и ничего мы не хотели задеть или оскорбить, все совпадения случайны.`,
  },
  {
    title: "О компании Xaz&Der1",
    icon: "Users",
    color: "text-green-400",
    bg: "bg-green-500/10",
    content: `Компания Xaz&Der1 начала своё производство совсем не давно. В компанию входят игроки ChichWaka Xazbik_ и Der1zon. О данных игроках есть информация: Они лучшие друзья и всегда на сервере и не только играли вместе.

Всё начиналось ещё очень давно, как игрок Xazbik_ создал свой город и нашёл друга Der1zon, с которым был знаком ещё с первого сезона сервера. Они начали общаться в тг и дс ежедневно, каждый день они улучшали свой город.

Впервые создали свой Дискорд-сервер 10.02.2026. После чего создали свой первый Тест-сервер в майнкрафт 01.03.2026. А уже 20.03.2026 года игроку Xazbik_ пришла идея создать сайт города.

Вот так и появился данный сайт от компании Xaz&Der1`,
  },
]

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <section className="max-w-5xl mx-auto px-4 py-10">
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white mb-6 -ml-2"
          onClick={() => navigate("/")}
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" /> На главную
        </Button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-white mb-2">Описание</h1>
          <p className="text-gray-400 mb-10 text-sm">XazGames · by Xaz&amp;Der1</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-[#111] border border-[#222] p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={s.icon as "Globe"} size={18} className={s.color} fallback="Circle" />
                </div>
                <h2 className="text-white font-bold text-base">{s.title}</h2>
              </div>
              <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-line flex-1">
                {s.content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-gray-500 border-t border-[#1a1a1a] mt-8">
        <p className="font-medium text-gray-400 mb-1">XAZBGAMES.RU</p>
        <p>© 2026 Хазбиково. Все права защищены.</p>
        <div className="flex items-center justify-center gap-6 mt-3">
          <a href="/" className="hover:text-gray-300 transition-colors">Главная</a>
          <a href="/city?tab=residents" className="hover:text-gray-300 transition-colors">Жители</a>
          <a href="/about" className="hover:text-gray-300 transition-colors">Политика</a>
          <a href="https://discord.gg/3gXZNwFr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Discord</a>
        </div>
      </footer>
    </main>
  )
}