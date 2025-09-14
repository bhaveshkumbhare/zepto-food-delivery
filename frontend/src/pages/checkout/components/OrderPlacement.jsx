import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const OrderPlacement = ({ orderTotal, onPlaceOrder, isProcessing }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    // Mock promo code validation
    if (promoCode?.toLowerCase() === 'save10') {
      setPromoApplied(true);
      setDiscount(orderTotal * 0.1);
    } else if (promoCode?.toLowerCase() === 'welcome20') {
      setPromoApplied(true);
      setDiscount(orderTotal * 0.2);
    } else {
      alert('Invalid promo code. Try "SAVE10" or "WELCOME20"');
    }
  };

  const finalTotal = orderTotal - discount;

  const handlePlaceOrder = () => {
    if (!termsAccepted) {
      alert('Please accept the terms and conditions to continue.');
      return;
    }
    onPlaceOrder();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <h2 className="text-xl font-heading font-bold text-foreground mb-6">Complete Order</h2>
      {/* Promo Code Section */}
      <div className="mb-6">
        <h3 className="font-body font-semibold text-foreground mb-3">Promo Code</h3>
        <div className="flex space-x-3">
          <div className="flex-1">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e?.target?.value)}
              placeholder="Enter promo code"
              disabled={promoApplied}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <Button
            variant={promoApplied ? "success" : "outline"}
            onClick={handleApplyPromo}
            disabled={!promoCode || promoApplied}
            iconName={promoApplied ? "Check" : "Tag"}
            iconPosition="left"
          >
            {promoApplied ? 'Applied' : 'Apply'}
          </Button>
        </div>
        {promoApplied && (
          <div className="mt-2 p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2 text-success">
              <Icon name="CheckCircle" size={16} />
              <span className="font-body font-medium">Promo code applied successfully!</span>
            </div>
            <div className="text-sm text-success mt-1">
              You saved ${discount?.toFixed(2)} on this order
            </div>
          </div>
        )}
      </div>
      {/* Final Total */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <div className="space-y-2">
          <div className="flex justify-between text-foreground">
            <span className="font-body">Order Total</span>
            <span className="font-medium">${orderTotal?.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-success">
              <span className="font-body">Discount</span>
              <span className="font-medium">-${discount?.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-xl font-heading font-bold text-foreground pt-2 border-t border-border">
            <span>Final Total</span>
            <span>${finalTotal?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="mb-6">
        <Checkbox
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e?.target?.checked)}
          label={
            <span className="text-sm text-foreground">
              I agree to the{' '}
              <button className="text-primary hover:text-primary/80 underline font-medium">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-primary hover:text-primary/80 underline font-medium">
                Privacy Policy
              </button>
            </span>
          }
          required
        />
      </div>
      {/* Place Order Button */}
      <Button
        variant="default"
        onClick={handlePlaceOrder}
        disabled={!termsAccepted || isProcessing}
        loading={isProcessing}
        iconName={isProcessing ? undefined : "CreditCard"}
        iconPosition="left"
        size="lg"
        fullWidth
        className="mb-4"
      >
        {isProcessing ? 'Processing Payment...' : `Place Order • $${finalTotal?.toFixed(2)}`}
      </Button>
      {/* Security Information */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-2">
          <Icon name="Shield" size={16} />
          <span>Your payment information is secure and encrypted</span>
        </div>
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <span>SSL Protected</span>
          <span>•</span>
          <span>PCI Compliant</span>
          <span>•</span>
          <span>256-bit Encryption</span>
        </div>
      </div>
      {/* Order Processing Info */}
      {isProcessing && (
        <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2 text-warning">
            <Icon name="Clock" size={16} />
            <span className="font-body font-medium">Processing your order...</span>
          </div>
          <div className="text-sm text-warning mt-1">
            Please do not refresh or close this page while we process your payment.
          </div>
        </div>
      )}
      {/* Help Section */}
      <div className="mt-6 pt-4 border-t border-border text-center">
        <div className="text-sm text-muted-foreground mb-2">
          Need help with your order?
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button className="flex items-center space-x-1 text-primary hover:text-primary/80 text-sm font-medium transition-smooth">
            <Icon name="MessageCircle" size={14} />
            <span>Live Chat</span>
          </button>
          <button className="flex items-center space-x-1 text-primary hover:text-primary/80 text-sm font-medium transition-smooth">
            <Icon name="Phone" size={14} />
            <span>Call Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacement;