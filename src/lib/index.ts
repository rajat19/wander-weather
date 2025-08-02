// Barrel exports for lib utilities
export { mapCountryCode, hasTourismData } from './dataLoader';
export { 
  createProjection, 
  createPathGenerator, 
  MAP_DIMENSIONS,
  DEFAULT_PROJECTION_CONFIG 
} from './mapProjection';
export type { ProjectionConfig } from './mapProjection';
export { getColorForCountry, hasCountryData } from './mapColors';