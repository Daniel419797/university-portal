"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, AlertCircle } from "lucide-react";
import { authService } from "@/lib/services";
import Link from "next/link";

const resendSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ResendFormData = z.infer<typeof resendSchema>;

export default function ResendVerificationPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');
  const [message, setMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendFormData>({
    resolver: zodResolver(resendSchema),
  });

  const onSubmit = async (data: ResendFormData) => {
    setStatus('loading');

    try {
      await authService.resendVerificationEmail({ email: data.email });

      setStatus('success');
      setMessage('Verification email request submitted successfully. Note: Email sending may not be configured in the development environment. Please contact your administrator if you continue to have issues.');
    } catch (error: unknown) {
      setStatus('error');
      const errorMessage = error && typeof error === 'object' && 'message' in error
        ? String((error as { message: string }).message)
        : 'Failed to send verification email. Please try again.';
      setMessage(errorMessage);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      default:
        return <Mail className="h-8 w-8 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-muted rounded-full">
              {getStatusIcon()}
            </div>
          </div>
          <CardTitle className="text-2xl">Resend Verification Email</CardTitle>
          <CardDescription>
            Enter your email address to receive a new verification link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@university.edu"
                {...register("email")}
                disabled={status === 'loading'}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Send Verification Email'}
            </Button>
          </form>

          {(status === 'success' || status === 'error') && (
            <div className={`text-sm ${getStatusColor()}`}>
              {message}
            </div>
          )}

          <div className="space-y-4">
            {status === 'success' && (
              <Button asChild className="w-full">
                <Link href="/login">
                  Continue to Login
                </Link>
              </Button>
            )}

            {status === 'error' && (
              <Button
                onClick={() => setStatus('idle')}
                variant="outline"
                className="w-full"
              >
                Try Again
              </Button>
            )}

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card className="mt-4 w-full max-w-md bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-center text-sm text-muted-foreground mb-2">
            Having trouble? Contact our support team for assistance.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            <strong>Note:</strong> Email functionality may not be fully configured in development environments.
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}