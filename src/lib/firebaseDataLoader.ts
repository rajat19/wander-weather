import { collection, getDocs, doc, getDoc, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import { CountryData, MonthData } from '@/types';

export type DataCategory = 'temperature' | 'rainfall' | 'bestTime' | 'visa';

// Cache for loaded data
let cachedData: CountryData[] | null = null;

// Load tourism data from Firebase Firestore
export const loadCountries = async (): Promise<CountryData[]> => {
  if (cachedData) {
    return cachedData;
  }

  try {
    const countriesCollection = collection(db, "countries");
    const countriesQuery = query(countriesCollection, orderBy("name"));
    const querySnapshot = await getDocs(countriesQuery);
    
    const countries: CountryData[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Remove Firebase-specific fields before returning
      const { createdAt, updatedAt, ...countryData } = data;
      countries.push(countryData as CountryData);
    });
    
    // Validate the data structure
    if (!Array.isArray(countries)) {
      throw new Error('Invalid tourism data format: missing countries array');
    }
    // Cache the data
    cachedData = countries;
    
    return countries;
  } catch (error) {
    return [];
  }
};

// Load a single country by code
export const loadCountryByCode = async (countryCode: string): Promise<CountryData | null> => {
  try {
    const countryDoc = doc(db, "countries", countryCode);
    const docSnap = await getDoc(countryDoc);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      const { createdAt, updatedAt, ...countryData } = data;
      return countryData as CountryData;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

// Load months array
export const loadMonths = async (): Promise<string[]> => {
  return [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
};

// Synchronous access to cached data (for compatibility)
export const getCountriesData = (): CountryData[] => {
  if (!cachedData) {
    return [];
  }
  return cachedData;
};

export const getMonths = (): string[] => {
    return [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
};

// Helper functions for country code mapping (moved from old tourismData.ts)
export const mapCountryCode = (countryId: string | undefined): string => {
  if (!countryId) return '';
  
  const tourismData = getCountriesData();
  
  // Create a map from all alternative codes to main country codes
  const codeMap: Record<string, string> = {};
  
  tourismData.forEach(country => {
    // Map the main code to itself
    codeMap[country.code] = country.code;
    codeMap[country.name.toUpperCase()] = country.code;
    
    // Map alternative codes
    if (country.alternativeCodes) {
      if (country.alternativeCodes.alpha3) {
        codeMap[country.alternativeCodes.alpha3] = country.code;
      }
      if (country.alternativeCodes.numeric) {
        codeMap[country.alternativeCodes.numeric] = country.code;
      }
      if (country.alternativeCodes.commonNames) {
        country.alternativeCodes.commonNames.forEach(name => {
          codeMap[name.toUpperCase()] = country.code;
        });
      }
    }
  });
  
  return codeMap[countryId] || countryId;
};

export const hasTourismData = (countryId: string | undefined): boolean => {
  if (!countryId) return false;
  const mappedCode = mapCountryCode(countryId);
  const tourismData = getCountriesData();
  return tourismData.some(country => country.code === mappedCode);
};

/**
 * Checks if a country has tourism data available
 */
export const hasCountryData = (countryId: string, selectedMonth: string): boolean => {
  const alpha2Code = mapCountryCode(countryId);
  const tourismData = getCountriesData();
  const country = tourismData.find(c => c.code === alpha2Code);
  return !!(country && country.monthlyData[selectedMonth]);
};