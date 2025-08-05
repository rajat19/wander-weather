import React, { useState } from 'react';
import { MonthSelector } from './MonthSelector';
import { CategoryFilter } from './CategoryFilter';
import { WorldMapSVG } from './WorldMapSVG';
import { DataCategory } from '@/lib/firebaseDataLoader';
import { useFullscreen } from '@/hooks';
import { Globe, TrendingUp } from 'lucide-react';

export const TourismDashboard: React.FC = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [selectedCategory, setSelectedCategory] = useState<DataCategory>('temperature');
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
            />
            
            {/* Month Selector - Positioned above legend in Pacific Ocean area */}
            <div className="absolute bottom-40 left-4 z-40">
              <MonthSelector
                selectedMonth={selectedMonth}
                onMonthSelect={setSelectedMonth}
                isFullscreen={true}
              />
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
            Tourism World Map
          </h1>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
          Discover the best destinations around the world based on seasonal weather patterns and climate data
        </p>
      </header>

      <main className="container mx-auto px-2 sm:px-4 space-y-4 sm:space-y-6 md:space-y-8">
        <CategoryFilter selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 max-w-7xl mx-auto">
            {/* Month Selector - Top on mobile, left side on desktop */}
            <div className="xl:w-64 flex-shrink-0 order-1 xl:order-1">
              <MonthSelector
                selectedMonth={selectedMonth}
                onMonthSelect={setSelectedMonth}
                isFullscreen={false}
              />
            </div>

            {/* World Map - Bottom on mobile, right side on desktop */}
            <div className="flex-1 order-2 xl:order-2">
              <WorldMapSVG
                selectedMonth={selectedMonth}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12 px-2 sm:px-0">
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
              <div>
                <span className="font-medium">Month:</span> {selectedMonth}
              </div>
              <div>
                <span className="font-medium">Category:</span>{' '}
                <span className="capitalize">
                  {selectedCategory === 'bestTime' ? 'Best time to visit' : selectedCategory}
                </span>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {selectedCategory === 'temperature'
                  ? 'Red indicates hot weather, blue indicates cold weather'
                  : selectedCategory === 'rainfall'
                  ? 'Blue indicates high rainfall, gray indicates low rainfall'
                  : 'Green = best time, yellow = okay, red = avoid visiting'}
              </div>
            </div>
          </div>
          </div>

          <footer className="text-center py-4 sm:py-6 md:py-8 mt-8 sm:mt-12 md:mt-16 border-t border-border/50">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Tourism data visualization • <a href="https://github.com/rajat19">Github</a>
            </p>
          </footer>
      </main>
    </div>
  );
};