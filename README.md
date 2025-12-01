# Wanderer

## Project Info

The website was designed over [Lovable](https://lovable.dev) and then modified locally

Provides user a world map that showcases:
- **Weather data**: Temperature, rainfall, and best time to visit each country by month
- **Visa requirements**: Interactive visa requirement visualization for 199 countries

_Note: The map used might not be 100% correct as rendered via libraries. Don't sue me if you find country of your map not correct_

## Features

### 🌡️ Climate Visualization
- Temperature maps (hot to cold gradient)
- Rainfall maps (dry to wet gradient)
- Best time to visit recommendations
- Monthly climate data for travel planning

### 🛂 Visa Requirements
- Search and select passport country
- Search and select destination country
- Visual map showing visa requirements globally
- Color-coded categories: Visa-free, Visa on arrival, eVisa, Visa required, No admission
- Detailed visa information for country pairs
- Based on [Passport Index Dataset](https://github.com/ilyankou/passport-index-dataset)

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- Tailwind CSS
- Firebase (Firestore for climate data)
- D3.js (map projections and visualizations)
- world-atlas (GeoJSON data)
 
## Getting Started
 
### Prerequisites
 
- Node.js 18+ and npm 9+
 
### Installation
 
```bash
npm install
```
 
### Development
 
```bash
npm run dev
```
 
Vite will print a local URL in the terminal to open the app.
 
### Build
 
```bash
npm run build
```
 
### Preview (after build)
 
```bash
npm run preview
```
 
### Deploy (GitHub Pages)

#### Automated Deployment (GitHub Actions)

The project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

**Setup Steps:**

1. Go to your repository Settings → Pages
2. Under "Build and deployment":
   - Source: Select **GitHub Actions**
3. Push to `main` branch - deployment happens automatically!

The site will be available at: `https://rajat19.github.io/travel/`

#### Manual Deployment

```bash
npm run deploy
```

This uses `gh-pages` package to deploy the `dist/` folder.
 
## Available Scripts
 
- `dev`: Start the Vite dev server
- `build`: Production build
- `build:dev`: Development-mode build
- `preview`: Preview the production build locally
- `lint`: Run ESLint
- `deploy`: Publish `dist/` to GitHub Pages (manual)

## Project Structure

```
travel/
├── src/
│   ├── components/        # React components
│   │   ├── map/          # Map-related components
│   │   ├── VisaSelector.tsx
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and data loaders
│   │   ├── visa.ts       # Visa data utilities
│   │   ├── firebaseDataLoader.ts
│   │   └── ...
│   └── types/            # TypeScript type definitions
├── public/
│   └── data/             # Static data files
│       └── visa_tidy_iso3.csv  # Visa requirements data
└── .github/
    └── workflows/
        └── deploy.yml    # GitHub Actions workflow
```
 
## Contributing
 
Contributions are welcome! To get started:
 
1. Fork the repository and create your feature branch:
   ```bash
   git checkout -b feat/your-feature
   ```
2. Install dependencies and run the dev server:
   ```bash
   npm install
   npm run dev
   ```
3. Make your changes, keeping code clear and typed. Prefer descriptive names and early returns.
4. Run linting and ensure the app builds:
   ```bash
   npm run lint
   npm run build
   ```
5. Commit using meaningful messages and open a Pull Request against `main`.
 
Guidelines:
- Keep components small and focused.
- Avoid deep nesting; handle edge cases early.
- Match existing formatting and Tailwind conventions.
- Include types for public APIs and props.

## Data Sources

- **Climate Data**: Stored in Firebase Firestore
- **Visa Requirements**: [Passport Index Dataset](https://github.com/ilyankou/passport-index-dataset) (MIT License)
- **Map Data**: [world-atlas](https://github.com/topojson/world-atlas) (ISC License)
 
## License
 
This project is licensed under the MIT License — see the `LICENSE` file for details.