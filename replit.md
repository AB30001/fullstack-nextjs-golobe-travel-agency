# Overview

Nordic Experiences (NordExplore) is a TripAdvisor-style affiliate platform built with Next.js 14, focused on showcasing tours and experiences across Norway, Iceland, Sweden, Finland, and Denmark. Users browse real tour data from Viator, then click through to complete bookings on Viator.com, earning 6-8% commission through a 30-day cookie attribution window.

# Recent Changes

- **December 2024**: Added password-protected admin panel at `/admin` for managing tours by Viator product code
- **December 2024**: Implemented automatic filtering to hide unavailable tours (missing images, ratings, or prices) from public pages
- **December 2024**: Added server-side validation when importing tours to ensure data quality
- **December 2024**: Fixed MongoDB serialization issues and field name inconsistencies (averageRating/rating, totalReviews/reviewCount)
- **December 2024**: Updated CSP headers to allow currency detection and exchange rate APIs

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend leverages Next.js 14 with the App Router, utilizing React 18 Server Components for performance. UI components are built using Radix UI primitives, shadcn/ui, and styled with Tailwind CSS. Key pages include a homepage with search and categories, filterable experience listings, and detailed experience pages featuring extensive photo galleries, review summaries, and direct affiliate booking calls to action.

## Backend Architecture

The backend consists of Next.js API Routes, providing RESTful endpoints for data retrieval. It maintains authentication infrastructure (NextAuth) for future use and includes a secure Viator API import endpoint. Data access is managed through Mongoose ODM for MongoDB interactions, supported by a service layer for business logic such as experience search, filtering, and review rating aggregation.

## Data Storage

MongoDB is used as the document-based NoSQL database, storing `Experiences` and `ExperienceReviews`. Data models include comprehensive tour details, images, pricing, and affiliate links, alongside user review data (ratings, photos). Next.js's built-in caching is employed for both static and dynamic content.

## Key Features

- **Experience Browsing & Filtering**: Users can filter experiences by country (Norway, Iceland, Sweden, Finland, Denmark), category (e.g., Northern Lights, Fjord Tours, Wildlife Safari), price range, and rating, and search by keywords.
- **Rich Experience Details**: Features high-quality photo galleries (15-28 images per tour) with a modern grid layout and full-screen lightbox, detailed descriptions, highlights, duration, and aggregate review data from Viator.
- **Direct Affiliate Booking**: Integrates a "Book Tour" call to action that directs users to Viator with dynamic parameters for pre-filled travel dates and traveler counts, supporting real-time availability checks via the Viator API. A sticky CTA bar enhances booking conversion.
- **Review System**: Displays aggregate review ratings and counts from Viator, linking directly to Viator.com for full reviews to drive affiliate traffic.
- **Nordic Country Focus**: Dedicated landing pages for each Nordic country, showcasing specific highlights and curated experiences.
- **Image Gallery Overhaul**: Displays all available images from Viator for each tour with an enhanced, accessible, and responsive gallery and lightbox.
- **Multi-Currency Support**: Automatic currency detection based on user location with manual currency selector. Supports USD, EUR, GBP, NOK, SEK, DKK, and ISK. Exchange rates fetched from API with fallback rates for reliability.
- **Admin Tour Management**: Password-protected admin panel at `/admin` for adding and removing tours by Viator product code. Features include:
  - Add tours by entering Viator product codes (e.g., 424330P3, 399370P3)
  - Delete tours individually or in bulk by product code
  - Search and browse all tours in the database
  - Server-side validation ensures only tours with valid images, ratings, and prices are imported
  - Automatic filtering hides unavailable tours from public pages

# External Dependencies

- **Affiliate Partners**:
    - **Viator (Primary)**: Integrated via their Partner API for real tour data, availability, and affiliate commission tracking (6-8%). Utilizes `/products/search` for discovery and `/products/{productCode}` for detailed information.
    - **GetYourGuide (Secondary)**: Intended for additional experience bookings.
- **Third-party Libraries**:
    - `date-fns`: For date formatting.
    - `Lucide React`: For icons.
    - `Next.js Image`: For optimized image handling.
    - `Tailwind CSS`: For utility-first styling.
- **Development & Testing**:
    - `ESLint`: For code quality.
    - `Prettier`: For code formatting.
- **Deployment & DevOps**:
    - `Replit`: For hosting and deployment with Autoscale.
    - `MongoDB Atlas`: For database hosting.