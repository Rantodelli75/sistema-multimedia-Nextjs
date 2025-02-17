import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from 'lucide-react'

interface CustomInputProps {
  type: string
  id: string
  name: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  showPassword?: boolean
  togglePassword?: () => void
  required?: boolean
}

export function CustomInput({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  error,
  showPassword,
  togglePassword,
  required = true
}: CustomInputProps) {
  const isPassword = type === "password" && togglePassword;

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`bg-white/20 focus:ring-0 focus:outline-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.2)] border-none text-white placeholder:text-white/60 backdrop-blur-xl rounded-xl ${error ? 'border-red-500' : ''} ${isPassword ? 'pr-10' : ''}`}
      />
      {isPassword && togglePassword && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute inset-y-0 right-0 px-2 flex items-center text-white/60 hover:text-white/80"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      )}
    </div>
  )
}
