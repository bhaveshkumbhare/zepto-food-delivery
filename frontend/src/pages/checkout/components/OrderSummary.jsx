import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ orderData, onEditOrder }) => {
  const { restaurant, items, subtotal, deliveryFee, tax, total } = orderData;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Order Summary</h2>
        <button
          onClick={onEditOrder}
          className="text-primary hover:text-primary/80 font-body font-medium transition-smooth flex items-center space-x-1"
        >
          <Icon name="Edit2" size={16} />
          <span>Edit</span>
        </button>
      </div>
      {/* Restaurant Info */}
      <div className="flex items-center space-x-3 mb-6 p-3 bg-muted rounded-lg">
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={restaurant?.image}
            alt={restaurant?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-body font-semibold text-foreground">{restaurant?.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>{restaurant?.address}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-sm">
          <Icon name="Star" size={14} className="text-warning fill-current" />
          <span className="font-medium text-foreground">{restaurant?.rating}</span>
        </div>
      </div>
      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {items?.map((item) => (
          <div key={item?.id} className="flex items-start space-x-3 py-3 border-b border-border last:border-b-0">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-body font-medium text-foreground">{item?.name}</h4>
              {item?.customizations && item?.customizations?.length > 0 && (
                <div className="mt-1">
                  {item?.customizations?.map((custom, index) => (
                    <span key={index} className="text-sm text-muted-foreground">
                      {custom}
                      {index < item?.customizations?.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Qty:</span>
                  <span className="font-medium text-foreground">{item?.quantity}</span>
                </div>
                <span className="font-body font-semibold text-foreground">${(item?.price * item?.quantity)?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Price Breakdown */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex justify-between text-foreground">
          <span className="font-body">Subtotal</span>
          <span className="font-medium">${subtotal?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-foreground">
          <span className="font-body">Delivery Fee</span>
          <span className="font-medium">${deliveryFee?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-foreground">
          <span className="font-body">Tax</span>
          <span className="font-medium">${tax?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-heading font-bold text-foreground pt-3 border-t border-border">
          <span>Total</span>
          <span>${total?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;