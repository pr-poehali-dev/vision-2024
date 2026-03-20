import { useRef, useState, useCallback, ReactNode } from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import { useClickSound } from "@/hooks/useClickSound"

interface LiquidButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "outline" | "ghost"
  glowColor?: string
}

export function LiquidButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  glowColor = "rgba(139,92,246,0.5)",
}: LiquidButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const playSound = useClickSound()
  const [hovered, setHovered] = useState(false)

  // Усиленная тяга: выше stiffness = быстрее следует, ниже damping = более тягучий
  const x = useSpring(0, { stiffness: 120, damping: 10 })
  const y = useSpring(0, { stiffness: 120, damping: 10 })

  const rotateX = useTransform(y, [-40, 40], [14, -14])
  const rotateY = useTransform(x, [-40, 40], [-14, 14])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    // Усиленный множитель тяги
    x.set((e.clientX - cx) * 0.85)
    y.set((e.clientY - cy) * 0.85)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }, [x, y])

  const handleClick = useCallback(() => {
    playSound()
    onClick?.()
  }, [playSound, onClick])

  const variantClasses = {
    primary: "bg-violet-600 hover:bg-violet-700 text-white border-transparent",
    outline: "bg-transparent border border-gray-700 text-white hover:bg-gray-800/60",
    ghost: "bg-transparent text-gray-400 hover:text-white border-transparent",
  }

  return (
    <motion.button
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => { x.set(0); y.set(0) }}
      onClick={handleClick}
      whileTap={{ scale: 0.92 }}
      animate={{ scale: hovered ? 1.06 : 1 }}
      transition={{ scale: { type: "spring", stiffness: 500, damping: 20 } }}
      className={`relative inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-colors duration-100 select-none ${variantClasses[variant]} ${className}`}
      style={{
        boxShadow: hovered ? `0 0 28px 4px ${glowColor}` : "none",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      } as React.CSSProperties}
    >
      {/* glass highlight */}
      <span
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-150"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 55%)",
          opacity: hovered ? 1 : 0,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}
