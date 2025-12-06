import React, { useState } from 'react';
import { MonthSelector } from './MonthSelector';
import { CategoryFilter } from './CategoryFilter';
import { WorldMapSVG } from './WorldMapSVG';
import { DataCategory } from '@/lib/firebaseDataLoader';
import { useFullscreen } from '@/hooks';
import { Globe, TrendingUp } from 'lucide-react';
import { VisaSelector } from './VisaSelector';

export const TourismDashboard: React.FC = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [selectedCategory, setSelectedCategory] = useState<DataCategory>('temperature');
  const [selectedPassportIso3, setSelectedPassportIso3] = useState<string>('');
  const [selectedDestinationIso3, setSelectedDestinationIso3] = useState<string>('');
  const { isFullscreen } = useFullscreen();

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-blue-100 z-50">
        <main className="h-full relative">
        <div className="h-full relative">
            {/* Category Filter - Top of screen */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>

            {/* World Map - Full Screen */}
            <WorldMapSVG
              selectedMonth={selectedMonth}
              selectedCategory={selectedCategory}
              selectedPassportIso3={selectedPassportIso3}
            />
            
            {/* Month/Visa Selector - Positioned above legend in Pacific Ocean area */}
            <div className="absolute bottom-40 left-4 z-40">
              {selectedCategory === 'visa' ? (
                <VisaSelector
                  selectedPassportIso3={selectedPassportIso3}
                  onChange={setSelectedPassportIso3}
                  selectedDestinationIso3={selectedDestinationIso3}
                  onDestinationChange={setSelectedDestinationIso3}
                />
              ) : (
                <MonthSelector
                  selectedMonth={selectedMonth}
                  onMonthSelect={setSelectedMonth}
                  isFullscreen={true}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <header className="text-center py-4 px-4 sm:py-6 md:py-8">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Wanderer
          </h1>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
          Discover the best destinations around the world based on seasonal weather patterns and climate data
        </p>
      </header>

      <main className="container mx-auto px-2 sm:px-4 space-y-4 sm:space-y-6 md:space-y-8">
        <CategoryFilter selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 max-w-7xl mx-auto">
            {/* Month/Visa Selector - Top on mobile, left side on desktop */}
            <div className="xl:w-64 flex-shrink-0 order-1 xl:order-1">
              {selectedCategory === 'visa' ? (
                <VisaSelector
                  selectedPassportIso3={selectedPassportIso3}
                  onChange={setSelectedPassportIso3}
                  selectedDestinationIso3={selectedDestinationIso3}
                  onDestinationChange={setSelectedDestinationIso3}
                />
              ) : (
                <MonthSelector
                  selectedMonth={selectedMonth}
                  onMonthSelect={setSelectedMonth}
                  isFullscreen={false}
                />
              )}
            </div>

            {/* World Map - Bottom on mobile, right side on desktop */}
            <div className="flex-1 order-2 xl:order-2 w-full aspect-[1200/650] max-h-[70vh] xl:aspect-auto xl:max-h-none xl:h-auto">
              <WorldMapSVG
                selectedMonth={selectedMonth}
                selectedCategory={selectedCategory}
              selectedPassportIso3={selectedPassportIso3}
              />
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 px-2 sm:px-0">
          <div className="bg-card rounded-lg p-4 sm:p-6 shadow-lg border">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <h3 className="text-base sm:text-lg font-semibold">How to Use</h3>
            </div>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>• Select a month to see seasonal weather patterns</li>
              <li>• Choose between temperature and rainfall views</li>
              <li>• Hover over countries for detailed climate information</li>
              <li>• Colors indicate optimal travel conditions</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg p-4 sm:p-6 shadow-lg border">
            <h3 className="text-base sm:text-lg font-semibold mb-3">Current Selection</h3>
            <div className="space-y-2 text-xs sm:text-sm">
              {selectedCategory !== 'visa' && (
                <div>
                  <span className="font-medium">Month:</span> {selectedMonth}
                </div>
              )}
              <div>
                <span className="font-medium">Category:</span>{' '}
                <span className="capitalize">
                  {selectedCategory === 'bestTime' ? 'Best time to visit' : selectedCategory}
                </span>
              </div>
              {selectedCategory === 'visa' && (
                <div>
                  <span className="font-medium">Passport:</span> {selectedPassportIso3 || 'Not selected'}
                </div>
              )}
              {selectedCategory === 'visa' && selectedDestinationIso3 && (
                <div>
                  <span className="font-medium">Destination:</span> {selectedDestinationIso3}
                </div>
              )}
              <div className="mt-3 text-xs text-muted-foreground">
                {selectedCategory === 'temperature'
                  ? 'Red indicates hot weather, blue indicates cold weather'
                  : selectedCategory === 'rainfall'
                  ? 'Blue indicates high rainfall, gray indicates low rainfall'
                  : selectedCategory === 'bestTime'
                  ? 'Green = best time, yellow = okay, red = avoid visiting'
                  : 'Colors show visa requirements for your passport'}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 sm:p-6 shadow-lg border">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <h3 className="text-base sm:text-lg font-semibold">Visa Requirements</h3>
            </div>
            <div className="overflow-x-auto rounded-md border bg-background">
              <div className="min-w-[350px]">
                <iframe
                  title="Visa requirements widget"
                  src="https://visalist.io/widget?dark=false&showheader=false&home=&destination="
                  width="100%"
                  className="w-full h-[250px] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
          </div>

          <footer className="text-center py-4 sm:py-6 md:py-8 mt-8 sm:mt-12 md:mt-16 border-t border-border/50">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Wanderer • <a href="https://github.com/geek-paradox/travel">Github</a>
            </p>
          </footer>
      </main>
    </div>
  );
};