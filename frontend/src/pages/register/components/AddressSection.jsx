import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddressSection = () => {
  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setAddressData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const detectLocation = async () => {
    setIsDetectingLocation(true);
    setLocationError('');

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true
        });
      });

      // Mock reverse geocoding API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock address data based on coordinates
      const mockAddress = {
        street: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'United States'
      };

      setAddressData(mockAddress);
    } catch (error) {
      setLocationError('Unable to detect your location. Please enter your address manually.');
      console.error('Geolocation error:', error);
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const addressSuggestions = [
    '123 Main Street, San Francisco, CA 94102',
    '456 Oak Avenue, San Francisco, CA 94103',
    '789 Pine Street, San Francisco, CA 94104'
  ];

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Set Your Delivery Address
        </h3>
        <p className="text-sm text-muted-foreground">
          We'll use this to show you nearby restaurants and calculate delivery times
        </p>
      </div>
      {/* Location Detection */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={20} className="text-primary" />
            <span className="font-medium text-foreground">Quick Setup</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={detectLocation}
            loading={isDetectingLocation}
            disabled={isDetectingLocation}
            iconName="Crosshair"
            iconPosition="left"
          >
            {isDetectingLocation ? 'Detecting...' : 'Use My Location'}
          </Button>
        </div>
        
        {locationError && (
          <div className="flex items-start space-x-2 text-sm text-red-600">
            <Icon name="AlertCircle" size={16} className="mt-0.5 flex-shrink-0" />
            <span>{locationError}</span>
          </div>
        )}
      </div>
      {/* Manual Address Entry */}
      <div className="space-y-4">
        <Input
          label="Street Address"
          type="text"
          name="street"
          placeholder="Enter your street address"
          value={addressData?.street}
          onChange={handleInputChange}
          className="w-full"
        />

        {/* Address Suggestions */}
        {addressData?.street && addressData?.street?.length > 3 && (
          <div className="bg-card border border-border rounded-lg shadow-soft">
            <div className="p-2">
              <div className="text-xs text-muted-foreground mb-2 px-2">Suggestions:</div>
              {addressSuggestions?.filter(suggestion => 
                  suggestion?.toLowerCase()?.includes(addressData?.street?.toLowerCase())
                )?.slice(0, 3)?.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      const parts = suggestion?.split(', ');
                      setAddressData({
                        street: parts?.[0],
                        city: parts?.[1],
                        state: parts?.[2]?.split(' ')?.[0] || '',
                        zipCode: parts?.[2]?.split(' ')?.[1] || '',
                        country: 'United States'
                      });
                    }}
                    className="w-full text-left px-2 py-2 text-sm text-foreground hover:bg-muted rounded transition-smooth"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={14} className="text-muted-foreground" />
                      <span>{suggestion}</span>
                    </div>
                  </button>
                ))
              }
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            type="text"
            name="city"
            placeholder="City"
            value={addressData?.city}
            onChange={handleInputChange}
          />
          
          <Input
            label="State"
            type="text"
            name="state"
            placeholder="State"
            value={addressData?.state}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="ZIP Code"
            type="text"
            name="zipCode"
            placeholder="ZIP Code"
            value={addressData?.zipCode}
            onChange={handleInputChange}
          />
          
          <Input
            label="Country"
            type="text"
            name="country"
            value={addressData?.country}
            onChange={handleInputChange}
            disabled
          />
        </div>
      </div>
      {/* Address Preview */}
      {(addressData?.street || addressData?.city) && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Home" size={20} className="text-primary mt-0.5" />
            <div>
              <div className="font-medium text-foreground mb-1">Delivery Address</div>
              <div className="text-sm text-muted-foreground">
                {addressData?.street && <div>{addressData?.street}</div>}
                <div>
                  {[addressData?.city, addressData?.state, addressData?.zipCode]?.filter(Boolean)?.join(', ')}
                </div>
                {addressData?.country && <div>{addressData?.country}</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSection;