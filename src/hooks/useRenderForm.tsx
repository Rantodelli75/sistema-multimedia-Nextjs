"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export interface FieldDefinition<T> {
  key: keyof T
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  pattern?: string
  maxLength?: number
  multiline?: boolean
  options?: string[]
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
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        {fields.map((field) => (
          <div key={String(field.key)} className="space-y-2">
            <Label 
              htmlFor={String(field.key)}
              className="text-sm font-medium text-gray-700"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            
            {field.type === 'select' && field.options ? (
              <select
                id={String(field.key)}
                value={(formData[field.key] as unknown as string) || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                required={field.required}
                className={cn(
                  "w-full rounded-md border border-input bg-background px-3 py-2",
                  "focus:ring-2 focus:ring-nightgroove-primary focus:border-transparent",
                  "text-sm text-black"
                )}
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.multiline ? (
              <Textarea
                id={String(field.key)}
                value={(formData[field.key] as unknown as string) || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                maxLength={field.maxLength}
                className={cn(
                  "min-h-[100px] border border-input bg-background",
                  "focus:ring-2 focus:ring-nightgroove-primary focus:border-transparent text-black"
                )}
              />
            ) : (
              <Input
                id={String(field.key)}
                type={field.type || 'text'}
                value={(formData[field.key] as unknown as string) || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                maxLength={field.maxLength}
                pattern={field.pattern}
                className={cn(
                  "border border-input bg-background",
                  "focus:ring-2 focus:ring-nightgroove-primary focus:border-transparent, text-black"
                )}
              />
            )}
          </div>
        ))}
        <Button 
          type="submit"
          className="w-full bg-nightgroove-primary hover:bg-nightgroove-secondary text-white"
        >
          {item ? 'Update' : 'Create'}
        </Button>
      </form>
    )
  }

  const renderForm = (item: T | null, onSubmit?: (data: T) => void) => {
    return <RenderFormComponent item={item} onSubmit={onSubmit || defaultOnSubmit} />
  }

  return { renderForm }
}