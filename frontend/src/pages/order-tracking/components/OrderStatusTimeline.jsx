import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderStatusTimeline = ({ currentStatus, orderTime, estimatedDelivery }) => {
  const statusSteps = [
    {
      id: 'confirmed',
      title: 'Order Confirmed',
      description: 'Your order has been received',
      icon: 'CheckCircle',
      timestamp: orderTime,
      completed: true
    },
    {
      id: 'preparing',
      title: 'Restaurant Preparing',
      description: 'Your food is being prepared',
      icon: 'ChefHat',
      timestamp: new Date(orderTime.getTime() + 5 * 60000),
      completed: currentStatus !== 'confirmed',
      active: currentStatus === 'preparing'
    },
    {
      id: 'ready',
      title: 'Ready for Pickup',
      description: 'Food is ready for delivery',
      icon: 'Package',
      timestamp: new Date(orderTime.getTime() + 20 * 60000),
      completed: ['out-for-delivery', 'delivered']?.includes(currentStatus),
      active: currentStatus === 'ready'
    },
    {
      id: 'out-for-delivery',
      title: 'Out for Delivery',
      description: 'Your order is on the way',
      icon: 'Truck',
      timestamp: new Date(orderTime.getTime() + 25 * 60000),
      completed: currentStatus === 'delivered',
      active: currentStatus === 'out-for-delivery'
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Enjoy your meal!',
      icon: 'MapPin',
      timestamp: estimatedDelivery,
      completed: currentStatus === 'delivered',
      active: false
    }
  ];

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Order Status</h2>
        <div className="text-sm text-muted-foreground">
          Est. delivery: {formatTime(estimatedDelivery)}
        </div>
      </div>
      <div className="space-y-6">
        {statusSteps?.map((step, index) => (
          <div key={step?.id} className="relative flex items-start">
            {/* Timeline Line */}
            {index < statusSteps?.length - 1 && (
              <div 
                className={`absolute left-6 top-12 w-0.5 h-8 ${
                  step?.completed ? 'bg-success' : 'bg-border'
                }`}
              />
            )}

            {/* Status Icon */}
            <div 
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-smooth ${
                step?.completed 
                  ? 'bg-success border-success text-success-foreground' 
                  : step?.active
                    ? 'bg-primary border-primary text-primary-foreground animate-pulse'
                    : 'bg-muted border-border text-muted-foreground'
              }`}
            >
              <Icon name={step?.icon} size={20} />
            </div>

            {/* Status Content */}
            <div className="ml-4 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className={`font-body font-semibold ${
                  step?.completed || step?.active ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </h3>
                {(step?.completed || step?.active) && (
                  <span className="text-sm text-muted-foreground">
                    {formatTime(step?.timestamp)}
                  </span>
                )}
              </div>
              <p className={`text-sm mt-1 ${
                step?.completed || step?.active ? 'text-muted-foreground' : 'text-muted-foreground/60'
              }`}>
                {step?.description}
              </p>
              
              {step?.active && (
                <div className="mt-2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm text-primary font-medium">In Progress</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Estimated Time Remaining */}
      {currentStatus !== 'delivered' && (
        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              Estimated time remaining: 15-20 minutes
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatusTimeline;