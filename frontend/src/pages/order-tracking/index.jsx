import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import OrderStatusTimeline from './components/OrderStatusTimeline';
import OrderDetails from './components/OrderDetails';
import DeliveryMap from './components/DeliveryMap';
import ContactSupport from './components/ContactSupport';
import OrderActions from './components/OrderActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const OrderTracking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tracking');

  // Mock order data
  const mockOrder = {
    id: "ORD-2025-001234",
    status: "out-for-delivery", // confirmed, preparing, ready, out-for-delivery, delivered
    orderTime: new Date(Date.now() - 25 * 60000), // 25 minutes ago
    estimatedDelivery: new Date(Date.now() + 8 * 60000), // 8 minutes from now
    restaurant: {
      id: "rest-001",
      name: "Mario\'s Italian Kitchen",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      address: "123 Main Street, Downtown",
      phone: "(555) 123-4567",
      rating: 4.8
    },
    items: [
      {
        id: "item-001",
        name: "Margherita Pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&h=200&fit=crop",
        price: 18.99,
        quantity: 1,
        customizations: ["Extra cheese", "Thin crust"]
      },
      {
        id: "item-002",
        name: "Caesar Salad",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&h=200&fit=crop",
        price: 12.99,
        quantity: 1,
        customizations: ["No croutons", "Extra dressing"]
      },
      {
        id: "item-003",
        name: "Garlic Bread",
        image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=200&h=200&fit=crop",
        price: 6.99,
        quantity: 2,
        customizations: []
      }
    ],
    deliveryAddress: {
      name: "John Doe",
      street: "456 Oak Avenue, Apt 2B",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      instructions: "Ring doorbell twice. Leave at door if no answer."
    },
    summary: {
      subtotal: 45.96,
      deliveryFee: 3.99,
      tax: 4.12,
      discount: 5.00,
      total: 49.07
    },
    driver: {
      name: "Alex Rodriguez",
      phone: "(555) 987-6543",
      vehicle: "Honda Civic - ABC 123",
      rating: 4.9
    },
    deliveryLocation: {
      lat: 39.7817,
      lng: -89.6501
    },
    customerLocation: {
      lat: 39.7817,
      lng: -89.6501
    }
  };

  useEffect(() => {
    // Simulate loading order data
    const timer = setTimeout(() => {
      setCurrentOrder(mockOrder);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Real-time status updates simulation
  useEffect(() => {
    if (!currentOrder || currentOrder?.status === 'delivered') return;

    const statusUpdateInterval = setInterval(() => {
      // Simulate random status updates (in real app, this would be WebSocket)
      const random = Math.random();
      if (random > 0.95) { // 5% chance of status update
        setCurrentOrder(prev => {
          const statusFlow = ['confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered'];
          const currentIndex = statusFlow?.indexOf(prev?.status);
          if (currentIndex < statusFlow?.length - 1) {
            return {
              ...prev,
              status: statusFlow?.[currentIndex + 1]
            };
          }
          return prev;
        });
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(statusUpdateInterval);
  }, [currentOrder]);

  const handleContactDriver = () => {
    if (currentOrder?.driver) {
      alert(`Contacting ${currentOrder?.driver?.name}...`);
    }
  };

  const handleCancelOrder = () => {
    alert('Order cancelled successfully. Refund will be processed within 3-5 business days.');
    navigate('/restaurant-menu');
  };

  const handleReorder = () => {
    // In real app, this would add items to cart and navigate to checkout
    alert('Items added to cart! Redirecting to checkout...');
    navigate('/shopping-cart');
  };

  const handleRateOrder = ({ rating, review }) => {
    console.log('Order rated:', { rating, review });
  };

  const handleShareOrder = () => {
    console.log('Order shared');
  };

  const canCancelOrder = currentOrder?.status === 'confirmed' && 
    (Date.now() - currentOrder?.orderTime?.getTime()) < 5 * 60000; // 5 minutes

  const tabs = [
    { id: 'tracking', label: 'Live Tracking', icon: 'MapPin' },
    { id: 'details', label: 'Order Details', icon: 'FileText' },
    { id: 'support', label: 'Help & Support', icon: 'HelpCircle' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-96">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg font-medium text-foreground">Loading your order...</p>
                <p className="text-sm text-muted-foreground">Please wait while we fetch the latest updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col items-center justify-center min-h-96 space-y-6">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                <Icon name="AlertCircle" size={48} className="text-muted-foreground" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Order Not Found
                </h1>
                <p className="text-muted-foreground mb-6">
                  We couldn't find the order you're looking for. It may have been cancelled or doesn't exist.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="default"
                    onClick={() => navigate('/restaurant-menu')}
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    Browse Restaurants
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/order-history')}
                    iconName="History"
                    iconPosition="left"
                  >
                    Order History
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => navigate('/restaurant-menu')}
                className="p-2 rounded-lg border border-border hover:bg-muted transition-smooth"
              >
                <Icon name="ArrowLeft" size={20} className="text-foreground" />
              </button>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Order Tracking
                </h1>
                <p className="text-muted-foreground">
                  Track your order from {currentOrder?.restaurant?.name}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentOrder?.status === 'delivered' ?'bg-success/10 text-success border border-success/20'
                  : currentOrder?.status === 'out-for-delivery' ?'bg-primary/10 text-primary border border-primary/20' :'bg-warning/10 text-warning border border-warning/20'
              }`}>
                {currentOrder?.status === 'confirmed' && 'Order Confirmed'}
                {currentOrder?.status === 'preparing' && 'Being Prepared'}
                {currentOrder?.status === 'ready' && 'Ready for Pickup'}
                {currentOrder?.status === 'out-for-delivery' && 'Out for Delivery'}
                {currentOrder?.status === 'delivered' && 'Delivered'}
              </div>
              <span className="text-sm text-muted-foreground">
                Order #{currentOrder?.id}
              </span>
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    activeTab === tab?.id
                      ? 'bg-card text-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="hidden sm:inline">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Desktop: Left Column, Mobile: Conditional */}
            <div className={`lg:col-span-2 space-y-6 ${
              activeTab !== 'tracking' ? 'hidden lg:block' : ''
            }`}>
              <OrderStatusTimeline
                currentStatus={currentOrder?.status}
                orderTime={currentOrder?.orderTime}
                estimatedDelivery={currentOrder?.estimatedDelivery}
              />

              {(currentOrder?.status === 'out-for-delivery' || currentOrder?.status === 'delivered') && (
                <DeliveryMap
                  deliveryLocation={currentOrder?.deliveryLocation}
                  customerLocation={currentOrder?.customerLocation}
                  driverInfo={currentOrder?.driver}
                  estimatedArrival={currentOrder?.estimatedDelivery}
                />
              )}
            </div>

            {/* Order Details - Mobile: Conditional */}
            <div className={`lg:hidden ${activeTab !== 'details' ? 'hidden' : ''}`}>
              <OrderDetails order={currentOrder} />
            </div>

            {/* Support - Mobile: Conditional */}
            <div className={`lg:hidden ${activeTab !== 'support' ? 'hidden' : ''}`}>
              <ContactSupport
                orderId={currentOrder?.id}
                onContactDriver={handleContactDriver}
                onCancelOrder={handleCancelOrder}
                canCancel={canCancelOrder}
              />
            </div>

            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block space-y-6">
              <OrderDetails order={currentOrder} />
              
              <ContactSupport
                orderId={currentOrder?.id}
                onContactDriver={handleContactDriver}
                onCancelOrder={handleCancelOrder}
                canCancel={canCancelOrder}
              />

              <OrderActions
                order={currentOrder}
                onReorder={handleReorder}
                onRateOrder={handleRateOrder}
                onShareOrder={handleShareOrder}
              />
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="lg:hidden mt-8 space-y-4">
            <OrderActions
              order={currentOrder}
              onReorder={handleReorder}
              onRateOrder={handleRateOrder}
              onShareOrder={handleShareOrder}
            />
          </div>

          {/* Emergency Contact - Always Visible */}
          {currentOrder?.status !== 'delivered' && (
            <div className="mt-8 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
                <div className="flex-1">
                  <h3 className="font-body font-medium text-foreground">Emergency?</h3>
                  <p className="text-sm text-muted-foreground">
                    For urgent issues, call our 24/7 support line
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => window.open('tel:+18009378636')}
                  iconName="Phone"
                  iconPosition="left"
                >
                  Call Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;