import React from 'react';
import MenuItemCard from './MenuItemCard';

const MenuSection = ({ category, items, onAddToCart, onCustomizeItem }) => {
  if (!items || items?.length === 0) {
    return null;
  }

  return (
    <section id={`category-${category?.id}`} className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-1">
            {category?.name}
          </h2>
          {category?.description && (
            <p className="text-muted-foreground font-body">
              {category?.description}
            </p>
          )}
        </div>
        <div className="text-muted-foreground font-body text-sm">
          {items?.length} items
        </div>
      </div>
      <div className="grid gap-4">
        {items?.map((item) => (
          <MenuItemCard
            key={item?.id}
            item={item}
            onAddToCart={onAddToCart}
            onCustomize={onCustomizeItem}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;