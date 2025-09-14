import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeliveryAddress = ({ address, onEditAddress }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="MapPin" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              Delivery Address
            </h3>
            <p className="text-muted-foreground text-sm">
              Estimated delivery: 25-35 minutes
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onEditAddress}
          iconName="Edit2"
          iconPosition="left"
        >
          Change
        </Button>
      </div>
      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <Icon name="Home" size={16} className="text-muted-foreground mt-1" />
          <div className="flex-1">
            <p className="font-body font-medium text-foreground">
              {address?.type}
            </p>
            <p className="font-body text-muted-foreground text-sm">
              {address?.street}
            </p>
            <p className="font-body text-muted-foreground text-sm">
              {address?.city}, {address?.state} {address?.zipCode}
            </p>
          </div>
        </div>

        {address?.instructions && (
          <div className="flex items-start space-x-3 mt-3 pt-3 border-t border-border">
            <Icon name="MessageSquare" size={16} className="text-muted-foreground mt-1" />
            <div className="flex-1">
              <p className="font-body font-medium text-foreground text-sm mb-1">
                Delivery Instructions
              </p>
              <p className="font-body text-muted-foreground text-sm">
                {address?.instructions}
              </p>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="flex items-center space-x-3 mt-3 pt-3 border-t border-border">
          <Icon name="Phone" size={16} className="text-muted-foreground" />
          <p className="font-body text-muted-foreground text-sm">
            {address?.phone}
          </p>
        </div>

        {/* Delivery Time Options */}
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="font-body font-medium text-foreground text-sm">
                Delivery Time
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary text-sm font-medium hover:text-primary/80 transition-smooth"
            >
              {isExpanded ? 'Less options' : 'More options'}
            </button>
          </div>
          
          <p className="font-body text-muted-foreground text-sm mt-1">
            ASAP (25-35 minutes)
          </p>

          {isExpanded && (
            <div className="mt-3 space-y-2">
              <button className="w-full text-left p-2 rounded border border-border hover:bg-muted/50 transition-smooth">
                <div className="flex items-center justify-between">
                  <span className="font-body text-foreground text-sm">
                    Schedule for later
                  </span>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;