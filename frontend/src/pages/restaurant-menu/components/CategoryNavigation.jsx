import React, { useEffect, useRef } from 'react';
import Button from '../../../components/ui/Button';

const CategoryNavigation = ({ categories, activeCategory, onCategoryChange }) => {
  const navRef = useRef(null);
  const activeButtonRef = useRef(null);

  useEffect(() => {
    if (activeButtonRef?.current && navRef?.current) {
      const nav = navRef?.current;
      const activeButton = activeButtonRef?.current;
      const navRect = nav?.getBoundingClientRect();
      const buttonRect = activeButton?.getBoundingClientRect();
      
      const scrollLeft = buttonRect?.left - navRect?.left + nav?.scrollLeft - (navRect?.width / 2) + (buttonRect?.width / 2);
      nav?.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-16 bg-background/95 backdrop-blur-sm border-b border-border z-40 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav 
          ref={navRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories?.map((category) => (
            <Button
              key={category?.id}
              ref={activeCategory === category?.id ? activeButtonRef : null}
              variant={activeCategory === category?.id ? "default" : "outline"}
              onClick={() => onCategoryChange(category?.id)}
              className="whitespace-nowrap flex-shrink-0"
            >
              {category?.name}
              <span className="ml-2 text-xs opacity-75">
                ({category?.itemCount})
              </span>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoryNavigation;