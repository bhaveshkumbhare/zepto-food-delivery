import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ 
  subtotal, 
  deliveryFee, 
  tax, 
  discount, 
  total, 
  onApplyPromoCode,
  onProceedToCheckout,
  isMinimumOrderMet,
  minimumOrderAmount 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const formatPrice = (price) => {
    return `$${price?.toFixed(2)}`;
  };

  const handleApplyPromoCode = async () => {
    if (!promoCode?.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setIsApplyingPromo(true);
    setPromoError('');
    setPromoSuccess('');

    // Mock promo code validation
    setTimeout(() => {
      const validPromoCodes = ['SAVE10', 'WELCOME20', 'FREESHIP'];
      
      if (validPromoCodes?.includes(promoCode?.toUpperCase())) {
        setPromoSuccess(`Promo code "${promoCode}" applied successfully!`);
        onApplyPromoCode(promoCode);
        setPromoCode('');
      } else {
        setPromoError('Invalid promo code. Please try again.');
      }
      
      setIsApplyingPromo(false);
    }, 1000);
  };

  const summaryItems = [
    { label: 'Subtotal', value: subtotal, isSubtotal: true },
    { label: 'Delivery Fee', value: deliveryFee },
    { label: 'Tax', value: tax },
    ...(discount > 0 ? [{ label: 'Discount', value: -discount, isDiscount: true }] : [])
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <h2 className="font-heading font-bold text-xl text-foreground mb-6">
        Order Summary
      </h2>
      {/* Order Items Summary */}
      <div className="space-y-3 mb-6">
        {summaryItems?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className={`font-body ${
              item?.isSubtotal ? 'font-semibold text-foreground' : 'text-muted-foreground'
            }`}>
              {item?.label}
            </span>
            <span className={`font-body font-medium ${
              item?.isDiscount 
                ? 'text-success' 
                : item?.isSubtotal 
                  ? 'text-foreground font-semibold' 
                  : 'text-foreground'
            }`}>
              {item?.isDiscount ? '-' : ''}{formatPrice(Math.abs(item?.value))}
            </span>
          </div>
        ))}
      </div>
      {/* Promo Code Section */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Tag" size={18} className="text-primary" />
          <span className="font-body font-medium text-foreground">
            Promo Code
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e?.target?.value?.toUpperCase())}
            error={promoError}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={handleApplyPromoCode}
            loading={isApplyingPromo}
            disabled={!promoCode?.trim() || isApplyingPromo}
            className="px-4"
          >
            Apply
          </Button>
        </div>
        
        {promoSuccess && (
          <div className="flex items-center space-x-2 mt-2 text-success text-sm">
            <Icon name="CheckCircle" size={16} />
            <span>{promoSuccess}</span>
          </div>
        )}
      </div>
      {/* Total */}
      <div className="border-t border-border pt-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="font-heading font-bold text-xl text-foreground">
            Total
          </span>
          <span className="font-heading font-bold text-xl text-primary">
            {formatPrice(total)}
          </span>
        </div>
      </div>
      {/* Minimum Order Warning */}
      {!isMinimumOrderMet && (
        <div className="mb-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={18} className="text-warning mt-0.5" />
            <div>
              <p className="font-body font-medium text-warning text-sm">
                Minimum order not met
              </p>
              <p className="font-body text-warning/80 text-xs mt-1">
                Add {formatPrice(minimumOrderAmount - subtotal)} more to proceed
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Checkout Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        onClick={onProceedToCheckout}
        disabled={!isMinimumOrderMet}
        iconName="ArrowRight"
        iconPosition="right"
        className="font-heading font-semibold"
      >
        Proceed to Checkout
      </Button>
      {/* Estimated Delivery Time */}
      <div className="mt-4 flex items-center justify-center space-x-2 text-muted-foreground text-sm">
        <Icon name="Clock" size={16} />
        <span>Estimated delivery: 25-35 minutes</span>
      </div>
    </div>
  );
};

export default OrderSummary;