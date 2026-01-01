"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Building2, Smartphone, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function MakePaymentPage() {
  const searchParams = useSearchParams();
  const paymentType = searchParams?.get("type") || "tuition";
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState("card");

  const paymentItems = {
    tuition: { name: "Tuition Fees", amount: 150000, description: "2025/2026 Academic Session" },
    hostel: { name: "Hostel Accommodation", amount: 45000, description: "Full Year Payment" },
    exam: { name: "Examination Fees", amount: 5000, description: "Per Semester" },
    library: { name: "Library Fees", amount: 3000, description: "Annual Subscription" },
    medical: { name: "Medical Fees", amount: 2500, description: "Health Insurance" },
  };

  const selectedItem = paymentItems[paymentType as keyof typeof paymentItems] || paymentItems.tuition;

  const handlePayment = () => {
    toast({
      title: "Payment Processing",
      description: "Your payment is being processed. Please wait...",
    });

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: `Your ${selectedItem.name} payment of ₦${selectedItem.amount.toLocaleString()} has been processed successfully.`,
        variant: "success",
      });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Make Payment</h1>
          <p className="text-muted-foreground">Complete your fee payment securely</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Review your payment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{selectedItem.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">₦{selectedItem.amount.toLocaleString()}</p>
                    <Badge variant="secondary">Due Now</Badge>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800 dark:text-yellow-200">
                    <p className="font-medium mb-1">Important Notice</p>
                    <p>Please ensure all payment details are correct. Payment confirmation may take up to 24 hours.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedMethod} onValueChange={setSelectedMethod}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card">Card</TabsTrigger>
                    <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                    <TabsTrigger value="ussd">USSD</TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                        <CreditCard className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" maxLength={5} />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" maxLength={3} type="password" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" placeholder="Name on card" />
                    </div>
                  </TabsContent>

                  <TabsContent value="bank" className="space-y-4 mt-4">
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-medium">University Bank Account</p>
                          <p className="text-sm text-muted-foreground">Transfer to the account below</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Bank Name:</span>
                          <span className="font-medium">First Bank of Nigeria</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Account Number:</span>
                          <span className="font-medium">1234567890</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Account Name:</span>
                          <span className="font-medium">University Portal Fees</span>
                        </div>
                      </div>
                      <div className="bg-muted p-3 rounded text-sm">
                        <p className="font-medium mb-1">Important:</p>
                        <p>Use your matriculation number as payment reference: STU/2023/001</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="ussd" className="space-y-4 mt-4">
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-medium">USSD Payment</p>
                          <p className="text-sm text-muted-foreground">Dial the code on your phone</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-muted p-4 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground mb-2">Dial on your phone</p>
                          <p className="text-3xl font-bold">*737*50*1234#</p>
                        </div>
                        <div className="text-sm space-y-2">
                          <p>1. Dial the code above on your registered phone number</p>
                          <p>2. Follow the prompts on your phone</p>
                          <p>3. Enter your payment PIN to complete</p>
                          <p className="text-muted-foreground">Available on: GTBank, Zenith, Access, UBA</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₦{selectedItem.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing Fee</span>
                    <span>₦100</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₦{(selectedItem.amount + 100).toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handlePayment}>
                  Pay ₦{(selectedItem.amount + 100).toLocaleString()}
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  <p>Your payment is secured with 256-bit SSL encryption</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  Contact the Bursary department for payment assistance
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
