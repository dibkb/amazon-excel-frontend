# Conduit Project Setup

## Frontend Setup

### Prerequisites

- Node.js (16.x or higher recommended)
- PNPM package manager

### Installation Steps

1. **Install PNPM** (if not already installed)

   ```bash
   npm install -g pnpm
   ```

2. **Clone the repository and navigate to the frontend directory**

   ```bash
   cd amazon_excel
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Set up environment variables**

   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit the .env file and fill in the required values:
   # - AUTH_SECRET: Generate a secure random string
   # - NEXT_PUBLIC_DATABASE_URL: Your database connection URL
   # - NEXT_PUBLIC_IPINFO_TOKEN: Token for IP info service
   # - NEXT_PUBLIC_FRONTEND_URL: URL where frontend is hosted (localhost:3000 for development)
   # - NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: Access token for Mapbox
   # - NEXT_PUBLIC_MAPTILER_API_KEY: API key for MapTiler
   # - NEXT_PUBLIC_BACKEND_URL: URL for the backend (http://localhost:8000 for local development)
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

   The frontend will be available at http://localhost:3000

## Backend Setup

Go to the backend repo and set it up locally

## GitHub Repository

Backend repo:
[https://github.com/dibkb/excel-backend](https://github.com/dibkb/excel-backend)
