import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import DeliveryAddress from './components/DeliveryAddress';
import SpecialInstructions from './components/SpecialInstructions';
import EmptyCart from './components/EmptyCart';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      restaurant: "Tony\'s Italian Kitchen",
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
      price: 16.99,
      originalPrice: 18.99,
      quantity: 2,
      customizations: [
        { category: "Size", option: "Large", price: 3.00 },
        { category: "Crust", option: "Thin Crust", price: 0 },
        { category: "Extra Toppings", option: "Extra Cheese", price: 2.50 }
      ]
    },
    {
      id: 2,
      name: "Caesar Salad",
      restaurant: "Tony\'s Italian Kitchen",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
      price: 12.99,
      quantity: 1,
      customizations: [
        { category: "Protein", option: "Grilled Chicken", price: 4.00 },
        { category: "Dressing", option: "On the side", price: 0 }
      ]
    },
    {
      id: 3,
      name: "Chocolate Brownie",
      restaurant: "Sweet Treats Bakery",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
      price: 6.99,
      quantity: 1,
      customizations: []
    }
  ];

  const mockDeliveryAddress = {
    type: "Home",
    street: "123 Oak Street, Apt 4B",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    phone: "(555) 123-4567",
    instructions: "Ring doorbell twice, leave at door if no answer"
  };

  // Load cart data on component mount
  useEffect(() => {
    const loadCartData = () => {
      setTimeout(() => {
        setCartItems(mockCartItems);
        setIsLoading(false);
      }, 500);
    };

    loadCartData();
  }, []);

  // Calculate order totals
  const calculateTotals = () => {
    const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
    const deliveryFee = subtotal > 25 ? 0 : 3.99;
    const tax = subtotal * 0.08875; // 8.875% tax rate
    
    let discount = 0;
    if (appliedPromoCode) {
      switch (appliedPromoCode?.toUpperCase()) {
        case 'SAVE10':
          discount = subtotal * 0.10;
          break;
        case 'WELCOME20':
          discount = subtotal * 0.20;
          break;
        case 'FREESHIP':
          discount = deliveryFee;
          break;
        default:
          discount = 0;
      }
    }

    const total = subtotal + deliveryFee + tax - discount;
    const minimumOrderAmount = 15.00;
    const isMinimumOrderMet = subtotal >= minimumOrderAmount;

    return {
      subtotal,
      deliveryFee,
      tax,
      discount,
      total,
      minimumOrderAmount,
      isMinimumOrderMet
    };
  };

  const totals = calculateTotals();

  // Cart item handlers
  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems?.map(item =>
        item?.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems?.filter(item => item?.id !== itemId));
  };

  const handleEditCustomization = (itemId) => {
    // In a real app, this would open a customization modal
    console.log('Edit customization for item:', itemId);
  };

  const handleApplyPromoCode = (promoCode) => {
    setAppliedPromoCode(promoCode);
  };

  const handleEditAddress = () => {
    // In a real app, this would open address selection/editing
    console.log('Edit delivery address');
  };

  const handleUpdateInstructions = (instructions) => {
    setSpecialInstructions(instructions);
  };

  const handleProceedToCheckout = () => {
    if (totals?.isMinimumOrderMet) {
      navigate('/checkout', {
        state: {
          cartItems,
          totals,
          deliveryAddress: mockDeliveryAddress,
          specialInstructions,
          appliedPromoCode
        }
      });
    }
  };

  const handleContinueShopping = () => {
    navigate('/restaurant-menu');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="font-body text-muted-foreground">Loading your cart...</span>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <EmptyCart />
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                Your Cart
              </h1>
              <p className="font-body text-muted-foreground">
                {cartItems?.length} item{cartItems?.length !== 1 ? 's' : ''} • Review and modify your order
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={handleContinueShopping}
              iconName="ArrowLeft"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Continue Shopping
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems?.map((item) => (
                  <CartItem
                    key={item?.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                    onEditCustomization={handleEditCustomization}
                  />
                ))}
              </div>

              {/* Delivery Address */}
              <DeliveryAddress
                address={mockDeliveryAddress}
                onEditAddress={handleEditAddress}
              />

              {/* Special Instructions */}
              <SpecialInstructions
                instructions={specialInstructions}
                onUpdateInstructions={handleUpdateInstructions}
              />

              {/* Mobile Continue Shopping */}
              <div className="sm:hidden">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleContinueShopping}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={totals?.subtotal}
                deliveryFee={totals?.deliveryFee}
                tax={totals?.tax}
                discount={totals?.discount}
                total={totals?.total}
                onApplyPromoCode={handleApplyPromoCode}
                onProceedToCheckout={handleProceedToCheckout}
                isMinimumOrderMet={totals?.isMinimumOrderMet}
                minimumOrderAmount={totals?.minimumOrderAmount}
              />
            </div>
          </div>

          {/* Free Delivery Banner */}
          {totals?.subtotal < 25 && totals?.subtotal > 0 && (
            <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Truck" size={20} className="text-primary" />
                <div className="flex-1">
                  <p className="font-body font-medium text-primary">
                    Add ${(25 - totals?.subtotal)?.toFixed(2)} more for free delivery!
                  </p>
                  <p className="font-body text-primary/80 text-sm">
                    Save $3.99 on delivery fees
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;