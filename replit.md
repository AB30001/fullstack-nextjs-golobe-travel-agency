# Overview

Nordic Experiences is a TripAdvisor-style platform showcasing tours and experiences across the Nordic countries (Norway, Iceland, Sweden, Finland, and Denmark). The application is built with Next.js 14 and focuses on browsing, reviewing, and discovering amazing adventures in Scandinavia through affiliate partnerships.

The platform provides a streamlined browsing experience focused on affiliate-based bookings. Users can explore experiences, read reviews, filter by location and category, and click through to affiliate partners to complete their bookings. Authentication and payment systems are preserved in the codebase for potential future use but are not currently active.

# Recent Changes

**October 24, 2025 - Footer Updates & Image Fixes**
- Updated footer "Our Destination" section to display all 5 Nordic countries with working links:
  - Norway, Sweden, Iceland, Denmark, Finland (all link to country-filtered experiences pages)
- Updated footer "Our Activity" section with current categories:
  - Northern Lights, Fjord Tours, Wildlife Safari, Hiking & Trekking (all link to category-filtered experiences pages)
- Updated footer "Travel Blogs" section with authentic Nordic travel resources:
  - Sweden Travel Guide → swedentips.se
  - Denmark Travel Guide → thecopenhagentales.com  
  - Iceland Travel Guide → icelandair.com/blog
- Fixed broken category images on homepage "Popular Categories" section:
  - Wildlife Safari: Updated to whale/orca image matching Nordic theme (photo-1559827260-dc66d52bef19)
  - Cultural Tours: Updated to working Unsplash image (photo-1527004013197-933c4bb611b3)
- All footer links now properly reflect Nordic-focused brand identity

**October 23, 2025 - Real-Time Availability Calendar & "Book Tour" CTA**
- Integrated Viator availability API to show real-time tour availability
- Added `/api/viator/availability` endpoint that fetches live availability schedules from Viator
- Updated BookingSidebar to fetch and display unavailable dates from Viator API
- Calendar now validates selected dates against Viator's unavailable dates and shows error messages
- Extracts productCode from experience slug for availability lookups
- Shows loading indicator while fetching availability data
- Changed ALL CTA button text from "Check Availability" to "Book Tour" across the site
- Updated both BookingSidebar and StickyMobileBar components for consistency
- Links send users directly to Viator for booking completion (6-8% affiliate commission)

**October 23, 2025 - Sticky CTA Bar (Viator-Style)**
- Implemented professional sticky CTA bar that appears at bottom of tour pages when scrolling
- Shows on all devices (desktop and mobile) after scrolling 300px
- Features green "Book Tour" button (emerald-600) matching Viator's design
- Displays price with "from $X per person" format
- Shows "Lowest Price Guarantee" text
- Includes heart/save button for wishlist functionality
- Responsive design with proper spacing and shadows
- Smooth appearance/disappearance based on scroll position

**October 23, 2025 - Complete Image Gallery Overhaul**
- Removed ALL image limits - now displaying every image Viator provides (15-28 images per tour)
- Completely redesigned ImageGallery component with modern grid layout (1 large + 4 smaller images)
- Added full-screen lightbox/modal with keyboard navigation (Escape, Arrow keys)
- Added thumbnail strip at bottom of lightbox for quick navigation
- Implemented proper accessibility: role="dialog", aria-modal, aria-labels, keyboard handlers
- Added defensive checks for empty arrays and proper scroll lock cleanup via useEffect
- Fixed two critical bugs:
  - Line 137: Removed .slice(0, 10) from extractImages function
  - Line 227: Removed .slice(0, 10) from transform function
- Results: Fjord cruise shows 26 images, RIB adventure shows 15 images (matching Viator exactly)
- Each tour now displays "View all X photos" button with accurate count
- Gallery is responsive, accessible, and production-ready

**October 23, 2025 - Implemented "Read Reviews on Viator" Solution**
- Updated ReviewsList component to show "Read Reviews on Viator" button when no local reviews exist
- Button displays aggregate rating data (e.g., "80 verified reviews with 5.0/5.0 rating on Viator")
- Links directly to Viator product page via affiliate link (drives booking traffic, earns 6-8% commission)
- Clean, user-friendly design with blue CTA button and external link icon
- Explains that authentic traveler reviews are available on Viator
- Solution addresses API limitation: Viator Basic Access only provides aggregate review data, not individual review text
- To get individual review text would require upgrading to Full Access API (free upgrade via affiliateapi@tripadvisor.com)

**October 22, 2025 - Viator API Integration (Golden Path Implementation)**
- Successfully integrated Viator Partner API following their recommended Golden Path best practices
- Implemented proper affiliate tracking links with mcid, pid, medium, and api_version parameters for commission tracking
- Created Viator service (lib/services/viator.js) using recommended endpoints:
  - `/partner/destinations` - Fetch all available destinations (3,373 destinations found, 27 Nordic destinations identified)
  - `/partner/products/search` - Search products by destination with sorting by TRAVELER_RATING
  - `/partner/products/{productCode}` - Fetch complete product details including all images
- Built data transformation layer (lib/services/viatorTransformer.js) to convert Viator product data to our experience schema
- Added secure API route (app/api/viator/import) with Bearer token authentication for controlled data imports
- Successfully imported 50 real Nordic tours with authentic:
  - Product titles, descriptions, and complete image galleries from TripAdvisor CDN (media-cdn.tripadvisor.com)
  - 15-28 high-quality images per tour showing diverse angles and experiences
  - Pricing data ($96-$3,000 range)
  - Review ratings and counts (5.0 stars, 27-44 reviews)
  - Tour durations, categories, and highlights
- Added TripAdvisor CDN to Next.js image configuration for proper image loading
- Viator production API key (f05ccf11-d48f-4e4b-8d13-9aac475a6d46) stored securely in Replit Secrets
- All affiliate links properly formatted to redirect to Viator.com for booking completion (6-8% commission)

**October 19, 2025 - Navigation Updates**
- Updated all navigation components to display "Whale Safari" instead of "Wildlife" 
- Redesigned homepage navigation (NavMinimal.js) with white background and shadow
- Navigation features: logo + 4 category links (All Experiences, Northern Lights, Fjord Tours, Whale Safari) + Countries dropdown
- Countries dropdown includes all 5 Nordic countries: Norway, Sweden, Iceland, Denmark, Finland
- Responsive: category links hidden on mobile/tablet, visible on desktop (lg breakpoint)
- Category links and country filters properly filter experiences using exact enum values from schema

**October 19, 2025 - Logo Size Increase**
- Increased logo size by 30% across all components (40px → 52px default height)
- Updated Logo component, Nav, NavNordic, QuickLinks, and user forms layout

**October 19, 2025 - Branding Update**
- Replaced all instances of golobe-logo.png with nordtravel-logo.svg
- Updated Logo component to use Next.js Image for SVG file loading
- Applied new logo to navigation (Nav.js, NavNordic.js), footer (QuickLinks.js), and user forms layout
- Removed legacy logo props (worldFill, otherFill) from all components
- Deleted old golobe-logo.png file from project

**October 8, 2025 - Comprehensive Flight/Hotel Cleanup**
- Completed full removal of all flight and hotel functionality from codebase
- Removed all flight/hotel pages, components, services, actions, and API routes
- Deleted flight/hotel schemas (flights, hotels, bookings, passengers, searchHistory, promoCodes)
- Removed flight/hotel data files, images, and assets (airlines data, airplane data, flight/hotel images)
- Cleaned up Redux store by removing flight/hotel slices
- Fixed all import dependencies and broken references throughout codebase
- Platform successfully tested and confirmed working
- **Preserved** authentication (NextAuth) and payment (Stripe) infrastructure for potential future use

**October 8, 2025 - Complete Platform Transformation**
- Transformed from flight/hotel booking platform to Nordic experiences review platform
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
- Minimal Redux for app state management

**UI Component System**
- Radix UI primitives for accessible components
- shadcn/ui component library for pre-built components
- Tailwind CSS for utility-first styling
- Custom experience components (cards, filters, search bar)

**Key Pages**
- Homepage: Hero search, country cards, top-rated experiences, popular categories
- Experiences listing: Filterable grid with country, category, price, and rating filters
- Experience detail: Photo gallery with 15-28 images, full-screen lightbox, reviews, highlights, affiliate booking CTA, sticky CTA bar
- Country pages: Landing pages for each Nordic country

## Backend Architecture

**API Layer**
- Next.js API Routes for serverless functions
- RESTful endpoints for data retrieval
- Authentication infrastructure preserved (NextAuth) for future use
- Viator API import endpoint with Bearer token authentication

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
- Experiences: Tours and activities with location, category, pricing, 15-28 images per tour, affiliate links
- Reviews: User-submitted reviews with ratings, photos, and travel details (no user accounts required)

**Caching Strategy**
- Next.js built-in caching for static and dynamic content
- Server-side rendering for experience pages

## External Dependencies

**Affiliate Partners**
- Viator (primary) - Real tour data via Partner API with 6-8% commission
  - Uses `/products/search` to discover tours
  - Uses `/products/{productCode}` to fetch complete details including all images
  - Enrichment process fetches full details for each product during import
- GetYourGuide (secondary) - For additional experience bookings
- External links with affiliate tracking parameters

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
- High-quality photo galleries with 15-28 images per tour (all images from Viator)
- Modern grid layout: 1 large image + 4 smaller images
- Full-screen lightbox with keyboard navigation and thumbnail strip
- Detailed descriptions and highlights
- Duration, language, and meeting point information
- What's included/not included lists
- Aggregate review data (rating and count from Viator)
- Direct affiliate booking links
- Sticky CTA bar with "Check Availability" button (appears on scroll)

**Reviews System**
- Displays aggregate review data from Viator (rating + count)
- "Read Reviews on Viator" button links to full reviews on Viator.com
- Design decision: Drives booking traffic to earn affiliate commissions
- API limitation: Viator Basic Access only provides aggregate data, not individual review text
- Future option: Upgrade to Full Access API for individual review text (free via affiliateapi@tripadvisor.com)

**Nordic Country Focus**
- Dedicated landing pages for each country
- Country-specific highlights and top experiences
- Beautiful hero images and descriptions
- Curated experience collections
