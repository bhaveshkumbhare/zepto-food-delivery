import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderActions = ({ order, onReorder, onRateOrder, onShareOrder }) => {
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  const handleRatingSubmit = async () => {
    if (rating === 0) return;
    
    setIsSubmittingRating(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmittingRating(false);
      setShowRating(false);
      onRateOrder({ rating, review });
      alert('Thank you for your feedback!');
    }, 1500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My ZeptoFood Order',
        text: `I ordered from ${order?.restaurant?.name} on ZeptoFood!`,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard?.writeText(window.location?.href);
      alert('Order link copied to clipboard!');
    }
  };

  const isDelivered = order?.status === 'delivered';
  const canReorder = true;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <h2 className="text-xl font-heading font-bold text-foreground mb-6">Order Actions</h2>
      <div className="space-y-4">
        {/* Reorder Button */}
        <Button
          variant="default"
          onClick={onReorder}
          disabled={!canReorder}
          iconName="RotateCcw"
          iconPosition="left"
          className="w-full justify-center"
        >
          Reorder Same Items
        </Button>

        {/* Rate Order Button - Only show if delivered */}
        {isDelivered && (
          <Button
            variant="outline"
            onClick={() => setShowRating(true)}
            iconName="Star"
            iconPosition="left"
            className="w-full justify-center"
          >
            Rate Your Order
          </Button>
        )}

        {/* Share Order Button */}
        <Button
          variant="ghost"
          onClick={handleShare}
          iconName="Share2"
          iconPosition="left"
          className="w-full justify-center"
        >
          Share Order
        </Button>

        {/* Download Receipt */}
        <Button
          variant="ghost"
          onClick={() => window.print()}
          iconName="Download"
          iconPosition="left"
          className="w-full justify-center"
        >
          Download Receipt
        </Button>
      </div>
      {/* Order History Link */}
      <div className="mt-6 pt-6 border-t border-border">
        <button className="w-full p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-smooth">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="History" size={18} className="text-muted-foreground" />
              <span className="font-body font-medium text-foreground">View Order History</span>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </div>
        </button>
      </div>
      {/* Rating Modal */}
      {showRating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full shadow-elevated">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-foreground">Rate Your Order</h3>
              <button
                onClick={() => setShowRating(false)}
                className="p-1 rounded-lg hover:bg-muted transition-smooth"
              >
                <Icon name="X" size={20} className="text-muted-foreground" />
              </button>
            </div>

            {/* Restaurant Info */}
            <div className="flex items-center space-x-3 mb-6 p-3 bg-muted rounded-lg">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Store" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-body font-medium text-foreground">{order?.restaurant?.name}</h4>
                <p className="text-sm text-muted-foreground">Order #{order?.id}</p>
              </div>
            </div>

            {/* Star Rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-3">
                How was your experience?
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 transition-smooth hover:scale-110"
                  >
                    <Icon
                      name="Star"
                      size={32}
                      className={`${
                        star <= rating
                          ? 'text-warning fill-current' :'text-border hover:text-warning/50'
                      } transition-smooth`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </p>
              )}
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Leave a review (optional)
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e?.target?.value)}
                placeholder="Tell us about your experience..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowRating(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleRatingSubmit}
                disabled={rating === 0 || isSubmittingRating}
                loading={isSubmittingRating}
                className="flex-1"
              >
                Submit Rating
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderActions;