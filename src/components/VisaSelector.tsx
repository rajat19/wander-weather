import React, { useState, useMemo } from 'react';
import { useVisaData } from '@/hooks/useVisaData';
import { getVisaColor, VISA_COLORS } from '@/lib/visa';

interface VisaSelectorProps {
  selectedPassportIso3: string;
  onChange: (iso3: string) => void;
  selectedDestinationIso3?: string;
  onDestinationChange?: (iso3: string) => void;
}

export const VisaSelector: React.FC<VisaSelectorProps> = ({
  selectedPassportIso3,
  onChange,
  selectedDestinationIso3,
  onDestinationChange,
}) => {
  const { loading, error, passports, iso3ToName, byPassport } = useVisaData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const [destSearchTerm, setDestSearchTerm] = useState('');
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isDestFocused, setIsDestFocused] = useState(false);

  // Filter and limit results to top 5 for passport
  const filteredPassports = useMemo(() => {
    if (!searchTerm.trim()) {
      return passports.slice(0, 5);
    }
    
    const term = searchTerm.toLowerCase();
    return passports
      .filter((iso3) => {
        const name = iso3ToName[iso3] || iso3;
        return (
          name.toLowerCase().includes(term) ||
          iso3.toLowerCase().includes(term)
        );
      })
      .slice(0, 5);
  }, [searchTerm, passports, iso3ToName]);

  // Filter and limit results to top 5 for destination
  const filteredDestinations = useMemo(() => {
    if (!destSearchTerm.trim()) {
      return passports.slice(0, 5);
    }
    
    const term = destSearchTerm.toLowerCase();
    return passports
      .filter((iso3) => {
        const name = iso3ToName[iso3] || iso3;
        return (
          name.toLowerCase().includes(term) ||
          iso3.toLowerCase().includes(term)
        );
      })
      .slice(0, 5);
  }, [destSearchTerm, passports, iso3ToName]);

  const selectedName = selectedPassportIso3 ? (iso3ToName[selectedPassportIso3] || selectedPassportIso3) : '';
  const selectedDestName = selectedDestinationIso3 ? (iso3ToName[selectedDestinationIso3] || selectedDestinationIso3) : '';

  // Get visa requirement if both countries selected
  const visaRequirement = useMemo(() => {
    if (selectedPassportIso3 && selectedDestinationIso3) {
      const visaMap = byPassport[selectedPassportIso3] || {};
      return visaMap[selectedDestinationIso3] || 'n/a';
    }
    return null;
  }, [selectedPassportIso3, selectedDestinationIso3, byPassport]);

  const getVisaText = (requirement: string): string => {
    switch (requirement) {
      case 'free': return 'Visa-free';
      case 'voa': return 'Visa on arrival';
      case 'evisa': return 'eVisa required';
      case 'sticker': return 'Visa required';
      case 'none': return 'No admission';
      case 'n/a': return 'No data available';
      default: return 'Check requirements';
    }
  };

  const getVisaEmoji = (requirement: string): string => {
    switch (requirement) {
      case 'free': return '✅';
      case 'voa': return '🛬';
      case 'evisa': return '💻';
      case 'sticker': return '📋';
      case 'none': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className="bg-card rounded-lg p-3 shadow-sm border">
      <div className="space-y-3">
        {/* Passport Country Selector */}
        <div>
          <div className="text-sm font-medium mb-2">Passport Country</div>
          {loading ? (
            <div className="text-xs text-muted-foreground">Loading...</div>
          ) : error ? (
            <div>
              <div className="text-xs text-red-600 font-medium">Failed to load visa data</div>
              <div className="text-xs text-red-500 mt-1">{error}</div>
            </div>
          ) : passports.length === 0 ? (
            <div className="text-xs text-yellow-600">No passport data available</div>
          ) : (
            <div className="relative">
              <input
                type="text"
                placeholder={isFocused || searchTerm ? "Search passport country..." : (selectedName || "Select passport country...")}
                value={isFocused || isOpen ? searchTerm : selectedName}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => {
                  setIsFocused(true);
                  setIsOpen(true);
                  setSearchTerm('');
                }}
                onBlur={() => {
                  setIsFocused(false);
                }}
                className="w-full border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              
              {isOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => {
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                  />
                  
                  <div className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredPassports.length > 0 ? (
                      filteredPassports.map((iso3) => (
                        <button
                          key={iso3}
                          onClick={() => {
                            onChange(iso3);
                            setIsOpen(false);
                            setSearchTerm('');
                            setIsFocused(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-primary/10 transition-colors ${
                            iso3 === selectedPassportIso3 ? 'bg-primary/20 font-medium' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{iso3ToName[iso3] || iso3}</span>
                            <span className="text-xs text-gray-500">{iso3}</span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-500">
                        No countries found
                      </div>
                    )}
                    {!searchTerm && passports.length > 5 && (
                      <div className="px-3 py-2 text-xs text-gray-400 border-t">
                        Type to search all {passports.length} countries
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Destination Country Selector */}
        {onDestinationChange && (
          <div>
            <div className="text-sm font-medium mb-2">Destination Country</div>
            <div className="relative">
              <input
                type="text"
                placeholder={isDestFocused || destSearchTerm ? "Search destination..." : (selectedDestName || "Select destination...")}
                value={isDestFocused || isDestOpen ? destSearchTerm : selectedDestName}
                onChange={(e) => {
                  setDestSearchTerm(e.target.value);
                  setIsDestOpen(true);
                }}
                onFocus={() => {
                  setIsDestFocused(true);
                  setIsDestOpen(true);
                  setDestSearchTerm('');
                }}
                onBlur={() => {
                  setIsDestFocused(false);
                }}
                className="w-full border rounded px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              
              {isDestOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => {
                      setIsDestOpen(false);
                      setDestSearchTerm('');
                    }}
                  />
                  
                  <div className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredDestinations.length > 0 ? (
                      <>
                        {filteredDestinations.map((iso3) => (
                          <button
                            key={iso3}
                            onClick={() => {
                              onDestinationChange(iso3);
                              setIsDestOpen(false);
                              setDestSearchTerm('');
                              setIsDestFocused(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-primary/10 transition-colors ${
                              iso3 === selectedDestinationIso3 ? 'bg-primary/20 font-medium' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{iso3ToName[iso3] || iso3}</span>
                              <span className="text-xs text-gray-500">{iso3}</span>
                            </div>
                          </button>
                        ))}
                      </>
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-500">
                        No countries found
                      </div>
                    )}
                    {!destSearchTerm && passports.length > 5 && (
                      <div className="px-3 py-2 text-xs text-gray-400 border-t">
                        Type to search all {passports.length} countries
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Visa Requirement Display */}
        {visaRequirement && selectedPassportIso3 && selectedDestinationIso3 && (
          <div 
            className="mt-3 p-3 rounded-lg text-white"
            style={{ backgroundColor: getVisaColor(visaRequirement as any) }}
          >
            <div className="flex items-center justify-center gap-2 text-sm font-semibold">
              <span className="text-xl">{getVisaEmoji(visaRequirement)}</span>
              <span>{getVisaText(visaRequirement)}</span>
            </div>
            <div className="text-xs text-center mt-1 opacity-90">
              {selectedName} → {selectedDestName}
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground mt-3">
        Select countries to view visa requirements.
      </div>
    </div>
  );
};


