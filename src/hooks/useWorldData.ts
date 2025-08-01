import { useState, useEffect } from 'react';
import { feature } from 'topojson-client';

export const useWorldData = () => {
  const [worldData, setWorldData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWorldData = async () => {
      try {
        setLoading(true);
        const world = await import('world-atlas/countries-50m.json');
        const countries = feature(world, world.objects.countries);
        setWorldData(countries);
        setError(null);
      } catch (err) {
        console.error('Error loading world data:', err);
        setError('Failed to load world map data');
        setWorldData(null);
      } finally {
        setLoading(false);
      }
    };

    loadWorldData();
  }, []);

  return {
    worldData,
    loading,
    error,
  };
};