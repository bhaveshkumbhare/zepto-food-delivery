import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const CustomizationModal = ({ item, isOpen, onClose, onAddToCart }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!isOpen || !item) return null;

  const handleOptionChange = (groupId, optionId, isChecked) => {
    setSelectedOptions(prev => {
      const group = prev?.[groupId] || [];
      if (isChecked) {
        return { ...prev, [groupId]: [...group, optionId] };
      } else {
        return { ...prev, [groupId]: group?.filter(id => id !== optionId) };
      }
    });
  };

  const calculateTotalPrice = () => {
    let total = item?.price * quantity;
    
    item?.customizationGroups?.forEach(group => {
      const selectedInGroup = selectedOptions?.[group?.id] || [];
      selectedInGroup?.forEach(optionId => {
        const option = group?.options?.find(opt => opt?.id === optionId);
        if (option && option?.price > 0) {
          total += option?.price * quantity;
        }
      });
    });
    
    return total;
  };

  const handleAddToCart = () => {
    const customizations = [];
    
    item?.customizationGroups?.forEach(group => {
      const selectedInGroup = selectedOptions?.[group?.id] || [];
      selectedInGroup?.forEach(optionId => {
        const option = group?.options?.find(opt => opt?.id === optionId);
        if (option) {
          customizations?.push(`${group?.name}: ${option?.name}`);
        }
      });
    });

    if (specialInstructions?.trim()) {
      customizations?.push(`Special: ${specialInstructions?.trim()}`);
    }

    const customizedItem = {
      ...item,
      customizations: customizations?.join(', '),
      finalPrice: calculateTotalPrice() / quantity,
    };

    onAddToCart(customizedItem, quantity);
    onClose();
  };

  const isValidSelection = () => {
    return item?.customizationGroups?.every(group => {
      if (group?.required) {
        const selected = selectedOptions?.[group?.id] || [];
        return selected?.length >= group?.minSelections && selected?.length <= group?.maxSelections;
      }
      return true;
    }) ?? true;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Customize Your Order
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6">
            {/* Item Info */}
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                  {item?.name}
                </h3>
                <p className="text-muted-foreground font-body text-sm mb-2">
                  {item?.description}
                </p>
                <div className="text-primary font-heading font-bold">
                  ${item?.price?.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Customization Groups */}
            {item?.customizationGroups?.map((group) => (
              <div key={group?.id} className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-body font-semibold text-foreground">
                    {group?.name}
                    {group?.required && <span className="text-accent ml-1">*</span>}
                  </h4>
                  <span className="text-muted-foreground text-sm">
                    {group?.maxSelections === 1 ? 'Choose 1' : `Choose up to ${group?.maxSelections}`}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {group?.options?.map((option) => (
                    <div key={option?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={(selectedOptions?.[group?.id] || [])?.includes(option?.id)}
                          onChange={(e) => handleOptionChange(group?.id, option?.id, e?.target?.checked)}
                        />
                        <div>
                          <span className="font-body text-foreground">{option?.name}</span>
                          {option?.description && (
                            <p className="text-muted-foreground text-sm">{option?.description}</p>
                          )}
                        </div>
                      </div>
                      {option?.price > 0 && (
                        <span className="font-body font-semibold text-foreground">
                          +${option?.price?.toFixed(2)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Special Instructions */}
            <div className="mb-6">
              <h4 className="font-body font-semibold text-foreground mb-3">
                Special Instructions
              </h4>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e?.target?.value)}
                placeholder="Any special requests or dietary notes..."
                className="w-full p-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="font-body text-foreground">Quantity:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8"
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="font-body font-semibold text-foreground min-w-[2rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>
            <div className="text-right">
              <div className="font-heading font-bold text-xl text-foreground">
                ${calculateTotalPrice()?.toFixed(2)}
              </div>
            </div>
          </div>

          <Button
            variant="default"
            fullWidth
            onClick={handleAddToCart}
            disabled={!isValidSelection()}
            iconName="ShoppingCart"
            iconPosition="left"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;