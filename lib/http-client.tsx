import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { HttpClient, CacheConfig } from "@skymfe/core-library";

interface HttpClientContextValue {
  httpClient: HttpClient;
}

const HttpClientContext = createContext<HttpClientContextValue | null>(null);

interface HttpClientProviderProps {
  baseUrl: string;
  children: React.ReactNode;
}

export const HttpClientProvider = ({ baseUrl, children }: HttpClientProviderProps) => {
  const httpClient = useRef(new HttpClient(baseUrl)).current;

  const value = {
    httpClient,
  };

  return <HttpClientContext.Provider value={value}>{children}</HttpClientContext.Provider>;
};

const useHttpClient = () => {
  const context = useContext(HttpClientContext);
  if (!context) {
    throw new Error("useHttpClient must be used within a HttpClientProvider");
  }
  return context;
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface QueryOptions<T> {
  method?: HttpMethod;
  cacheConfig?: CacheConfig;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

interface QueryResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useQuery<T>(url: string, options: QueryOptions<T> = {}): QueryResult<T> {
  const { httpClient } = useHttpClient();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (options.enabled === false) return;

    try {
      setLoading(true);
      setError(null);

      let result: T;
      switch (options.method || "GET") {
        case "GET":
          result = await httpClient.get<T>(url, options.cacheConfig);
          break;
        case "POST":
          result = await httpClient.post<T>(url, {});
          break;
        case "PUT":
          result = await httpClient.put<T>(url, {});
          break;
        case "DELETE":
          result = await httpClient.delete<T>(url);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${options.method}`);
      }

      setData(result);
      options.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("An error occurred");
      setError(error);
      options.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [httpClient, url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

interface MutationOptions<T> {
  method?: "POST" | "PUT" | "DELETE";
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface MutationResult<T, D> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  mutate: (data: D) => Promise<void>;
  reset: () => void;
}

export function useMutation<T, D = any>(url: string, options: MutationOptions<T> = {}): MutationResult<T, D> {
  const { httpClient } = useHttpClient();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (requestData: D) => {
      try {
        setLoading(true);
        setError(null);

        let result: T;
        switch (options.method || "POST") {
          case "POST":
            result = await httpClient.post<T>(url, requestData);
            break;
          case "PUT":
            result = await httpClient.put<T>(url, requestData);
            break;
          case "DELETE":
            result = await httpClient.delete<T>(url);
            break;
          default:
            throw new Error(`Unsupported HTTP method: ${options.method}`);
        }

        setData(result);
        options.onSuccess?.(result);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("An error occurred");
        setError(error);
        options.onError?.(error);
      } finally {
        setLoading(false);
      }
    },
    [httpClient, url, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    mutate,
    reset,
  };
}
