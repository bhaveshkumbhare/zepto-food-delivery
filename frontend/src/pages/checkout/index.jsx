import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import OrderSummary from './components/OrderSummary';
import PaymentMethods from './components/PaymentMethods';
import DeliveryDetails from './components/DeliveryDetails';
import OrderPlacement from './components/OrderPlacement';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card-1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Mock order data - in real app this would come from cart context/state
  const orderData = {
    restaurant: {
      id: 'rest-1',
      name: 'Pizza Palace',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      address: '123 Main Street, Downtown',
      rating: 4.8
    },
    items: [
      {
        id: 'item-1',
        name: 'Margherita Pizza',
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&h=200&fit=crop',
        price: 16.99,
        quantity: 1,
        customizations: ['Extra cheese', 'Thin crust']
      },
      {
        id: 'item-2',
        name: 'Caesar Salad',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&h=200&fit=crop',
        price: 12.99,
        quantity: 1,
        customizations: ['No croutons', 'Extra dressing']
      },
      {
        id: 'item-3',
        name: 'Garlic Bread',
        image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=200&h=200&fit=crop',
        price: 6.99,
        quantity: 2,
        customizations: []
      }
    ],
    subtotal: 43.96,
    deliveryFee: 3.99,
    tax: 3.84,
    total: 51.79
  };

  const deliveryInfo = {
    address: {
      label: 'Home',
      street: '456 Oak Avenue',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102'
    },
    contact: {
      phone: '+1 (555) 123-4567'
    },
    estimatedTime: 25,
    distance: 2.3,
    instructions: 'Ring doorbell twice. Leave at door if no answer.'
  };

  const steps = [
    { id: 1, title: 'Review Order', icon: 'ShoppingCart' },
    { id: 2, title: 'Payment & Delivery', icon: 'CreditCard' },
    { id: 3, title: 'Confirmation', icon: 'CheckCircle' }
  ];

  useEffect(() => {
    // Check if user came from cart, otherwise redirect
    if (!location?.state?.fromCart) {
      // In real app, check if cart has items
      console.log('User accessed checkout directly');
    }
  }, [location]);

  const handleEditOrder = () => {
    navigate('/shopping-cart');
  };

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleAddPayment = () => {
    console.log('Add new payment method');
  };

  const handleUpdateAddress = () => {
    console.log('Update delivery address');
  };

  const handleUpdateContact = () => {
    console.log('Update contact information');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock order creation
      const orderId = 'ORD-' + Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase();
      
      // Navigate to order tracking with order details
      navigate('/order-tracking', {
        state: {
          orderId,
          orderData,
          deliveryInfo,
          paymentMethod: selectedPaymentMethod,
          estimatedDelivery: new Date(Date.now() + (deliveryInfo.estimatedTime * 60 * 1000))
        }
      });
    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToCart = () => {
    navigate('/shopping-cart');
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Checkout - ZeptoFood</title>
        <meta name="description" content="Complete your food order securely with multiple payment options and real-time delivery tracking." />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Progress Steps */}
        <div className="bg-card border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              {steps?.map((step, index) => (
                <React.Fragment key={step?.id}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step?.id
                        ? 'bg-primary text-white' :'bg-muted text-muted-foreground'
                    }`}>
                      <Icon name={step?.icon} size={20} />
                    </div>
                    <div className="hidden sm:block">
                      <div className={`font-body font-medium ${
                        currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step?.title}
                      </div>
                    </div>
                  </div>
                  {index < steps?.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step?.id ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleBackToCart}
              iconName="ArrowLeft"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Back to Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <OrderSummary
                orderData={orderData}
                onEditOrder={handleEditOrder}
              />

              {/* Payment Methods */}
              <PaymentMethods
                selectedMethod={selectedPaymentMethod}
                onMethodSelect={handlePaymentMethodSelect}
                onAddPayment={handleAddPayment}
              />

              {/* Delivery Details */}
              <DeliveryDetails
                deliveryInfo={deliveryInfo}
                onUpdateAddress={handleUpdateAddress}
                onUpdateContact={handleUpdateContact}
              />
            </div>

            {/* Right Column - Order Placement */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderPlacement
                  orderTotal={orderData?.total}
                  onPlaceOrder={handlePlaceOrder}
                  isProcessing={isProcessing}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Order Summary Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-elevated z-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-body font-medium text-foreground">
                Total: ${orderData?.total?.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">
                {orderData?.items?.reduce((sum, item) => sum + item?.quantity, 0)} items
              </div>
            </div>
            <Button
              variant="default"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              loading={isProcessing}
              iconName="CreditCard"
              iconPosition="left"
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000">
            <div className="bg-card rounded-lg p-8 max-w-sm mx-4 text-center shadow-elevated">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="CreditCard" size={32} className="text-primary animate-pulse" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                Processing Payment
              </h3>
              <p className="text-muted-foreground mb-4">
                Please wait while we securely process your payment...
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;