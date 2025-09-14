import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentMethods = ({ selectedMethod, onMethodSelect, onAddPayment }) => {
  const [showAddCard, setShowAddCard] = useState(false);

  const paymentMethods = [
    {
      id: 'card-1',
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true
    },
    {
      id: 'card-2',
      type: 'card',
      brand: 'mastercard',
      last4: '8888',
      expiryMonth: '08',
      expiryYear: '2026',
      isDefault: false
    },
    {
      id: 'paypal',
      type: 'paypal',
      email: 'john.doe@example.com',
      isDefault: false
    },
    {
      id: 'apple-pay',
      type: 'apple-pay',
      isDefault: false
    }
  ];

  const getPaymentIcon = (method) => {
    switch (method?.type) {
      case 'card':
        return method?.brand === 'visa' ? 'CreditCard' : 'CreditCard';
      case 'paypal':
        return 'Wallet';
      case 'apple-pay':
        return 'Smartphone';
      default:
        return 'CreditCard';
    }
  };

  const getPaymentLabel = (method) => {
    switch (method?.type) {
      case 'card':
        return `•••• •••• •••• ${method?.last4}`;
      case 'paypal':
        return method?.email;
      case 'apple-pay':
        return 'Apple Pay';
      default:
        return 'Payment Method';
    }
  };

  const getBrandColor = (brand) => {
    switch (brand) {
      case 'visa':
        return 'text-blue-600';
      case 'mastercard':
        return 'text-red-600';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Payment Method</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm font-body text-success">SSL Secured</span>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        {paymentMethods?.map((method) => (
          <div
            key={method?.id}
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
              selectedMethod === method?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 bg-background'
            }`}
            onClick={() => onMethodSelect(method?.id)}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                selectedMethod === method?.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={getPaymentIcon(method)} size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`font-body font-medium ${
                    method?.type === 'card' ? getBrandColor(method?.brand) : 'text-foreground'
                  }`}>
                    {getPaymentLabel(method)}
                  </span>
                  {method?.isDefault && (
                    <span className="px-2 py-1 text-xs font-caption bg-success/10 text-success rounded-full">
                      Default
                    </span>
                  )}
                </div>
                {method?.type === 'card' && (
                  <span className="text-sm text-muted-foreground">
                    Expires {method?.expiryMonth}/{method?.expiryYear}
                  </span>
                )}
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === method?.id
                  ? 'border-primary bg-primary' :'border-border bg-background'
              }`}>
                {selectedMethod === method?.id && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Add New Payment Method */}
      <Button
        variant="outline"
        onClick={() => setShowAddCard(!showAddCard)}
        iconName="Plus"
        iconPosition="left"
        className="w-full"
      >
        Add New Payment Method
      </Button>
      {/* Quick Add Card Form */}
      {showAddCard && (
        <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <Button
              variant="default"
              onClick={() => {
                onAddPayment();
                setShowAddCard(false);
              }}
              className="flex-1"
            >
              Add Card
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAddCard(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} />
          <span>256-bit SSL</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Lock" size={16} />
          <span>PCI Compliant</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="CheckCircle" size={16} />
          <span>Verified</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;