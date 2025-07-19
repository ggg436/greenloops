
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Edit, Trash2 } from 'lucide-react';

const transactionData = {
  'TXN-001': {
    id: 'TXN-001',
    type: 'Fertilizer Purchase',
    amount: '$249.94',
    date: 'Jan 17, 2025',
    time: '10:30 AM',
    status: 'Completed',
    vendor: 'AgriSupply',
    description: 'Organic fertilizer for winter crops',
    paymentMethod: 'Credit Card',
    reference: 'REF-2025-001',
    items: [
      { name: 'Organic NPK Fertilizer', quantity: '10 bags', price: '$199.94' },
      { name: 'Delivery Charges', quantity: '1', price: '$50.00' }
    ],
    billingAddress: {
      name: 'John Farmer',
      address: '123 Farm Road, Green Valley, CA 90210',
      phone: '+1 (555) 123-4567'
    }
  },
  'TXN-002': {
    id: 'TXN-002',
    type: 'Seed Order',
    amount: '$182.94',
    date: 'Jan 17, 2025',
    time: '2:15 PM',
    status: 'Completed',
    vendor: 'CropCorp',
    description: 'Premium wheat seeds - 50kg',
    paymentMethod: 'Bank Transfer',
    reference: 'REF-2025-002',
    items: [
      { name: 'Premium Wheat Seeds', quantity: '50kg', price: '$150.00' },
      { name: 'Processing Fee', quantity: '1', price: '$32.94' }
    ],
    billingAddress: {
      name: 'John Farmer',
      address: '123 Farm Road, Green Valley, CA 90210',
      phone: '+1 (555) 123-4567'
    }
  }
};

const TransactionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const transaction = id ? transactionData[id as keyof typeof transactionData] : null;

  if (!transaction) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">Transaction not found</p>
            <div className="flex justify-center mt-4">
              <Button onClick={() => navigate('/dashboard/transactions')}>
                Back to Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/dashboard/transactions')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-zinc-900">Transaction Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Transaction Overview */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{transaction.type}</CardTitle>
                <p className="text-gray-600 mt-1">{transaction.description}</p>
              </div>
              <Badge className={getStatusColor(transaction.status)}>
                {transaction.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="font-medium">{transaction.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium text-lg">{transaction.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium">{transaction.date}</p>
                <p className="text-sm text-gray-500">{transaction.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">{transaction.paymentMethod}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Information */}
        <Card>
          <CardHeader>
            <CardTitle>Vendor Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Vendor Name</p>
                <p className="font-medium">{transaction.vendor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Reference Number</p>
                <p className="font-medium">{transaction.reference}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Item Details */}
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transaction.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">{item.price}</p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 border-t font-semibold">
                <p>Total Amount</p>
                <p>{transaction.amount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Information */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p className="font-medium">{transaction.billingAddress.name}</p>
              <p className="text-gray-600">{transaction.billingAddress.address}</p>
              <p className="text-gray-600">{transaction.billingAddress.phone}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TransactionDetails;
