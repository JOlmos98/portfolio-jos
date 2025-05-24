
# Project Portfolio

A professional and fully functional portfolio built with Next.js 15, TypeScript, Tailwind CSS, and Supabase. Includes authentication, email verification, admin panel, multi-language support, and automated testing.

![Demo](https://i.imgur.com/omXb83c.png)

The Vercel link is [here](https://portfolio-jos-git-main-jesus-projects-8116cd3a.vercel.app).

## Getting Started

First, install the dependencies:

```bash
yarn install
# or npm install
```

Then, create your own .env file and add the following variables:

```bash
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
```

Then, run the development server:

```bash
npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Inter, a custom Google Font.

## Features

* User authentication with NextAuth and Supabase
* Secure password handling with bcrypt
* Email verification system using Nodemailer and JWT
* Automatic deletion of unverified users after 24 hours
* Admin panel to manage user-submitted articles
* Like system with visual feedback based on user status
* Internationalization with next-i18next
* Smooth animations using Framer Motion
* Form handling and validation with React Hook Form and Zod
* CI/CD pipeline with GitHub Actions and performance monitoring via Lighthouse
* Testing with Vitest and React Testing Library

## Deployment

This project is deployed using Vercel. To deploy your own version, fork the repository and connect it to Vercel.

Make sure to add the required environment variables in your Vercel dashboard.

## Testing

To run tests locally:

```bash
yarn run test
```

This project uses:

* Vitest for unit testing
* React Testing Library for component testing
