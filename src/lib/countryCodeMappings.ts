// Country code mappings (ISO 3166-1 alpha-3 to alpha-2 and numeric IDs)
export const countryCodeMap: Record<string, string> = {
  // Alpha-3 to Alpha-2 mappings for all tourism data countries
  'ITA': 'IT', // Italy
  'JPN': 'JP', // Japan  
  'THA': 'TH', // Thailand
  'AUS': 'AU', // Australia
  'ISL': 'IS', // Iceland
  'BRA': 'BR', // Brazil
  'FRA': 'FR', // France
  'ESP': 'ES', // Spain
  'GRC': 'GR', // Greece
  'TUR': 'TR', // Turkey
  'EGY': 'EG', // Egypt
  'IND': 'IN', // India
  'USA': 'US', // United States
  'MEX': 'MX', // Mexico
  'CHN': 'CN', // China
  'GBR': 'GB', // United Kingdom
  'DEU': 'DE', // Germany
  'IDN': 'ID', // Indonesia
  'CAN': 'CA', // Canada
  'ZAF': 'ZA', // South Africa
  
  // Numeric country codes (sometimes used by world-atlas)
  '380': 'IT', // Italy
  '392': 'JP', // Japan
  '764': 'TH', // Thailand
  '036': 'AU', // Australia
  '352': 'IS', // Iceland
  '076': 'BR', // Brazil
  '250': 'FR', // France
  '724': 'ES', // Spain
  '300': 'GR', // Greece
  '792': 'TR', // Turkey
  '818': 'EG', // Egypt
  '356': 'IN', // India
  '840': 'US', // United States
  '484': 'MX', // Mexico
  '156': 'CN', // China
  '826': 'GB', // United Kingdom
  '276': 'DE', // Germany
  '360': 'ID', // Indonesia
  '124': 'CA', // Canada
  '710': 'ZA', // South Africa
  
  // Alternative numeric formats (with leading zeros removed)
  '76': 'BR',   // Brazil
  '36': 'AU',   // Australia
  
  // Common name variations and alternative spellings
  'Italy': 'IT',
  'Japan': 'JP',
  'Thailand': 'TH', 
  'Australia': 'AU',
  'Iceland': 'IS',
  'Brazil': 'BR',
  'France': 'FR',
  'Spain': 'ES',
  'Greece': 'GR',
  'Turkey': 'TR',
  'Egypt': 'EG',
  'India': 'IN',
  'United States': 'US',
  'United States of America': 'US',
  'Mexico': 'MX',
  'China': 'CN',
  'United Kingdom': 'GB',
  'UK': 'GB',
  'Germany': 'DE',
  'Indonesia': 'ID',
  'Canada': 'CA',
  'South Africa': 'ZA',
  
  // Already correct formats
  'IT': 'IT', 'JP': 'JP', 'TH': 'TH', 'AU': 'AU', 'IS': 'IS', 'BR': 'BR',
  'FR': 'FR', 'ES': 'ES', 'GR': 'GR', 'TR': 'TR', 'EG': 'EG', 'IN': 'IN',
  'US': 'US', 'MX': 'MX', 'CN': 'CN', 'GB': 'GB', 'DE': 'DE', 'ID': 'ID',
  'CA': 'CA', 'ZA': 'ZA',
};

/**
 * Maps various country identifier formats to standardized alpha-2 codes
 */
export const mapCountryCode = (countryId: string): string => {
  return countryCodeMap[countryId] || countryId;
};

/**
 * Checks if a country code has tourism data available
 */
export const hasTourismData = (countryCode: string): boolean => {
  const mappedCode = mapCountryCode(countryCode);
  // This would be imported from tourismData, but to avoid circular imports,
  // we'll check this in the component
  return Object.values(countryCodeMap).includes(mappedCode);
};