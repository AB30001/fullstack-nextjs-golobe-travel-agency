# Overview

Nordic Experiences is a TripAdvisor-style platform showcasing tours and experiences across the Nordic countries (Norway, Iceland, Sweden, Finland, and Denmark). The application is built with Next.js 14 and focuses on browsing, reviewing, and discovering amazing adventures in Scandinavia through affiliate partnerships.

The platform provides a streamlined browsing experience with no user accounts, no payments, and no direct booking. Users can explore experiences, read reviews, filter by location and category, and click through to affiliate partners to complete their bookings.

# Recent Changes

**October 8, 2025 - Complete Platform Transformation**
- Transformed from flight/hotel booking platform to Nordic experiences review platform
- Removed all authentication systems (NextAuth, user accounts, sessions)
- Removed all payment processing (Stripe integration)
- Removed all booking functionality (flights, hotels, reservations)
- Created new database schema for experiences and reviews
- Built new TripAdvisor-style homepage with hero search
- Created experiences listing and detail pages
- Added Nordic country landing pages (Norway, Iceland, Sweden, Finland, Denmark)
- Implemented search and filtering for experiences
- Added affiliate link integration for external bookings
- Generated sample Nordic experience data

**October 8, 2025 - Replit Migration**
- Updated Next.js server configuration to run on port 5000 and bind to 0.0.0.0 for Replit compatibility
- Configured next.config.mjs to support Replit domains (**.replit.dev) for image hosting
- Migrated all environment variables to Replit Secrets for secure credential management
- Set up deployment configuration for Replit's autoscale platform

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Rendering Strategy**
- Next.js 14 with App Router for server-side rendering and static generation
- React 18 with Server Components for optimal performance
- Client-side state for filters and search
- No authentication or user-specific state management

**UI Component System**
- Radix UI primitives for accessible components
- shadcn/ui component library for pre-built components
- Tailwind CSS for utility-first styling
- Custom experience components (cards, filters, search bar)

**Key Pages**
- Homepage: Hero search, country cards, top-rated experiences, popular categories
- Experiences listing: Filterable grid with country, category, price, and rating filters
- Experience detail: Photo gallery, reviews, highlights, affiliate booking CTA
- Country pages: Landing pages for each Nordic country

## Backend Architecture

**API Layer**
- Next.js API Routes for serverless functions
- RESTful endpoints for data retrieval
- No authentication middleware
- Data generation endpoints for sample content

**Data Access Layer**
- Custom database utility functions for CRUD operations
- Mongoose ODM for MongoDB interactions
- Schema-based data validation
- Service layer for experience and review operations

**Business Logic**
- Experience search and filtering algorithms
- Review rating aggregation
- Featured experience selection
- Country-based experience grouping

## Data Storage

**Database: MongoDB**
- Document-based NoSQL database
- Collections: Experiences, ExperienceReviews
- Indexing for search performance (country, category, rating)

**Data Models**
- Experiences: Tours and activities with location, category, pricing, images, affiliate links
- Reviews: User-submitted reviews with ratings, photos, and travel details (no user accounts required)

**Caching Strategy**
- Next.js built-in caching for static and dynamic content
- Server-side rendering for experience pages

## External Dependencies

**Affiliate Partners**
- GetYourGuide for experience bookings
- Viator for tour bookings
- External links with tracking

**Third-party Libraries**
- date-fns for date formatting
- Lucide React for icons
- Next.js Image for optimized images
- Tailwind CSS for styling

**Development & Testing**
- ESLint for code quality
- Prettier with Tailwind CSS plugin for formatting

**Deployment & DevOps**
- Replit for hosting and deployment
- Autoscale deployment target for optimal performance
- Environment-based configuration via Replit Secrets
- MongoDB Atlas for database hosting

**Browser Compatibility**
- Responsive design with mobile-first approach
- Modern browser support
- Image optimization with Next.js

## Key Features

**Browse Experiences**
- Filter by country (Norway, Iceland, Sweden, Finland, Denmark)
- Filter by category (Northern Lights, Fjord Tours, Wildlife Safari, etc.)
- Filter by price range and rating
- Search by keywords

**Experience Details**
- High-quality photo galleries
- Detailed descriptions and highlights
- Duration, language, and meeting point information
- What's included/not included lists
- User reviews with ratings and photos
- Direct affiliate booking links

**Reviews System**
- No user accounts required for reviews
- Rating from 1-5 stars
- Detailed ratings (value, safety, service, organization)
- Review photos and verified bookings
- Travel date and trip type information
- Helpful vote system

**Nordic Country Focus**
- Dedicated landing pages for each country
- Country-specific highlights and top experiences
- Beautiful hero images and descriptions
- Curated experience collections
