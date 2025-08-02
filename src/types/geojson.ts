// GeoJSON types for world atlas data
export interface CountryProperties {
  ISO_A3?: string;
  ADM0_A3?: string;
  ISO_A2?: string;
  NAME?: string;
  NAME_EN?: string;
  [key: string]: any;
}

export interface CountryFeature {
  id?: string;
  properties?: CountryProperties;
  geometry: any; // D3 compatible geometry
  type: 'Feature';
  [key: string]: any; // Allow additional properties for D3 compatibility
}

export interface WorldData {
  features: CountryFeature[];
  type: 'FeatureCollection';
}