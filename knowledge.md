# Project Knowledge Base

## Project Overview
- Next.js project bootstrapped with `create-next-app`
- Uses TypeScript
- Uses Supabase for backend
- Uses custom CSS modules and global CSS
- Uses Bricolage Grotesque font from Google Fonts
- Uses Tanstack Table for data display

## File Structure

### Core Application Files
- `src/app/page.tsx` - Main page component
- `src/app/layout.tsx` - Root layout with navigation and font configuration
- `src/styles/globals.css` - Global styles including variables and common components

### Components
- `src/components/Navigation/index.tsx` - Main navigation component
- `src/components/Navigation/Navigation.module.css` - Navigation-specific styles
- `src/components/Header.tsx` - Page header component

### API Integration
- `src/app/api/client/supabase.js` - Supabase client configuration

### User Features
- `src/app/users/[userId]/pages/page.tsx` - User profile page component
- `src/app/users/[userId]/pages/[userId].tsx` - Dynamic user page
- `src/pages/users/[userId]/feed.xml.tsx` - RSS feed generator for user links

### Configuration Files
- `.vscode/launch.json` - VS Code debugging configuration
- `package.json` - Project dependencies and scripts
- `.eslintrc.json` - ESLint configuration
- `.gitignore` - Git ignore rules
- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration

### Assets
- `src/app/favicon.ico` - Site favicon
- `src/app/fonts/` - Custom font files

## Styling Architecture
- CSS Modules for component-specific styles (Navigation)
- Global CSS for common styles and variables
- CSS custom properties for theming
- Responsive design with mobile-first approach
- Dark mode support via media queries

## Key Dependencies
- Next.js 14.2.14
- React 18
- @tanstack/react-table for table functionality
- Supabase for backend services
- TypeScript for type safety

## Features
- Floating navigation header with blur effect
- Dark/Light mode support
- RSS feed generation
- User-specific link management
- Bookmarking system
- Seven-day link history
- Responsive table layout
- Modern UI with consistent spacing and typography

## Component Structure
### Navigation
- Floating design with blur effect
- Mobile-responsive with hamburger menu
- Support for authenticated and public states
- Dark mode compatible
- CSS Module based styling
- Google authentication integration

### Header
- Consistent page headers
- Support for title, subtitle, and actions
- Maintains max-width constraint
- Dark mode compatible

### Table
- Powered by Tanstack Table
- Sortable columns
- Mobile-responsive
- Custom cell rendering
- Dark mode support
- Link truncation for better UX

## Authentication
- Google OAuth integration
- Protected routes
- User profile management
- Session handling

## Responsive Design
- Mobile-first approach
- Breakpoint at 768px for mobile menu
- Consistent spacing across viewports
- Adaptive layout for different screen sizes