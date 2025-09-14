import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SpecialInstructions = ({ instructions, onUpdateInstructions }) => {
  const [localInstructions, setLocalInstructions] = useState(instructions || '');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInstructionsChange = (e) => {
    const value = e?.target?.value;
    setLocalInstructions(value);
    onUpdateInstructions(value);
  };

  const commonInstructions = [
    "Leave at door",
    "Ring doorbell",
    "Call when arrived",
    "Don't ring doorbell",
    "Meet at lobby",
    "Extra napkins please",
    "No onions",
    "Extra spicy",
    "Light on sauce"
  ];

  const handleQuickInstruction = (instruction) => {
    const newInstructions = localInstructions 
      ? `${localInstructions}, ${instruction}`
      : instruction;
    setLocalInstructions(newInstructions);
    onUpdateInstructions(newInstructions);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              Special Instructions
            </h3>
            <p className="text-muted-foreground text-sm">
              Optional notes for restaurant and delivery
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary text-sm font-medium hover:text-primary/80 transition-smooth"
        >
          {isExpanded ? 'Hide suggestions' : 'Show suggestions'}
        </button>
      </div>
      {/* Instructions Textarea */}
      <div className="mb-4">
        <textarea
          value={localInstructions}
          onChange={handleInstructionsChange}
          placeholder="Add any special requests for your order..."
          className="w-full p-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
          rows={3}
          maxLength={200}
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-muted-foreground text-xs">
            Be specific to help ensure your order is prepared correctly
          </p>
          <p className="text-muted-foreground text-xs">
            {localInstructions?.length}/200
          </p>
        </div>
      </div>
      {/* Quick Instructions */}
      {isExpanded && (
        <div className="space-y-3">
          <div>
            <h4 className="font-body font-medium text-foreground text-sm mb-2">
              Delivery Instructions
            </h4>
            <div className="flex flex-wrap gap-2">
              {commonInstructions?.slice(0, 5)?.map((instruction, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickInstruction(instruction)}
                  className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted hover:bg-muted/80 hover:text-foreground rounded-full transition-smooth"
                >
                  {instruction}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-body font-medium text-foreground text-sm mb-2">
              Food Preferences
            </h4>
            <div className="flex flex-wrap gap-2">
              {commonInstructions?.slice(5)?.map((instruction, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickInstruction(instruction)}
                  className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted hover:bg-muted/80 hover:text-foreground rounded-full transition-smooth"
                >
                  {instruction}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Instructions Preview */}
      {localInstructions && (
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="FileText" size={16} className="text-primary mt-0.5" />
            <div className="flex-1">
              <p className="font-body font-medium text-foreground text-sm mb-1">
                Your Instructions
              </p>
              <p className="font-body text-muted-foreground text-sm">
                {localInstructions}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialInstructions;