import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactSupport = ({ orderId, onContactDriver, onCancelOrder, canCancel }) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isContactingSupport, setIsContactingSupport] = useState(false);

  const handleContactSupport = () => {
    setIsContactingSupport(true);
    // Simulate support contact
    setTimeout(() => {
      setIsContactingSupport(false);
      alert('Support chat opened! A representative will assist you shortly.');
    }, 1500);
  };

  const handleCancelOrder = () => {
    setShowCancelConfirm(false);
    onCancelOrder();
  };

  const supportOptions = [
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: 'MessageCircle',
      action: handleContactSupport,
      available: true
    },
    {
      id: 'phone',
      title: 'Call Support',
      description: '1-800-ZEPTO-FOOD',
      icon: 'Phone',
      action: () => window.open('tel:+18009378636'),
      available: true
    },
    {
      id: 'driver',
      title: 'Contact Driver',
      description: 'Message or call your driver',
      icon: 'User',
      action: onContactDriver,
      available: !!onContactDriver
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <h2 className="text-xl font-heading font-bold text-foreground mb-6">Need Help?</h2>
      {/* Support Options */}
      <div className="space-y-3 mb-6">
        {supportOptions?.map((option) => (
          <button
            key={option?.id}
            onClick={option?.action}
            disabled={!option?.available || (option?.id === 'chat' && isContactingSupport)}
            className={`w-full p-4 rounded-lg border transition-smooth text-left ${
              option?.available
                ? 'border-border hover:border-primary hover:bg-primary/5 cursor-pointer' :'border-border bg-muted cursor-not-allowed opacity-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                option?.available ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <Icon 
                  name={option?.id === 'chat' && isContactingSupport ? 'Loader2' : option?.icon} 
                  size={20} 
                  className={`${
                    option?.available ? 'text-primary' : 'text-muted-foreground'
                  } ${option?.id === 'chat' && isContactingSupport ? 'animate-spin' : ''}`}
                />
              </div>
              <div className="flex-1">
                <h3 className={`font-body font-medium ${
                  option?.available ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {option?.title}
                </h3>
                <p className={`text-sm ${
                  option?.available ? 'text-muted-foreground' : 'text-muted-foreground/60'
                }`}>
                  {option?.description}
                </p>
              </div>
              {option?.available && (
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              )}
            </div>
          </button>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="font-body font-semibold text-foreground">Quick Actions</h3>
        
        {/* Report Issue */}
        <button className="w-full p-3 rounded-lg border border-border hover:border-warning hover:bg-warning/5 transition-smooth text-left">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={18} className="text-warning" />
            <div>
              <span className="font-body font-medium text-foreground">Report an Issue</span>
              <p className="text-sm text-muted-foreground">Wrong order, missing items, etc.</p>
            </div>
          </div>
        </button>

        {/* Cancel Order */}
        {canCancel && (
          <button 
            onClick={() => setShowCancelConfirm(true)}
            className="w-full p-3 rounded-lg border border-border hover:border-destructive hover:bg-destructive/5 transition-smooth text-left"
          >
            <div className="flex items-center space-x-3">
              <Icon name="X" size={18} className="text-destructive" />
              <div>
                <span className="font-body font-medium text-foreground">Cancel Order</span>
                <p className="text-sm text-muted-foreground">Cancel within 5 minutes of ordering</p>
              </div>
            </div>
          </button>
        )}

        {/* Reorder */}
        <button className="w-full p-3 rounded-lg border border-border hover:border-success hover:bg-success/5 transition-smooth text-left">
          <div className="flex items-center space-x-3">
            <Icon name="RotateCcw" size={18} className="text-success" />
            <div>
              <span className="font-body font-medium text-foreground">Reorder</span>
              <p className="text-sm text-muted-foreground">Order the same items again</p>
            </div>
          </div>
        </button>
      </div>
      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full shadow-elevated">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} className="text-destructive" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground">Cancel Order?</h3>
                <p className="text-sm text-muted-foreground">Order #{orderId}</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to cancel this order? This action cannot be undone and you may be charged a cancellation fee.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1"
              >
                Keep Order
              </Button>
              <Button
                variant="destructive"
                onClick={handleCancelOrder}
                className="flex-1"
              >
                Cancel Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSupport;