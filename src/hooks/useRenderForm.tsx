import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export interface FieldDefinition<T> {
  key: keyof T
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  pattern?: string
  maxLength?: number
}

/**
 * Hook para crear un componente formulario reutilizable.
 * RenderFormComponent recibe un item (puede ser null para creación)
 * y una función onSubmit para manejar el envío.
 */
export function useRenderForm<T>(
  fields: FieldDefinition<T>[],
  defaultOnSubmit: (data: T) => void
) {
  function RenderFormComponent({
    item,
    onSubmit,
  }: {
    item: T | null
    onSubmit: (data: T) => void
  }) {
    const [formData, setFormData] = React.useState<T>(item || ({} as T))

    const handleChange = (key: keyof T, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }))
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(formData)
    }

    return (
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {fields.map((field) => (
          <div key={String(field.key)} className="flex flex-col">
            <Label htmlFor={String(field.key)} className="mb-1">
              {field.label}
            </Label>
            <Input
              id={String(field.key)}
              type={field.type || 'text'}
              value={(formData[field.key] as unknown as string) || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              maxLength={field.maxLength}
              pattern={field.pattern}
              className="input-class"
            />
          </div>
        ))}
        <Button type="submit" className="button-class">
          Submit
        </Button>
      </form>
    )
  }

  const renderForm = (item: T | null, onSubmit?: (data: T) => void) => {
    return <RenderFormComponent item={item} onSubmit={onSubmit || defaultOnSubmit} />
  }

  return { renderForm }
}