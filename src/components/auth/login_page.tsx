import LoginForm from "./LoginForm"
import VideoBackground from "./VideoBackground"
import CircularWaveAnimation from "./CircularWaveAnimation"

interface FormLoginProps {
    onSubmit: (formData: FormData) => Promise<void>
    error: string
    loading: boolean
  }
export default function LoginPageComponent({ onSubmit, error, loading }: FormLoginProps) {
  return (
    <main className="relative min-h-screen flex items-center justify-center md:justify-start overflow-hidden bg-gray-100">
      <VideoBackground />
      <div className="relative z-10 w-full md:w-auto md:ml-16">
        <CircularWaveAnimation>
          <LoginForm onSubmit={onSubmit}
      error={error}
      loading={loading}/>
        </CircularWaveAnimation>
      </div>
    </main>
  )
}

