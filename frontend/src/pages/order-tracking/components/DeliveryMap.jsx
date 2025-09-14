import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const DeliveryMap = ({ deliveryLocation, customerLocation, driverInfo, estimatedArrival }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-foreground">Live Tracking</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success font-medium">Live</span>
          </div>
        </div>
        {driverInfo && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="User" size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-body font-medium text-foreground">{driverInfo?.name}</p>
                <p className="text-sm text-muted-foreground">{driverInfo?.vehicle}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">ETA: {formatTime(estimatedArrival)}</p>
              <p className="text-xs text-muted-foreground">~3 min away</p>
            </div>
          </div>
        )}
      </div>
      <div className="relative h-80 bg-muted">
        {!isMapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-muted-foreground">Loading map...</span>
            </div>
          </div>
        ) : (
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Delivery Tracking Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${deliveryLocation?.lat},${deliveryLocation?.lng}&z=14&output=embed`}
            className="w-full h-full"
          />
        )}

        {/* Map Overlay Controls */}
        {isMapLoaded && (
          <div className="absolute top-4 right-4 space-y-2">
            <button className="w-10 h-10 bg-card border border-border rounded-lg shadow-soft flex items-center justify-center hover:bg-muted transition-smooth">
              <Icon name="Plus" size={16} className="text-foreground" />
            </button>
            <button className="w-10 h-10 bg-card border border-border rounded-lg shadow-soft flex items-center justify-center hover:bg-muted transition-smooth">
              <Icon name="Minus" size={16} className="text-foreground" />
            </button>
            <button className="w-10 h-10 bg-card border border-border rounded-lg shadow-soft flex items-center justify-center hover:bg-muted transition-smooth">
              <Icon name="Navigation" size={16} className="text-foreground" />
            </button>
          </div>
        )}
      </div>
      {/* Driver Contact */}
      {driverInfo && (
        <div className="p-4 border-t border-border bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Contact driver</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg bg-card border border-border hover:bg-muted transition-smooth">
                <Icon name="Phone" size={16} className="text-foreground" />
              </button>
              <button className="p-2 rounded-lg bg-card border border-border hover:bg-muted transition-smooth">
                <Icon name="MessageCircle" size={16} className="text-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Distance and Time Info */}
      <div className="p-4 bg-primary/5 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Distance</span>
            </div>
            <p className="text-lg font-bold text-primary">2.3 km</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">ETA</span>
            </div>
            <p className="text-lg font-bold text-primary">3 min</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMap;