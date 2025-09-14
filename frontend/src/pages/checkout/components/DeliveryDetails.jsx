import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeliveryDetails = ({ deliveryInfo, onUpdateAddress, onUpdateContact }) => {
  const [showAddressEdit, setShowAddressEdit] = useState(false);
  const [showContactEdit, setShowContactEdit] = useState(false);
  const [instructions, setInstructions] = useState(deliveryInfo?.instructions || '');

  const handleAddressEdit = () => {
    setShowAddressEdit(!showAddressEdit);
  };

  const handleContactEdit = () => {
    setShowContactEdit(!showContactEdit);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <h2 className="text-xl font-heading font-bold text-foreground mb-6">Delivery Details</h2>
      {/* Delivery Address */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-body font-semibold text-foreground">Delivery Address</h3>
          <Button
            variant="ghost"
            onClick={handleAddressEdit}
            iconName="Edit2"
            iconPosition="left"
            size="sm"
          >
            Edit
          </Button>
        </div>

        {!showAddressEdit ? (
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="MapPin" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-body font-medium text-foreground">{deliveryInfo?.address?.label}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {deliveryInfo?.address?.street}, {deliveryInfo?.address?.city}, {deliveryInfo?.address?.state} {deliveryInfo?.address?.zipCode}
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-sm text-success">
                    <Icon name="Clock" size={14} />
                    <span>Est. {deliveryInfo?.estimatedTime} mins</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Icon name="Navigation" size={14} />
                    <span>{deliveryInfo?.distance} miles away</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-muted rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Street Address
              </label>
              <input
                type="text"
                defaultValue={deliveryInfo?.address?.street}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  City
                </label>
                <input
                  type="text"
                  defaultValue={deliveryInfo?.address?.city}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  defaultValue={deliveryInfo?.address?.zipCode}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={() => {
                  onUpdateAddress();
                  setShowAddressEdit(false);
                }}
                size="sm"
              >
                Save Address
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddressEdit(false)}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Contact Information */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-body font-semibold text-foreground">Contact Information</h3>
          <Button
            variant="ghost"
            onClick={handleContactEdit}
            iconName="Edit2"
            iconPosition="left"
            size="sm"
          >
            Edit
          </Button>
        </div>

        {!showContactEdit ? (
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Icon name="Phone" size={20} className="text-success" />
              </div>
              <div>
                <div className="font-body font-medium text-foreground">{deliveryInfo?.contact?.phone}</div>
                <div className="text-sm text-muted-foreground">For delivery coordination</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-muted rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue={deliveryInfo?.contact?.phone}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
              />
            </div>
            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={() => {
                  onUpdateContact();
                  setShowContactEdit(false);
                }}
                size="sm"
              >
                Save Contact
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowContactEdit(false)}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Special Instructions */}
      <div className="mb-6">
        <h3 className="font-body font-semibold text-foreground mb-3">Special Instructions</h3>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e?.target?.value)}
          placeholder="Add any special delivery instructions (e.g., ring doorbell, leave at door, etc.)"
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
        />
        <div className="text-sm text-muted-foreground mt-2">
          {instructions?.length}/200 characters
        </div>
      </div>
      {/* Delivery Time Options */}
      <div>
        <h3 className="font-body font-semibold text-foreground mb-3">Delivery Time</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 border-2 border-primary bg-primary/5 rounded-lg cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <div>
                <div className="font-body font-medium text-foreground">ASAP</div>
                <div className="text-sm text-muted-foreground">Est. {deliveryInfo?.estimatedTime} mins</div>
              </div>
            </div>
          </div>
          <div className="p-4 border-2 border-border bg-background rounded-lg cursor-pointer hover:border-primary/50 transition-smooth">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full border-2 border-border bg-background"></div>
              <div>
                <div className="font-body font-medium text-foreground">Schedule</div>
                <div className="text-sm text-muted-foreground">Choose time slot</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;