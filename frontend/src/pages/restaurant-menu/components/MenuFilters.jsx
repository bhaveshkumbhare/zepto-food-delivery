import React from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MenuFilters = ({ 
  searchQuery, 
  onSearchChange, 
  activeFilters, 
  onFilterChange,
  onClearFilters 
}) => {
  const dietaryFilters = [
    { id: 'vegetarian', label: 'Vegetarian', icon: 'Leaf' },
    { id: 'vegan', label: 'Vegan', icon: 'Sprout' },
    { id: 'gluten-free', label: 'Gluten Free', icon: 'Shield' },
  ];

  const sortOptions = [
    { id: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { id: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { id: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { id: 'rating', label: 'Highest Rated', icon: 'Star' },
  ];

  const hasActiveFilters = activeFilters?.dietary?.length > 0 || activeFilters?.sort !== 'popular';

  return (
    <div className="bg-card rounded-lg shadow-soft p-4 mb-6">
      {/* Search */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Filters */}
      <div className="space-y-4">
        {/* Dietary Filters */}
        <div>
          <h3 className="font-body font-semibold text-foreground mb-2">
            Dietary Preferences
          </h3>
          <div className="flex flex-wrap gap-2">
            {dietaryFilters?.map((filter) => (
              <Button
                key={filter?.id}
                variant={activeFilters?.dietary?.includes(filter?.id) ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange('dietary', filter?.id)}
                iconName={filter?.icon}
                iconPosition="left"
              >
                {filter?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <h3 className="font-body font-semibold text-foreground mb-2">
            Sort By
          </h3>
          <div className="flex flex-wrap gap-2">
            {sortOptions?.map((option) => (
              <Button
                key={option?.id}
                variant={activeFilters?.sort === option?.id ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange('sort', option?.id)}
                iconName={option?.icon}
                iconPosition="left"
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuFilters;