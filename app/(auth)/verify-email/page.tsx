"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import { authService } from "@/lib/services";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage('No verification token found in the URL. Please check your email for the complete verification link, or request a new verification email.');
        return;
      }

      try {
        await authService.verifyEmail({ token });
        setStatus('success');
        setMessage('Your email has been successfully verified! You can now sign in to your account.');

        // Auto redirect to login after 5 seconds
        setTimeout(() => {
          router.push('/login');
        }, 5000);
      } catch (error: unknown) {
        setStatus('error');
        const errorMessage = error && typeof error === 'object' && 'message' in error
          ? String((error as { message: string }).message)
          : 'Email verification failed. The link may be expired or invalid.';
        setMessage(errorMessage);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case 'error':
        return <XCircle className="h-12 w-12 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-muted rounded-full">
              <Mail className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>
            {status === 'loading' && 'Verifying your email address...'}
            {status === 'success' && 'Email verified successfully!'}
            {status === 'error' && (message.includes('No verification token') 
              ? 'Verification link incomplete'
              : 'Verification failed'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="flex justify-center">
            {getStatusIcon()}
          </div>

          <div className={`text-sm ${getStatusColor()}`}>
            {message}
          </div>

          {status === 'success' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You will be redirected to the login page in a few seconds...
              </p>
              <Button asChild className="w-full">
                <Link href="/login">
                  Continue to Login
                </Link>
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {message.includes('No verification token') 
                  ? 'Make sure you clicked the complete link from your email.'
                  : 'If your verification link has expired, you can request a new one.'
                }
              </p>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/resend-verification">
                    Request New Link
                  </Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/login">
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {status === 'loading' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please wait while we verify your email address...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card className="mt-4 w-full max-w-md bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-center text-sm text-muted-foreground mb-2">
            Having trouble? Contact our support team for assistance.
          </p>
          {status === 'error' && message.includes('No verification token') && (
            <p className="text-center text-sm text-muted-foreground">
              <strong>Tip:</strong> Make sure you copied the complete link from your email. It should include <code>?token=...</code> at the end.
            </p>
          )}
        </CardContent>
      </Card>
    </AuthLayout>
  );
}