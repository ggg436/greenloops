import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { sendCoffeePoints, getCoffeePointsBalance } from '@/lib/coffeePoints';
import { useAuthContext } from '@/lib/AuthProvider';
import { toast } from 'sonner';

interface CoffeeIconProps {
  toUserId: string;
  toUserName: string;
  productId?: string;
  productTitle?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onPointsSent?: () => void;
}

export const CoffeeIcon: React.FC<CoffeeIconProps> = ({
  toUserId,
  toUserName,
  productId,
  productTitle,
  className = '',
  size = 'md',
  onPointsSent
}) => {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [points, setPoints] = useState(1);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userBalance, setUserBalance] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleOpen = async () => {
    if (!user) {
      toast.error('Please log in to send coffee points');
      return;
    }

    if (user.uid === toUserId) {
      toast.error('You cannot send coffee points to yourself');
      return;
    }

    // Get user's coffee points balance
    const balance = await getCoffeePointsBalance();
    setUserBalance(balance);
    setIsOpen(true);
  };

  const handleSendCoffee = async () => {
    if (points <= 0) {
      toast.error('Please enter a valid number of points');
      return;
    }

    if (points > userBalance) {
      toast.error(`Insufficient coffee points. You have ${userBalance} points.`);
      return;
    }

    setIsLoading(true);
    try {
      const success = await sendCoffeePoints(
        toUserId,
        toUserName,
        points,
        productId,
        productTitle,
        message
      );

      if (success) {
        setIsOpen(false);
        setPoints(1);
        setMessage('');
        // Update balance
        const newBalance = await getCoffeePointsBalance();
        setUserBalance(newBalance);
        // Call the callback to refresh parent component
        if (onPointsSent) {
          onPointsSent();
        }
      }
    } catch (error) {
      console.error('Error sending coffee points:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpen}
          className={`p-2 hover:bg-orange-50 hover:text-orange-600 transition-colors ${className}`}
          title="Send coffee points"
        >
          <Coffee className={sizeClasses[size]} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-orange-600" />
            Send Coffee Points
          </DialogTitle>
          <DialogDescription>
            Show your appreciation to {toUserName} by sending coffee points!
            {productTitle && (
              <span className="block mt-1 text-sm text-gray-500">
                For: {productTitle}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Coffee Points to Send
            </label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                type="number"
                min="1"
                max={userBalance}
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value) || 1)}
                className="flex-1"
              />
              <span className="text-sm text-gray-500">
                / {userBalance} available
              </span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">
              Message (optional)
            </label>
            <Textarea
              placeholder="Add a personal message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendCoffee}
            disabled={isLoading || points <= 0 || points > userBalance}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isLoading ? 'Sending...' : `Send ${points} Coffee Points`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 