# Aplicación de Autenticación Next.js

Esta es una aplicación web construida con Next.js que implementa un sistema de autenticación completo.

## Características

- Autenticación de usuarios
- Validación de formularios con Zod
- Diseño responsivo con Tailwind CSS
- Componentes UI personalizados con Shadcn/ui
- Gestión de estado del formulario con React Hook Form

## Páginas Disponibles

- `/login` - Página de inicio de sesión
- `/register` - Página de registro (en desarrollo)
- `/profile` - Página de perfil protegida
- `/` - Página principal

## Tecnologías Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui
- React Hook Form
- Zod
- Prisma
- NextAuth.js

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm o pnpm

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
```

2. Instala las dependencias:

```bash
pnpm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DATABASE_URL="tu-url-de-base-de-datos"
NEXTAUTH_SECRET="tu-secreto"
NEXTAUTH_URL="http://localhost:3000"
```

4. Ejecuta las migraciones de Prisma:

```bash
pnpm prisma migrate dev
```

5. Inicia el servidor de desarrollo:

```bash
pnpm dev
```

## Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Inicia la aplicación en modo producción
- `pnpm lint` - Ejecuta el linter

## Estructura del Proyecto

- `/src/app` - Páginas y rutas de la aplicación
- `/src/components` - Componentes reutilizables
- `/src/lib` - Utilidades y configuraciones
- `/src/actions` - Acciones del servidor
- `/prisma` - Esquema y migraciones de la base de datos

## Estado Actual

El proyecto está en desarrollo activo. Las características principales de autenticación están implementadas, pero algunas páginas y funcionalidades están en construcción.
