import { useState, useCallback } from "react";
import { toast } from "sonner";

interface UseApiOptions<T = unknown> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useApi<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (
      apiCall: () => Promise<T>,
      options?: UseApiOptions<T>
    ): Promise<T | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await apiCall();
        setData(result);

        if (options?.successMessage) {
          toast.success(options.successMessage);
        }

        if (options?.onSuccess) {
          options.onSuccess(result);
        }

        return result;
      } catch (err) {
        setError(err);

        // Extract error message
        const errorMessage =
          options?.errorMessage ||
          (err &&
          typeof err === "object" &&
          "error" in err &&
          err.error &&
          typeof err.error === "object" &&
          "message" in err.error
            ? String(err.error.message)
            : "An error occurred. Please try again.");

        toast.error(errorMessage);

        if (options?.onError) {
          options.onError(err);
        }

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    error,
    isLoading,
    execute,
    reset,
  };
}
