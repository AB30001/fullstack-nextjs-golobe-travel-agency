# Overview

Golobe Travel Agency is a full-stack Next.js 14 travel booking platform that enables users to search and book flights and hotels. The application features a modern, responsive UI built with Tailwind CSS and shadcn/ui components, with comprehensive user authentication, payment processing, and booking management capabilities.

The platform provides a complete travel booking experience including multi-city flight searches, hotel reservations, user reviews, favorite management, and integrated payment processing through Stripe. Built with performance and user experience in mind, it includes features like SSR/SSG optimization, real-time search, and session management.

# Recent Changes

**October 8, 2025 - Migrated from Vercel to Replit**
- Updated Next.js server configuration to run on port 5000 and bind to 0.0.0.0 for Replit compatibility
- Configured next.config.mjs to support Replit domains (**.replit.dev) for image hosting
- Migrated all environment variables to Replit Secrets for secure credential management
- Set up deployment configuration for Replit's autoscale platform
- Configured development workflow for Next.js dev server

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Rendering Strategy**
- Next.js 14 with App Router for server-side rendering and static generation
- React 18 with Server Components for optimal performance
- Client-side state management through Redux Toolkit for complex form states (flight search, hotel booking, passenger details)
- Hybrid rendering: Server components for initial page loads, client components for interactive features

**UI Component System**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui component library for pre-built, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom local-ui components for domain-specific functionality (date pickers, flight selectors, review systems)

**State Management Strategy**
- Redux Toolkit for global form state (flight search, hotel search, passenger information)
- React hooks and context for local component state
- Server-side session management through NextAuth
- Client-side storage (localStorage/sessionStorage) for user preferences and search history

**Form Handling**
- Server Actions for form submissions and mutations
- Client-side validation with custom validators
- Optimistic UI updates for better user experience
- File-based form state persistence for multi-step booking flows

## Backend Architecture

**API Layer**
- Next.js API Routes for serverless functions
- RESTful endpoints for CRUD operations
- Server Actions for form handling and mutations
- Middleware for authentication, session management, and request processing

**Authentication & Authorization**
- NextAuth v5 (Auth.js) for authentication
- Multiple authentication providers: Credentials, Google, Facebook, Apple
- Custom MongoDB adapter for session storage
- JWT-free session strategy using database sessions
- Role-based access control for protected routes

**Data Access Layer**
- Custom database utility functions for CRUD operations (createOperationDB, getOperationDB, deleteOperationDB, updateOperationDB)
- Mongoose ODM for MongoDB interactions
- Schema-based data validation
- Centralized error handling for database operations

**Business Logic**
- Flight pricing and availability calculations
- Hotel room pricing and availability management
- Multi-segment flight fare breakdowns
- Review rating aggregation algorithms
- Payment processing workflows

## Data Storage

**Database: MongoDB**
- Document-based NoSQL database for flexible schema design
- Collections for: Users, Sessions, Flights, Hotels, Bookings, Reviews, Payments
- Custom MongoDB adapter for NextAuth integration
- Indexing strategy for search performance optimization

**Data Models**
- User profiles with multiple emails and phone numbers
- Flight itineraries with multi-segment support
- Hotel bookings with room selection
- Payment methods and transaction history
- User favorites and search history
- Review and rating systems

**Caching Strategy**
- Next.js built-in caching for static and dynamic content
- Revalidation tags for cache invalidation
- Session storage for temporary data
- Browser storage for user preferences

## External Dependencies

**Payment Processing: Stripe**
- Stripe Elements for secure payment form handling
- Payment Intents API for payment processing
- Saved payment methods for returning customers
- Webhook integration for payment status updates
- Test mode support with demo card numbers

**Email Service: Mailjet**
- Transactional email delivery
- HTML email templates for confirmations and notifications
- Email verification workflows
- Newsletter subscription management

**Authentication Providers**
- Google OAuth for social login
- Facebook OAuth for social login
- Apple Sign-In for social login
- Credential-based authentication with bcrypt password hashing

**Third-party Libraries**
- date-fns & date-fns-tz for date/time handling
- react-datepicker for date selection UI
- html2canvas & jspdf for ticket/invoice generation
- Embla Carousel for image galleries
- Vercel Analytics for performance monitoring

**Development & Testing**
- Vitest for unit and integration testing
- ESLint with browser compatibility plugin
- Prettier with Tailwind CSS plugin
- Stylelint for CSS validation

**Deployment & DevOps**
- Replit for hosting and deployment (migrated from Vercel on October 8, 2025)
- Autoscale deployment target for optimal performance
- Cron jobs for scheduled tasks (flight schedules, database cleanup)
- Environment-based configuration via Replit Secrets
- Automated setup scripts for local development

**Browser Compatibility**
- Polyfills for Promise, fetch, URLSearchParams, performance, URL APIs
- Browser feature detection with compat plugin
- Responsive design with mobile-first approach
- Progressive enhancement strategy