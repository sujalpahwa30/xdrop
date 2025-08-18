# XDrop

>XDrop is a modern file management web app inspired by Dropbox, built with Next.js (App Router), TypeScript, Drizzle ORM, and Tailwind CSS. It supports file/folder operations, user authentication, and integrates with ImageKit for media handling.

## Features
- Upload, star, trash, and delete files
- Create and navigate folders
- User authentication (sign-in/sign-up)
- ImageKit integration for media uploads
- Responsive UI with Tailwind CSS and @heroui/theme

## Project Structure
- `app/` — Next.js App Router pages, layouts, API routes
- `components/` — Reusable UI components (atomic design)
- `drizzle/` — Database schema and migration scripts
- `config/` — Fonts and site configuration
- `schemas/` — Zod schemas for validation
- `styles/` — Global CSS
- `types/` — Shared TypeScript types

## Setup Instructions
1. **Clone the repository**
	```bash
	git clone https://github.com/sujalpahwa30/dropbox.git
	cd dropbox
	```

2. **Install dependencies**
	```bash
	npm install
	# or
	yarn install
	# or
	pnpm install
	# or
	bun install
	```

3. **Configure environment variables**
	- Copy `.env.example` to `.env.local` and fill in required values (database, ImageKit, etc.)

4. **Run database migrations**
	```bash
	# If using Drizzle ORM
	npm run migrate
	```

5. **Start the development server**
	```bash
	npm run dev
	# or yarn dev / pnpm dev / bun dev
	```
	Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Edit pages in `app/` (e.g., `app/page.tsx`, `app/dashboard/page.tsx`)
- API endpoints are in `app/api/` (e.g., `app/api/files/upload/route.ts`)
- UI components are in `components/` (e.g., `components/FileActionButtons.tsx`)
- Database schema: `drizzle/db/schema.ts`
- Global styles: `styles/globals.css`

## Developer Notes
- Uses Tailwind CSS with custom fonts and @heroui/theme plugin (`tailwind.config.js`)
- Drizzle ORM for database access and migrations
- Zod for schema validation (`schemas/`)
- All file actions (star, trash, delete) are isolated API routes under `app/api/files/[fileId]/`
- Folder creation: `app/api/folders/create/route.ts`
- ImageKit authentication: `app/api/imagekit-auth/route.ts`

## Deployment
- Recommended: Deploy on [Vercel](https://vercel.com/)
- See Next.js [deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)

## License
MIT
