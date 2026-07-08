# Blocksmith-forge Frontend

**Next.js 14 DEX Interface for Blocksmith-forge DeFi Protocol**

Modern, responsive web interface for the Blocksmith-forge decentralized exchange, built with Next.js 14, React, and Tailwind CSS.

## Overview

This frontend application provides:

- **Token Swap Interface**: Seamless token swapping with slippage protection
- **Liquidity Provision**: Add and remove liquidity from AMM pools
- **Wallet Integration**: Native Freighter wallet support for Stellar
- **Real-time Metrics**: Live pool statistics and volume tracking
- **Responsive Design**: Beautiful UI that works on all devices

## Architecture

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Wallet**: Freighter API integration
- **Language**: TypeScript

### Project Structure

```
blocksmith-forge-Frontend/
├── package.json           # Dependencies and scripts
├── README.md              # This file
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── next.config.js         # Next.js configuration
└── src/
    ├── app/
    │   ├── page.tsx       # Main DEX interface
    │   ├── layout.tsx     # Root layout
    │   └── globals.css    # Global styles
    └── lib/
        └── freighter.ts    # Wallet integration utilities
```

## Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- Freighter wallet browser extension (for Stellar transactions)

## Installation

```bash
# Clone the repository
git clone https://github.com/blocksmith-forge/blocksmith-forge-Frontend.git
cd blocksmith-forge-Frontend

# Install dependencies
npm install
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Stellar Network Configuration
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# Contract Addresses
NEXT_PUBLIC_AMM_POOL_CONTRACT_ID=your_contract_id_here
```

### Tailwind CSS Configuration

The project uses Tailwind CSS with a custom configuration. The config is located at `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}
export default config
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

The development server will start at `http://localhost:3000`

## Features

### Token Swap

- Select from multiple supported tokens
- Set custom slippage tolerance (0.1%, 0.5%, 1.0%)
- Real-time price estimation
- Transaction confirmation

### Liquidity Management

- Add liquidity to existing pools
- Remove liquidity by burning LP tokens
- View current liquidity positions
- Track LP token balance

### Wallet Integration

- Connect Freighter wallet with one click
- View connected wallet address
- Sign transactions securely
- Auto-connection on page reload

### Pool Statistics

- 24-hour trading volume
- Total liquidity locked
- LP token supply
- Personal position tracking

## Wallet Integration

The application uses the Freighter wallet browser extension for Stellar transactions. Key functions:

### `connectWallet()`
Connects to the Freighter wallet and returns the public key.

### `getPublicKey()`
Retrieves the public key of the connected wallet.

### `signTransaction(xdr, network)`
Signs a Stellar transaction using the connected wallet.

### `signAuthEntry(entryXdr)`
Signs an authentication entry for Soroban contracts.

## API Integration

The frontend communicates with the Blocksmith-forge backend API:

```typescript
// Example API call
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pools`);
const data = await response.json();
```

## Component Architecture

### Main Page (`src/app/page.tsx`)

The main DEX interface includes:

- **Tab Navigation**: Switch between Swap and Liquidity views
- **Swap Panel**: Token selection and amount inputs
- **Liquidity Panel**: Add/remove liquidity forms
- **Stats Panel**: Real-time pool statistics

### Wallet Utilities (`src/lib/freighter.ts`)

Core wallet integration functions:

- Connection management
- Transaction signing
- Network configuration
- Local state persistence

## Styling

The application uses Tailwind CSS with a custom dark theme:

- **Primary Colors**: Purple and pink gradients
- **Background**: Slate/dark gradient
- **Glassmorphism**: Backdrop blur effects
- **Responsive**: Mobile-first design

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manual Deployment

```bash
# Build the application
npm run build

# The output is in the .next directory
# Serve with any Node.js hosting provider
```

## Security Considerations

- All transactions require wallet signature
- Slippage protection on swaps
- Input validation on all forms
- HTTPS required in production
- Environment variables for sensitive data

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Requires Freighter wallet extension

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## Contact

- **Organization**: blocksmith-forge
- **Developer**: Aesdecodes
- **GitHub**: https://github.com/blocksmith-forge
