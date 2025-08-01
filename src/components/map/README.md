# Map Components Module

This module contains all the components related to the world map visualization, following a modular architecture for better maintainability and reusability.

## Components

### `MapTooltip.tsx`
Displays interactive tooltips when hovering over countries.
- **Props**: `tooltip`, `maxWidth`, `maxHeight`
- **Features**: Smart positioning, responsive layout, detailed climate data

### `MapLegend.tsx`
Shows the color scale legend and interaction hints.
- **Props**: `selectedCategory`, `countryCount`
- **Features**: Dynamic legend based on data category, usage instructions

### `MapInfo.tsx`
Displays current selection information (month, category, country count).
- **Props**: `selectedMonth`, `selectedCategory`, `countryCount`
- **Features**: Real-time updates, concise display

### `CountryMarkers.tsx`
Renders interactive circular markers for countries with tourism data.
- **Props**: `selectedMonth`, `selectedCategory`, `projection`, event handlers
- **Features**: Color-coded markers, hover interactions, country codes

### `FallbackMap.tsx`
Alternative display when world atlas data fails to load.
- **Props**: `selectedMonth`, `selectedCategory`, `tooltip`, event handlers
- **Features**: Grid layout, graceful degradation, full functionality

### `OceanBackground.tsx`
SVG gradient background for the world map.
- **Features**: Consistent ocean color, smooth gradient, proper sizing

## Usage

```tsx
import { MapTooltip, MapLegend } from '@/components/map';

// Individual component usage
<MapTooltip tooltip={tooltip} maxWidth={1000} maxHeight={600} />
<MapLegend selectedCategory="temperature" countryCount={20} />
```

## Architecture Benefits

- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components can be used in different contexts
- **Testability**: Individual components can be tested in isolation
- **Maintainability**: Changes to one component don't affect others
- **Type Safety**: Full TypeScript support throughout