import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

const items = [
  {
    name: "ChichVAKA",
    icon: "Server",
    content: "ChichVAKA — это сервер ванила+ режим с элементами экономики и РП, созданный для контента на стримах и зрителей стримеров.\n\nНа нём есть много разных людей, государств и городов. Самый лучший рп-сервер по мнению Xazbik_.",
  },
  {
    name: "Xaz&Der1",
    icon: "Users",
    content: "Компания Xaz&Der1 начала своё производство совсем не давно. В компанию входят игроки ChichVAKA Xazbik_ и Der1zon. О данных игроках есть информация: Они лучшие друзья и всегда на сервере и не только играли вместе.\n\nВсё начиналось ещё очень давно, как игрок Xazbik_ создал свой город и нашёл друга Der1zon, с которым был знаком ещё с первого сезона сервера. Они начали общаться в тг и дс ежедневно, каждый день они улучшали свой город.\n\nВпервые создали свой Дискорд-сервер 10.02.2026. После чего создали свой первый Тест-сервер в майнкрафт 01.03.2026. А уже 20.03.2026 года игроку Xazbik_ пришла идея создать сайт города.\n\nВот так и появился данный сайт от компании Xaz&Der1.",
  },
  {
    name: "Minecraft",
    icon: "Gamepad2",
    content: "Minecraft — игра-песочница с процедурно генерируемым миром из блоков. Здесь нет фиксированного сюжета или строгих правил. Каждый новый мир уникален: горы, леса, океаны, пещеры и даже подземные крепости появляются случайно.",
  },
]

export function PartnersSection() {
  const [active, setActive] = useState<typeof items[0] | null>(null)

  return (
    <>
      <section className="flex flex-wrap items-center justify-center gap-6 md:gap-10 px-4 py-8">
        {items.map((item, i) => (
          <motion.button
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
            onClick={() => setActive(item)}
            className="flex items-center gap-2 text-gray-500 hover:text-violet-400 transition-colors cursor-pointer"
          >
            <Icon name={item.icon as "Server"} size={16} fallback="Circle" />
            <span className="text-sm font-medium">{item.name}</span>
          </motion.button>
        ))}
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              className="max-w-lg w-full rounded-3xl p-6"
              style={{
                background: "rgba(10,8,22,0.85)",
                backdropFilter: "blur(32px) saturate(200%)",
                WebkitBackdropFilter: "blur(32px) saturate(200%)",
                border: "1px solid rgba(139,92,246,0.18)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Icon name={active.icon as "Server"} size={18} className="text-violet-400" fallback="Circle" />
                </div>
                <h3 className="text-white font-bold text-lg">{active.name}</h3>
                <button onClick={() => setActive(null)} className="ml-auto text-gray-500 hover:text-white transition-colors">
                  <Icon name="X" size={18} fallback="XCircle" />
                </button>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{active.content}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}