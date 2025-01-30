'use client'

interface FormLoginProps {
  onSubmit: (formData: FormData) => Promise<void>
  error: string
  loading: boolean
}

export default function FormLogin({ onSubmit, error, loading }: FormLoginProps) {

  return (
    <form action={onSubmit}>
      {/* Tus campos de formulario */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        required /> <button type="submit"
          disabled={loading}
        >
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </form>
  )
}
