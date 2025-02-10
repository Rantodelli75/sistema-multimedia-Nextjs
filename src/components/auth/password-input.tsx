import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from 'lucide-react'
import { PasswordInputProps } from "./types"

export function PasswordInput({ id, name, showPassword, setShowPassword, placeholder }: PasswordInputProps) {
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        id={id}
        name={name}
        placeholder={placeholder}
        required
        maxLength={128}
        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&#+\-_<>.,;:()[\]{}|/\\~^]{8,}$"
        title="La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número."
        className="bg-white/20 focus:ring-0 focus:outline-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] border-none text-white placeholder:text-white/60 backdrop-blur-xl rounded-xl pr-10"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 px-2 flex items-center text-white/60 hover:text-white/80"
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}
