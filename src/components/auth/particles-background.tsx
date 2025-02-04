'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ParticlesComponent = dynamic(
  () => import('./particles-componet'),
  { ssr: false }
)

export default function ParticlesBg() {
  return (
    <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-pink-500 to-purple-800" />}>
      <ParticlesComponent />
    </Suspense>
  )
}