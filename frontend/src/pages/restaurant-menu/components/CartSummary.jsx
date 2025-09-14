import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartSummary = ({ cart, restaurant, isVisible }) => {
  const navigate = useNavigate();

  if (!cart || cart?.items?.length === 0) {
    return null;
  }

  const handleViewCart = () => {
    navigate('/shopping-cart');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const meetsMinimum = cart?.subtotal >= restaurant?.minimumOrder;

  return (
    <>
      {/* Desktop Cart Summary */}
      <div className={`hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 w-80 bg-card rounded-lg shadow-elevated border border-border z-50 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-lg text-foreground">
              Your Order
            </h3>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="ShoppingCart" size={16} />
              <span className="font-body text-sm">{cart?.itemCount} items</span>
            </div>
          </div>

          {/* Cart Items */}
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {cart?.items?.map((item) => (
              <div key={`${item?.id}-${item?.customizations || 'default'}`} className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-body font-medium text-foreground text-sm">
                    {item?.name}
                  </h4>
                  {item?.customizations && (
                    <p className="text-muted-foreground text-xs">
                      {item?.customizations}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-body text-sm text-muted-foreground">
                    {item?.quantity}x
                  </span>
                  <span className="font-body font-semibold text-foreground">
                    ${(item?.price * item?.quantity)?.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-body text-muted-foreground">Subtotal:</span>
              <span className="font-body font-semibold text-foreground">
                ${cart?.subtotal?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-body text-muted-foreground">Delivery Fee:</span>
              <span className="font-body font-semibold text-foreground">
                {restaurant?.deliveryFee === 0 ? 'Free' : `$${restaurant?.deliveryFee?.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between items-center text-lg border-t border-border pt-2">
              <span className="font-heading font-bold text-foreground">Total:</span>
              <span className="font-heading font-bold text-foreground">
                ${cart?.total?.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Minimum Order Warning */}
          {!meetsMinimum && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mt-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
                <span className="text-warning font-body text-sm">
                  Add ${(restaurant?.minimumOrder - cart?.subtotal)?.toFixed(2)} more for minimum order
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 mt-4">
            <Button
              variant="outline"
              fullWidth
              onClick={handleViewCart}
              iconName="ShoppingCart"
              iconPosition="left"
            >
              View Cart
            </Button>
            <Button
              variant="default"
              fullWidth
              onClick={handleCheckout}
              disabled={!meetsMinimum}
              iconName="CreditCard"
              iconPosition="left"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Cart Summary */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevated z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="ShoppingCart" size={20} color="var(--color-primary)" />
              <span className="font-body font-semibold text-foreground">
                {cart?.itemCount} items
              </span>
            </div>
            <div className="text-right">
              <div className="font-heading font-bold text-lg text-foreground">
                ${cart?.total?.toFixed(2)}
              </div>
              {!meetsMinimum && (
                <div className="text-warning text-xs font-body">
                  ${(restaurant?.minimumOrder - cart?.subtotal)?.toFixed(2)} more needed
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleViewCart}
              className="flex-1"
              iconName="ShoppingCart"
              iconPosition="left"
            >
              View Cart
            </Button>
            <Button
              variant="default"
              onClick={handleCheckout}
              disabled={!meetsMinimum}
              className="flex-1"
              iconName="CreditCard"
              iconPosition="left"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSummary;