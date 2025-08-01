# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Development
- `yarn run dev` - Start development server (runs on http://localhost:3001)
- `yarn run devmac` - Start development server on port 3001 (macOS specific)

### Building & Production
- `yarn run build` - Build production version (includes post-build processing)
- `yarn run start` - Start production server on port 8080
- `yarn run startwin` - Start production server on Windows
- `yarn run startnext` - Start using Next.js built-in server

### Code Quality
- `yarn run eslint` - Run ESLint for JavaScript/TypeScript linting
- `yarn run prettier` - Format code with Prettier
- `yarn run stylelint` - Lint and fix styled-components CSS

### Testing
- `yarn run test` - Run Jest test suite
- `yarn run test:watch` - Run tests in watch mode

## Architecture Overview

This is **Stef.fm**, a Next.js-based music streaming application designed to preserve and showcase house music mixes. The UI is styled to resemble a Roland Jupiter-8 synthesizer from the 1980s.

### Key Technologies
- **Next.js 14** with standalone output for production deployment
- **TypeScript** for type safety
- **Styled Components** for component styling
- **LowDB** for local JSON database management
- **React Three Fiber** for 3D graphics components
- **Material-UI (MUI)** for some UI components
- **Framer Motion** for animations

### Project Structure

#### Database Layer (`/db/`)
- Uses **LowDB** with JSON files for data persistence
- `db/mixes.json` - Main database file containing all mix data
- `db/types.ts` - TypeScript definitions for Mix, Track, Category, Background types
- Individual mix files in `db/mixes/` directory with detailed track listings

#### Component Architecture (`/components/`)
- **Atomic design approach** with styled-components
- Each component has its own directory with:
  - `index.tsx` - Main component logic
  - `Styled*.ts` - Styled-components definitions
  - `types.ts` - Component-specific TypeScript types
- **Jupiter/** - Complex synthesizer UI components (buttons, knobs, sliders, screens)
- **Admin/** - Backend management interface components
- **Mixcloud/** - Integration with Mixcloud streaming service

#### Pages & API (`/pages/`)
- Next.js file-based routing
- **Dynamic routing** with `[mcKey]/index.tsx` for individual mix pages
- API routes in `/pages/api/` for data fetching (categories, mixes, search, stats)
- Admin pages for content management

#### Key Features
- **Music mix streaming** with Mixcloud integration
- **Visual track progression** with Jupiter-8 style LED displays
- **Background customization** with multiple theme options
- **Search and filtering** across mixes and tracks
- **Admin interface** for content management
- **Responsive design** with desktop-first approach

### Development Notes

#### Styling System
- Uses **styled-components v6** with TypeScript
- Theme system in `styles/themes.ts` for consistent design
- CSS-in-JS approach with component-scoped styling
- Custom fonts loaded via public/fonts/ directory

#### Data Flow
- Mix data stored as JSON files in `/db/mixes/`
- LowDB provides database-like querying over JSON
- API routes serve data to frontend components
- Mixcloud integration for audio streaming

#### Build Process
- Next.js standalone output for optimized production builds
- Custom post-build script (`post-build.js`) for additional processing
- SVG handling via @svgr/webpack for icon components

When working with this codebase:
- Follow the existing component pattern (index.tsx + Styled*.ts + types.ts)
- Use the existing styled-components theme system
- Maintain TypeScript strict mode compliance
- Test changes with both development and production builds