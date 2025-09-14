import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, onEditCustomization }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      onRemove(item?.id);
    } else {
      onUpdateQuantity(item?.id, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return `$${price?.toFixed(2)}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 transition-smooth hover:shadow-soft">
      <div className="flex items-start space-x-4">
        {/* Item Image */}
        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
          <Image
            src={item?.image}
            alt={item?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-foreground text-lg mb-1">
                {item?.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-2">
                {item?.restaurant}
              </p>
              
              {/* Customizations */}
              {item?.customizations && item?.customizations?.length > 0 && (
                <div className="mb-3">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center space-x-1 text-primary text-sm font-medium hover:text-primary/80 transition-smooth"
                  >
                    <span>Customizations</span>
                    <Icon 
                      name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                    />
                  </button>
                  
                  {isExpanded && (
                    <div className="mt-2 space-y-1">
                      {item?.customizations?.map((custom, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {custom?.category}: {custom?.option}
                          </span>
                          {custom?.price > 0 && (
                            <span className="text-foreground font-medium">
                              +{formatPrice(custom?.price)}
                            </span>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => onEditCustomization(item?.id)}
                        className="text-primary text-sm font-medium hover:text-primary/80 transition-smooth mt-2"
                      >
                        Edit customizations
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="font-heading font-bold text-lg text-foreground">
                  {formatPrice(item?.price)}
                </span>
                {item?.originalPrice && item?.originalPrice > item?.price && (
                  <span className="text-muted-foreground text-sm line-through">
                    {formatPrice(item?.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item?.id)}
              iconName="Trash2"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            />
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(item?.quantity - 1)}
                iconName="Minus"
                className="w-8 h-8 p-0"
                disabled={item?.quantity <= 1}
              />
              <span className="font-heading font-semibold text-lg min-w-[2rem] text-center">
                {item?.quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(item?.quantity + 1)}
                iconName="Plus"
                className="w-8 h-8 p-0"
              />
            </div>

            {/* Item Total */}
            <div className="text-right">
              <p className="font-heading font-bold text-lg text-foreground">
                {formatPrice(item?.price * item?.quantity)}
              </p>
              <p className="text-muted-foreground text-sm">
                {item?.quantity} × {formatPrice(item?.price)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;