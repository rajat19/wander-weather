# Custom Hooks

This module contains custom React hooks for the world map functionality.

## Hooks

### `useWorldData.ts`
Manages loading and state of world atlas geographic data.

**Returns:**
- `worldData`: Parsed geographic features from world-atlas
- `loading`: Loading state boolean
- `error`: Error message if loading fails

**Features:**
- Async data loading with proper error handling
- Automatic retry logic
- Memory cleanup on unmount

### `useMapInteractions.ts`
Handles all mouse interactions with the map (hover, tooltips).

**Parameters:**
- `selectedMonth`: Current selected month for data lookup

**Returns:**
- `tooltip`: Current tooltip data or null
- `handleCountryHover`: Mouse enter/move handler
- `handleCountryLeave`: Mouse leave handler

**Features:**
- Relative positioning calculations
- Tourism data lookup and validation
- Smart tooltip positioning
- Performance optimized event handling

## Usage

```tsx
import { useWorldData, useMapInteractions } from '@/hooks';

function MapComponent({ selectedMonth }) {
  const { worldData, loading, error } = useWorldData();
  const { tooltip, handleCountryHover, handleCountryLeave } = useMapInteractions(selectedMonth);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <svg onMouseMove={handleCountryHover} onMouseLeave={handleCountryLeave}>
      {/* SVG content */}
    </svg>
  );
}
```

## Architecture Benefits

- **State Encapsulation**: Related state and logic grouped together
- **Reusability**: Hooks can be used across different components
- **Separation of Concerns**: UI logic separated from business logic
- **Testing**: Hooks can be tested independently
- **Performance**: Optimized re-renders and memory usage