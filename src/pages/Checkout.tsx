import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, getCart } from '@/lib/cart';
// Removed orders import - functionality simplified

// Local type definitions
interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface PaymentMethod {
  type: 'credit_card' | 'paypal' | 'cash_on_delivery';
  details: {
    lastFourDigits: string;
    cardType: string;
    email?: string;
  };
}

import { Loader2, CreditCard, Truck, Package, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';
import { useAuthContext } from '@/lib/AuthProvider';

const Checkout: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // 1: Cart Summary, 2: Shipping, 3: Payment, 4: Confirmation
  const [processingOrder, setProcessingOrder] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // Form states
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: user?.displayName || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'credit_card',
    details: {
      lastFourDigits: '',
      cardType: 'visa',
    }
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const cartItems = await getCart();
      if (cartItems.length === 0) {
        toast.error('Your cart is empty');
        navigate('/dashboard/marketplace');
        return;
      }
      setCart(cartItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart items');
    } finally {
      setLoading(false);
    }
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!shippingAddress.fullName || !shippingAddress.addressLine1 || 
        !shippingAddress.city || !shippingAddress.state || 
        !shippingAddress.postalCode || !shippingAddress.phone) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep(3);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation for credit card
    if (paymentMethod.type === 'credit_card') {
      if (!paymentMethod.details?.lastFourDigits || paymentMethod.details.lastFourDigits.length !== 4) {
        toast.error('Please enter the last 4 digits of your card');
        return;
      }
    }
    setStep(4);
  };

  const handlePlaceOrder = async () => {
    setProcessingOrder(true);
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Order placed successfully!');
      // Navigate back to marketplace instead of orders
      navigate('/dashboard/marketplace');
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    } finally {
      setProcessingOrder(false);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateTax = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal * 0.08).toFixed(2); // 8% tax
  };

  const calculateShipping = () => {
    return '5.00'; // Flat $5 shipping
  };

  const calculateGrandTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = parseFloat(calculateTax());
    const shipping = parseFloat(calculateShipping());
    return (subtotal + tax + shipping).toFixed(2);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-500">Complete your purchase</p>
        </div>

        {/* Checkout Steps */}
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-1/2 h-0.5 w-full bg-gray-200 -z-10" />
          
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="mt-2 text-sm">Cart</span>
          </div>
          
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="mt-2 text-sm">Shipping</span>
          </div>
          
          <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              3
            </div>
            <span className="mt-2 text-sm">Payment</span>
          </div>
          
          <div className={`flex flex-col items-center ${step >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              4
            </div>
            <span className="mt-2 text-sm">Confirmation</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Step 1: Cart Summary */}
              {step === 1 && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Cart Summary</h2>
                  <div className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      <div key={item.id} className="py-4 flex items-start">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3 className="line-clamp-1">{item.title}</h3>
                              <p className="ml-4">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm mt-2">
                            <p className="text-gray-500">Qty {item.quantity}</p>
                            <p className="text-gray-500">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button onClick={() => setStep(2)}>Continue to Shipping</Button>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping */}
              {step === 2 && (
                <form onSubmit={handleShippingSubmit} className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={shippingAddress.fullName}
                        onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="addressLine1">Address Line 1</Label>
                      <Input
                        id="addressLine1"
                        value={shippingAddress.addressLine1}
                        onChange={(e) => setShippingAddress({...shippingAddress, addressLine1: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                      <Input
                        id="addressLine2"
                        value={shippingAddress.addressLine2}
                        onChange={(e) => setShippingAddress({...shippingAddress, addressLine2: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={shippingAddress.state}
                          onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select 
                          value={shippingAddress.country}
                          onValueChange={(value) => setShippingAddress({...shippingAddress, country: value})}
                        >
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="submit">Continue to Payment</Button>
                  </div>
                </form>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <form onSubmit={handlePaymentSubmit} className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
                  
                  <RadioGroup 
                    value={paymentMethod.type} 
                    onValueChange={(value: any) => setPaymentMethod({ 
                      ...paymentMethod, 
                      type: value 
                    })}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-4">
                      <RadioGroupItem value="credit_card" id="credit_card" />
                      <Label htmlFor="credit_card" className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Credit Card
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-4">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>

                    <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-4">
                      <RadioGroupItem value="cash_on_delivery" id="cash_on_delivery" />
                      <Label htmlFor="cash_on_delivery">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod.type === 'credit_card' && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="cardType">Card Type</Label>
                        <Select 
                          value={paymentMethod.details?.cardType || 'visa'}
                          onValueChange={(value) => setPaymentMethod({
                            ...paymentMethod, 
                            details: { ...paymentMethod.details, cardType: value }
                          })}
                        >
                          <SelectTrigger id="cardType">
                            <SelectValue placeholder="Select card type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="visa">Visa</SelectItem>
                            <SelectItem value="mastercard">Mastercard</SelectItem>
                            <SelectItem value="amex">American Express</SelectItem>
                            <SelectItem value="discover">Discover</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="lastFourDigits">Last 4 Digits</Label>
                        <Input
                          id="lastFourDigits"
                          maxLength={4}
                          value={paymentMethod.details?.lastFourDigits || ''}
                          onChange={(e) => setPaymentMethod({
                            ...paymentMethod, 
                            details: { ...paymentMethod.details, lastFourDigits: e.target.value }
                          })}
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          For demo purposes, just enter any 4 digits
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod.type === 'paypal' && (
                    <div className="mt-4">
                      <Label htmlFor="paypalEmail">PayPal Email</Label>
                      <Input
                        id="paypalEmail"
                        type="email"
                        value={paymentMethod.details?.email || ''}
                        onChange={(e) => setPaymentMethod({
                          ...paymentMethod, 
                          details: { ...paymentMethod.details, email: e.target.value }
                        })}
                        required
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button type="submit">Review Order</Button>
                  </div>
                </form>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Order Confirmation</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 flex items-center">
                        <Package className="h-5 w-5 mr-2" />
                        Order Summary
                      </h3>
                      <div className="mt-2 border border-gray-200 rounded-md p-4 divide-y divide-gray-200">
                        {cart.map((item) => (
                          <div key={item.id} className="py-2 flex justify-between">
                            <div>
                              <span className="font-medium">{item.title}</span>
                              <span className="text-gray-500 ml-2">x{item.quantity}</span>
                            </div>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 flex items-center">
                        <Truck className="h-5 w-5 mr-2" />
                        Shipping Address
                      </h3>
                      <div className="mt-2 border border-gray-200 rounded-md p-4">
                        <p>{shippingAddress.fullName}</p>
                        <p>{shippingAddress.addressLine1}</p>
                        {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                        <p>
                          {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                        </p>
                        <p>{shippingAddress.country}</p>
                        <p>Phone: {shippingAddress.phone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Payment Method
                      </h3>
                      <div className="mt-2 border border-gray-200 rounded-md p-4">
                        {paymentMethod.type === 'credit_card' && (
                          <p>
                            {paymentMethod.details?.cardType?.toUpperCase()} ending in {paymentMethod.details?.lastFourDigits}
                          </p>
                        )}
                        {paymentMethod.type === 'paypal' && (
                          <p>PayPal ({paymentMethod.details?.email})</p>
                        )}
                        {paymentMethod.type === 'cash_on_delivery' && (
                          <p>Cash on Delivery</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setStep(3)}>
                      Back
                    </Button>
                    <Button 
                      onClick={handlePlaceOrder} 
                      disabled={processingOrder}
                      className="flex items-center"
                    >
                      {processingOrder ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>${calculateTax()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>${calculateShipping()}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${calculateGrandTotal()}</span>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <p className="flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Free shipping on orders over $100
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 