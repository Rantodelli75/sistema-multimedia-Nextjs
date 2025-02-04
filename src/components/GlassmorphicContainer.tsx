import type { ReactNode } from "react"

interface GlassmorphicContainerProps {
  children: ReactNode
  className?: string
}

export default function GlassmorphicContainer({ children, className = "" }: GlassmorphicContainerProps) {
  return (
    <div className={`bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  )
}

