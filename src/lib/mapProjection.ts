import { geoPath, geoNaturalEarth1 } from 'd3-geo';

export interface ProjectionConfig {
  scale: number;
  translateX: number;
  translateY: number;
}

export const DEFAULT_PROJECTION_CONFIG: ProjectionConfig = {
  scale: 180,
  translateX: 600,
  translateY: 350,
};

/**
 * Creates a D3 projection with the given configuration
 */
export const createProjection = (config: ProjectionConfig = DEFAULT_PROJECTION_CONFIG) => {
  return geoNaturalEarth1()
    .scale(config.scale)
    .translate([config.translateX, config.translateY]);
};

/**
 * Creates a path generator for the given projection
 */
export const createPathGenerator = (projection: any) => {
  return geoPath().projection(projection);
};

/**
 * Map dimensions and viewBox configuration
 */
export const MAP_DIMENSIONS = {
  width: 1200,
  height: 700,
  viewBox: "0 0 1200 700",
} as const;