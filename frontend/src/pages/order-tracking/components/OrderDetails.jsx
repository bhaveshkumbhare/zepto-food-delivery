import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderDetails = ({ order }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Order Details</h2>
        <div className="text-sm text-muted-foreground">
          Order #{order?.id}
        </div>
      </div>
      {/* Restaurant Info */}
      <div className="flex items-center space-x-4 mb-6 p-4 bg-muted rounded-lg">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image 
            src={order?.restaurant?.image}
            alt={order?.restaurant?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-body font-semibold text-foreground truncate">
            {order?.restaurant?.name}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground truncate">
              {order?.restaurant?.address}
            </span>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-sm text-muted-foreground">{order?.restaurant?.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Phone" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{order?.restaurant?.phone}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Order Items */}
      <div className="space-y-4 mb-6">
        <h3 className="font-body font-semibold text-foreground">Items Ordered</h3>
        {order?.items?.map((item) => (
          <div key={item?.id} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image 
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-medium text-foreground truncate">
                  {item?.name}
                </h4>
                {item?.customizations && item?.customizations?.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {item?.customizations?.join(', ')}
                  </p>
                )}
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-muted-foreground">Qty: {item?.quantity}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm font-medium text-foreground">
                    {formatPrice(item?.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Delivery Address */}
      <div className="mb-6">
        <h3 className="font-body font-semibold text-foreground mb-3">Delivery Address</h3>
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-body font-medium text-foreground">{order?.deliveryAddress?.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {order?.deliveryAddress?.street}
              </p>
              <p className="text-sm text-muted-foreground">
                {order?.deliveryAddress?.city}, {order?.deliveryAddress?.state} {order?.deliveryAddress?.zipCode}
              </p>
              {order?.deliveryAddress?.instructions && (
                <div className="mt-2 p-2 bg-warning/10 rounded border border-warning/20">
                  <div className="flex items-start space-x-2">
                    <Icon name="MessageSquare" size={14} className="text-warning mt-0.5" />
                    <p className="text-sm text-warning">
                      <span className="font-medium">Delivery Instructions:</span> {order?.deliveryAddress?.instructions}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Order Summary */}
      <div className="border-t border-border pt-4">
        <h3 className="font-body font-semibold text-foreground mb-3">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">{formatPrice(order?.summary?.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className="text-foreground">{formatPrice(order?.summary?.deliveryFee)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="text-foreground">{formatPrice(order?.summary?.tax)}</span>
          </div>
          {order?.summary?.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-success">Discount</span>
              <span className="text-success">-{formatPrice(order?.summary?.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">{formatPrice(order?.summary?.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;