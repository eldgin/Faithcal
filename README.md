# Faithcal

A clean, professional website for posting and discovering faith-based events including concerts, workshops, revivals, conferences, and more.

## Features

- **Event Posting**: Create events with comprehensive details including date, time, location, performers, speakers, and topics
- **Media Support**: Upload images, audio snippets (max 30s), and video clips (max 20s)
- **Search & Filter**: Search events by keyword and filter by category
- **Prime Placement**: Purchase featured advertising placement on homepage, category pages, and search results
- **User Accounts**: Optional registration with benefits for registered users
- **Clean Design**: Professional aesthetic with no rounded corners or gradients
- **Animations**: Smooth transitions and animations throughout the site

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Radix UI
- **Database**: Prisma ORM with SQLite
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **State Management**: Next.js native search params
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Stripe account (for payment processing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Faithcal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
- `DATABASE_URL`: SQLite database path (default: `file:./dev.db`)
- `NEXTAUTH_URL`: Your app URL (default: `http://localhost:48060`)
- `NEXTAUTH_SECRET`: Generate a secret key for NextAuth
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret

4. Set up the database:
```bash
npm run db:push
npm run db:seed
```

5. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:48060`

## Project Structure

```
app/
  (auth)/          # Authentication pages
  (events)/        # Event-related pages
  api/             # API routes
  layout.tsx       # Root layout
  page.tsx         # Homepage
components/
  auth/            # Authentication components
  events/          # Event components
  navigation/      # Navigation components
  prime-placement/ # Prime placement components
  search/          # Search components
  ui/              # Shadcn UI components
lib/
  db/              # Database utilities
  auth.ts          # NextAuth configuration
  stripe.ts        # Stripe configuration
  utils.ts         # Utility functions
prisma/
  schema.prisma    # Database schema
```

## Database Schema

- **User**: User accounts (optional registration)
- **Event**: Event listings with all details
- **EventMedia**: Media files associated with events
- **Category**: Event categories
- **Payment**: Payment records for prime placements

## Key Features Implementation

### Event Posting
- Comprehensive form with validation
- Media upload with duration limits (audio: 30s, video: 20s)
- Guest users can post without registration

### Prime Placement
- Three placement types: Homepage, Category, Search Results
- Stripe integration for secure payments
- Automatic activation after successful payment

### Search & Filter
- Full-text search across event titles, descriptions, and locations
- Category-based filtering
- URL state management with Next.js native search params

## Development

### Database Commands
- `npm run db:push` - Push schema changes to database
- `npm run db:generate` - Generate Prisma Client
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with default categories

### Building for Production
```bash
npm run build
npm start
```

## Design Principles

- **No Rounded Corners**: All UI elements use sharp, geometric edges
- **No Gradients**: Solid colors only for a clean, professional look
- **Animations**: Subtle transitions and hover effects
- **Royalty-Free Images**: Uses Pexels/Pixabay for faith-based imagery

## License

MIT
