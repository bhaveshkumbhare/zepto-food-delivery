import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MenuItemCard = ({ item, onAddToCart, onCustomize }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    if (item?.hasCustomizations) {
      onCustomize(item);
    } else {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onAddToCart(item, newQuantity);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(0, quantity + change);
    setQuantity(newQuantity);
    onAddToCart(item, newQuantity);
  };

  const getDietaryIcon = (type) => {
    switch (type) {
      case 'vegetarian':
        return { name: 'Leaf', color: '#27AE60' };
      case 'vegan':
        return { name: 'Sprout', color: '#27AE60' };
      case 'gluten-free':
        return { name: 'Shield', color: '#F39C12' };
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-soft overflow-hidden hover:shadow-elevated transition-smooth">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-48 h-48 md:h-32 overflow-hidden flex-shrink-0">
          <Image
            src={item?.image}
            alt={item?.name}
            className="w-full h-full object-cover"
          />
          {item?.isPopular && (
            <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium">
              Popular
            </div>
          )}
          {item?.discount && (
            <div className="absolute top-2 right-2 bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-medium">
              {item?.discount}% OFF
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-heading font-semibold text-foreground text-lg">
                  {item?.name}
                </h3>
                {item?.dietaryInfo?.map((diet, index) => {
                  const icon = getDietaryIcon(diet);
                  return icon ? (
                    <Icon
                      key={index}
                      name={icon?.name}
                      size={16}
                      color={icon?.color}
                      className="flex-shrink-0"
                    />
                  ) : null;
                })}
              </div>
              
              <p className="text-muted-foreground font-body text-sm mb-2 line-clamp-2">
                {item?.description}
              </p>

              {/* Rating and Prep Time */}
              <div className="flex items-center space-x-4 mb-3">
                {item?.rating && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} color="#F39C12" className="fill-current" />
                    <span className="text-sm font-body text-foreground">
                      {item?.rating}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span className="text-sm font-body">{item?.prepTime}</span>
                </div>
              </div>

              {/* Customization Options */}
              {item?.hasCustomizations && (
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Settings" size={14} color="var(--color-muted-foreground)" />
                  <span className="text-sm text-muted-foreground font-body">
                    Customizable
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {item?.originalPrice && item?.originalPrice > item?.price && (
                <span className="text-muted-foreground font-body text-sm line-through">
                  ${item?.originalPrice?.toFixed(2)}
                </span>
              )}
              <span className="text-foreground font-heading font-bold text-lg">
                ${item?.price?.toFixed(2)}
              </span>
            </div>

            {quantity === 0 ? (
              <Button
                variant="default"
                onClick={handleAddToCart}
                iconName="Plus"
                iconPosition="left"
                size="sm"
              >
                Add
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-8"
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="font-body font-semibold text-foreground min-w-[2rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;