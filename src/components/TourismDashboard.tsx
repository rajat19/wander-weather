import React, { useState } from 'react';
import { MonthSelector } from './MonthSelector';
import { CategoryFilter } from './CategoryFilter';
import { WorldMapSVG } from './WorldMapSVG';
import { DataCategory } from '@/data/tourismDataLoader';
import { Globe, TrendingUp } from 'lucide-react';

export const TourismDashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('September');
  const [selectedCategory, setSelectedCategory] = useState<DataCategory>('temperature');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      {/* Header */}
      <header className="text-center py-8 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Globe className="w-8 h-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Tourism World Map
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the best destinations around the world based on seasonal weather patterns and climate data
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 space-y-8">
        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Map and Month Selector Layout */}
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
          {/* Month Selector - Left Side */}
          <div className="lg:w-64 flex-shrink-0">
            <MonthSelector
              selectedMonth={selectedMonth}
              onMonthSelect={setSelectedMonth}
            />
          </div>

          {/* World Map - Right Side */}
          <div className="flex-1">
            <WorldMapSVG
              selectedMonth={selectedMonth}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-card rounded-lg p-6 shadow-lg border">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">How to Use</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Select a month to see seasonal weather patterns</li>
              <li>• Choose between temperature and rainfall views</li>
              <li>• Hover over countries for detailed climate information</li>
              <li>• Colors indicate optimal travel conditions</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-lg border">
            <h3 className="text-lg font-semibold mb-3">Current Selection</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Month:</span> {selectedMonth}
              </div>
              <div>
                <span className="font-medium">Category:</span>{' '}
                <span className="capitalize">{selectedCategory}</span>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {selectedCategory === 'temperature'
                  ? 'Red indicates hot weather, blue indicates cold weather'
                  : 'Blue indicates high rainfall, gray indicates low rainfall'}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 mt-16 border-t border-border/50">
        <p className="text-sm text-muted-foreground">
          Tourism data visualization • <a href="https://github.com/rajat19">Github</a>
        </p>
      </footer>
    </div>
  );
};