import { useState, useEffect } from 'react';
import { loadCountries, loadMonths } from '@/lib/dataLoader';
import { CountryData } from '@/types';

interface UseTourismDataReturn {
  tourismData: CountryData[];
  months: string[];
  loading: boolean;
  error: string | null;
}

export const useTourismData = (): UseTourismDataReturn => {
  const [tourismData, setTourismData] = useState<CountryData[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [countriesData, monthsData] = await Promise.all([
          loadCountries(),
          loadMonths()
        ]);

        setTourismData(countriesData);
        setMonths(monthsData);
      } catch (err) {
        console.error('Failed to load tourism data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    tourismData,
    months,
    loading,
    error,
  };
};