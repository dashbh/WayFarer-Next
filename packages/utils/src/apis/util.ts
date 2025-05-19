import useSWR from 'swr';

/**
 * Fetcher function for SWR
 */
const fetcher = async (url: string) => {
  const res = await fetch(url);
  
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }
  
  return res.json();
};

/**
 * Direct API call without SWR caching
 */
const fetchDirectly = async (url: string) => {
  try {
    return await fetcher(url);
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export interface UseApiOptions {
  useSWR?: boolean;
  swrConfig?: object;
}

/**
 * Base hook factory for all API endpoints
 * @param keyGenerator Function to generate the SWR cache key
 * @param fetchFunction Custom fetcher function (optional)
 * @param defaultConfig Default configuration for the hook
 */
export function createApiHook<T, Args extends any[]>(
  keyGenerator: (...args: Args) => string | null,
  fetchFunction?: (...args: Args) => Promise<T>,
  defaultConfig: UseApiOptions = { 
    useSWR: true, 
    swrConfig: { revalidateOnFocus: false, dedupingInterval: 3600000 } // Default 1 hour cache
  }
) {
  return function useApi(...args: [...Args, UseApiOptions?]) {
    // Extract options if provided as last argument
    let apiArgs = [...args] as Args;
    let options = { ...defaultConfig };
    
    if (args.length > 0) {
      const lastArg = args[args.length - 1];
      if (lastArg && typeof lastArg === 'object' && !Array.isArray(lastArg) && 
          ('useSWR' in lastArg || 'swrConfig' in lastArg)) {
        apiArgs = args.slice(0, -1) as Args;
        options = { ...defaultConfig, ...lastArg };
      }
    }
    
    const cacheKey = keyGenerator(...apiArgs);
    const { useSWR: useCache = true, swrConfig = {} } = options;
    
    // Define the data fetching function
    const dataFetcher = async () => {
      if (fetchFunction) {
        return await fetchFunction(...apiArgs);
      } else if (cacheKey) {
        return await fetchDirectly(cacheKey);
      }
      return null;
    };
    
    // Use SWR if requested
    const { data, error, isLoading, mutate } = useSWR(
      useCache ? cacheKey : null,
      fetchFunction ? () => fetchFunction(...apiArgs) : fetcher,
      swrConfig
    );
    
    // Function to get real-time data regardless of cache
    const fetchRealTimeData = async () => {
      return await dataFetcher();
    };
    
    return {
      data: data as T,
      isLoading,
      error,
      refetch: useCache ? mutate : fetchRealTimeData
    };
  };
}
