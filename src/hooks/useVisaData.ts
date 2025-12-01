import { useEffect, useMemo, useState } from 'react';
import { normalizeVisaRequirement, VisaCategory, buildIso3ToNameMap } from '@/lib/visa';

export interface VisaRowIso3 {
  passport: string;    // ISO3
  destination: string; // ISO3
  requirement: VisaCategory;
}

export interface UseVisaDataReturn {
  loading: boolean;
  error: string | null;
  // Map from passport ISO3 -> destination ISO3 -> visa category
  byPassport: Record<string, Record<string, VisaCategory>>;
  // List of available passports (ISO3)
  passports: string[];
  // Helper: map of ISO3 to country names (best-effort)
  iso3ToName: Record<string, string>;
}

const baseUrl: string = import.meta.env.BASE_URL || '/';
// Try multiple paths for dev vs prod
const VISA_CSV_PATHS = [
  `${baseUrl}data/visa_tidy_iso3.csv`,
  '/data/visa_tidy_iso3.csv',
  './data/visa_tidy_iso3.csv'
];

export const useVisaData = (): UseVisaDataReturn => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<VisaRowIso3[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      
      // Try each path until one works
      let lastError: Error | null = null;
      for (const path of VISA_CSV_PATHS) {
        try {
          console.log(`[useVisaData] Attempting to fetch from: ${path}`);
          const res = await fetch(path, { cache: 'force-cache' });
          if (!res.ok) {
            lastError = new Error(`HTTP ${res.status}`);
            continue;
          }
          
          const text = await res.text();
          console.log(`[useVisaData] Successfully loaded ${text.length} bytes from ${path}`);
          
          const parsed: VisaRowIso3[] = [];
          const lines = text.split(/\r?\n/);
          // Expect header: Passport,Destination,Requirement
          for (let i = 1; i < lines.length; i += 1) {
            const line = lines[i];
            if (!line) continue;
            const [passport, destination, requirementRaw] = line.split(',');
            if (!passport || !destination) continue;
            parsed.push({
              passport: passport.trim(),
              destination: destination.trim(),
              requirement: normalizeVisaRequirement(requirementRaw || ''),
            });
          }
          
          console.log(`[useVisaData] Parsed ${parsed.length} visa entries`);
          
          if (!cancelled) {
            setRows(parsed);
            setLoading(false);
          }
          return; // Success, exit the function
        } catch (e) {
          console.warn(`[useVisaData] Failed to load from ${path}:`, e);
          lastError = e as Error;
          continue;
        }
      }
      
      // If we got here, all paths failed
      if (!cancelled) {
        console.error('[useVisaData] All paths failed. Last error:', lastError);
        setError(lastError?.message || 'Failed to load visa data from all paths');
        setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const byPassport = useMemo(() => {
    const map: Record<string, Record<string, VisaCategory>> = {};
    for (const r of rows) {
      if (!map[r.passport]) map[r.passport] = {};
      map[r.passport][r.destination] = r.requirement;
    }
    console.log(`[useVisaData] Built map for ${Object.keys(map).length} passports`);
    return map;
  }, [rows]);

  const passports = useMemo(() => Object.keys(byPassport).sort(), [byPassport]);
  const iso3ToName = useMemo(() => buildIso3ToNameMap(), []);

  return { loading, error, byPassport, passports, iso3ToName };
};


