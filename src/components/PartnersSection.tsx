import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const items = [
  { name: "ChichWaka", icon: "Server" },
  { name: "Xazbik_", icon: "Crown" },
  { name: "Der1zon", icon: "Sword" },
  { name: "Хазбиково", icon: "Building2" },
  { name: "Xaz&Der1", icon: "Users" },
  { name: "Minecraft", icon: "Gamepad2" },
]

export function PartnersSection() {
  return (
    <section className="flex flex-wrap items-center justify-center gap-6 md:gap-10 px-4 py-8">
      {items.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-400 transition-colors"
        >
          <Icon name={item.icon as "Server"} size={16} fallback="Circle" />
          <span className="text-sm font-medium">{item.name}</span>
        </motion.div>
      ))}
    </section>
  )
}