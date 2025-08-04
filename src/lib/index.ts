// Barrel exports for lib utilities
export { mapCountryCode, hasTourismData, hasCountryData } from './firebaseDataLoader';
export type { DataCategory } from './firebaseDataLoader';
export { 
  createProjection, 
  createPathGenerator, 
  MAP_DIMENSIONS,
  DEFAULT_PROJECTION_CONFIG 
} from './mapProjection';
export type { ProjectionConfig } from './mapProjection';
export { getColorForCountry, getTemperatureColor, getRainfallColor, getBestTimeColor, getCategoryColor } from './mapColors';