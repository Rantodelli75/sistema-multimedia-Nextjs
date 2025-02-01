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
    <main className="relative min-h-screen flex items-center justify-center md:justify-start md:pl-[10vw] xl:pl-[15vw] 2xl:pl-[20vw] overflow-hidden bg-gray-100">
      <VideoBackground />
      <div className="relative z-10 w-full md:w-auto md:ml-16 xl:ml-24 2xl:ml-32 scale-100 xl:scale-110 2xl:scale-125">
        <CircularWaveAnimation>
          <LoginForm 
            onSubmit={onSubmit}
            error={error}
            loading={loading}
          />
        </CircularWaveAnimation>
      </div>
    </main>
  )
}

