import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

interface UseAppwriteOptions<T, P extends Record<string, any> | undefined> {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
}

interface UseAppwriteReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams?: P) => Promise<void>;
}

export const useAppwrite = <
  T,
  P extends Record<string, any> | undefined = undefined
>({
  fn,
  params,
  skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);
  const [lastParams, setLastParams] = useState<P | undefined>(params);

  const fetchData = useCallback(
    async (fetchParams: P | undefined) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fn(fetchParams as P);
        setData(result);
        setLastParams(fetchParams);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);

  const refetch = async (newParams?: P) => {
    await fetchData(newParams ?? lastParams);
  };

  return { data, loading, error, refetch };
};
