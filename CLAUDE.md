# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Roxy IP" - a Vue 3 IP address lookup tool that allows users to discover geographic location and network details for any IP address. The application automatically detects the user's current IP on load and provides a search interface for querying other IP addresses.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (accessible on all network interfaces at port 5173)
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Tech Stack & Architecture

- **Framework**: Vue 3 with Composition API and `<script setup>`
- **Build Tool**: Vite with hot module replacement
- **Styling**: TailwindCSS v4 (latest) with custom responsive breakpoints
- **3D Graphics**: Cobe library for interactive globe visualization
- **Package Manager**: pnpm (note: uses `pnpm-lock.yaml`)

### Key Application Structure

**Main Application (`src/App.vue`)**:
- Handles both automatic IP detection on load and manual IP search
- Manages query states: `idle`, `loading`, `result`, `error`
- API endpoint: `http://47.238.180.193:8095` with two endpoints:
  - `/api/ip.json` - auto-detect current user's IP
  - `/api/search_ip` - POST endpoint for manual IP lookup
- Implements IP validation for both IPv4 and IPv6 formats
- Mobile-responsive with auto-scroll behavior after search

**Custom Components**:
- `Globe.vue`: Interactive 3D globe using Cobe library with continuous rotation
- `HyperText.vue`: Advanced text animation component with multiple states:
  - Typing/decoding effect with randomized characters
  - Loading animation with constant character randomization  
  - Delete/reveal animation for state transitions
  - Configurable speeds for different animation phases

### Styling Architecture

- Uses TailwindCSS with custom breakpoints: `phone`, `tablet`, `laptop`, `desktop`
- Component-scoped styles with CSS-in-Vue
- Responsive design with mobile-first approach
- Custom gradient blur effects and background elements

### API Integration

The app expects specific API response format:
```javascript
// Success response
{
  "code": 0,
  "data": {
    "ip": "...",
    "country_short": "...",
    "country_long": "...",
    "region": "...",
    "city": "...",
    "timezone": "...",
    "latitude": "...",
    "longitude": "...",
    "zipcode": "..."
  }
}
```

## File Organization

```
src/
├── App.vue           # Main application component
├── main.js           # Vue app initialization  
├── style.css         # Global styles
├── components/
│   ├── Globe.vue     # 3D globe visualization
│   └── HyperText.vue # Text animation effects
└── assets/           # Static assets (SVGs, images)
```

## Development Notes

- Server runs on `0.0.0.0:5173` to allow network access during development
- Uses `@` alias for `src/` directory imports
- All text animations are state-driven - avoid direct manipulation
- Globe component handles its own cleanup via `onUnmounted`
- Mobile responsiveness is critical - test on various screen sizes