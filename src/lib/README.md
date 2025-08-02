# Library Utilities

This module contains utility functions and configurations for the world map functionality.

## Modules

### `countryCodeMappings.ts`

Handles country code conversions and mappings.

- **Functions**:
  - `mapCountryCode(countryId)`: Maps various country ID formats to alpha-2 codes
  - `hasTourismData(countryCode)`: Checks if tourism data exists for a country
- **Data**: Comprehensive country code mapping (Alpha-3, numeric, names)

### `mapProjection.ts`

D3.js projection configuration and utilities.

- **Functions**:
  - `createProjection(config)`: Creates configured D3 projection
  - `createPathGenerator(projection)`: Creates SVG path generator
- **Constants**: `MAP_DIMENSIONS`, `DEFAULT_PROJECTION_CONFIG`

### `mapColors.ts`

Color calculation logic for countries based on climate data.

- **Functions**:
  - `getColorForCountry(countryId, month, category)`: Gets appropriate country color
  - `hasCountryData(countryId, month)`: Checks data availability
- **Features**: Temperature/rainfall color mapping, fallback colors

## Usage

```tsx
import { createProjection, getColorForCountry, mapCountryCode } from '@/lib';

// Create D3 projection
const projection = createProjection();

// Get country color
const color = getColorForCountry('IT', 'August', 'temperature');

// Map country code
const alpha2 = mapCountryCode('ITA'); // Returns 'IT'
```

## Architecture Benefits

- **Pure Functions**: No side effects, predictable outputs
- **Configuration-Driven**: Easy to modify projection settings
- **Type-Safe**: Full TypeScript support
- **Performance**: Optimized lookup tables and algorithms
- **Extensible**: Easy to add new country codes or projections