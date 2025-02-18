'use client'

import { Engine } from "tsparticles-engine"
import { useCallback } from "react"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"

export default function ParticlesComponent() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          image: "url(assets/images/background-2.png)",
          position: "50% 50%",
          repeat: "no-repeat",
          size: "cover"
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: false,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 2,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#fefefe",
          },
          links: {
            color: "#fefefe",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: .5,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: .1, max: .3 },
          },
        },
        detectRetina: true,
      }}
    />
  )
}
