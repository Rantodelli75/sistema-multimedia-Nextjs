import LoginForm from "./LoginForm"
import VideoBackground from "./VideoBackground"
import CircularWaveAnimation from "./CircularWaveAnimation"

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center md:justify-start overflow-hidden bg-gray-100">
      <VideoBackground />
      <div className="relative z-10 w-full md:w-auto md:ml-16">
        <CircularWaveAnimation>
          <LoginForm />
        </CircularWaveAnimation>
      </div>
    </main>
  )
}

