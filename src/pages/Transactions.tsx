
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Eye, Filter, Download, Plus } from 'lucide-react';

const transactions = [
  { 
    id: 'TXN-001', 
    type: 'Fertilizer Purchase', 
    amount: '$249.94', 
    date: 'Jan 17, 2025', 
    status: 'Completed', 
    vendor: 'AgriSupply',
    description: 'Organic fertilizer for winter crops',
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'TXN-002', 
    type: 'Seed Order', 
    amount: '$182.94', 
    date: 'Jan 17, 2025', 
    status: 'Completed', 
    vendor: 'CropCorp',
    description: 'Premium wheat seeds - 50kg',
    paymentMethod: 'Bank Transfer'
  },
  { 
    id: 'TXN-003', 
    type: 'Equipment Rental', 
    amount: '$99.00', 
    date: 'Jan 17, 2025', 
    status: 'Completed', 
    vendor: 'FarmTech',
    description: 'Tractor rental for 2 days',
    paymentMethod: 'Cash'
  },
  { 
    id: 'TXN-004', 
    type: 'Pesticide Purchase', 
    amount: '$199.24', 
    date: 'Jan 17, 2025', 
    status: 'Pending', 
    vendor: 'GreenCare',
    description: 'Organic pest control solution',
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'TXN-005', 
    type: 'Crop Sale', 
    amount: '+$1,250.00', 
    date: 'Jan 16, 2025', 
    status: 'Completed', 
    vendor: 'Local Market',
    description: 'Vegetable harvest sale',
    paymentMethod: 'Bank Transfer'
  },
];

const Transactions = () => {
  const navigate = useNavigate();

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

  const handleViewTransaction = (transactionId: string) => {
    navigate(`/dashboard/transactions/${transactionId}`);
  };

  return (
    <>
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-zinc-900">Transactions</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
            <p className="text-sm text-gray-600">View and manage your transaction history</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.vendor}</TableCell>
                    <TableCell className={transaction.amount.startsWith('+') ? 'text-green-600 font-medium' : 'font-medium'}>
                      {transaction.amount}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewTransaction(transaction.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Transactions;
