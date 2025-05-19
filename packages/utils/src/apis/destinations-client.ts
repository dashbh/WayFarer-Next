import { DestinationDto } from '@wayfarer/types';
import { createApiHook, UseApiOptions } from './util';

// Base API URL - should be stored in env variables in a real app
const API_BASE_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/api/catalog`;

/**
 * Hook to fetch all destinations
 */
export function useAllDestinations(options?: UseApiOptions) {
  const useApi = createApiHook<DestinationDto[] | null, []>(
    () => `${API_BASE_URL}/destinations`
  );
  
  const result = useApi(options);
  
  return {
    data: result.data as T,
    isLoading: result.isLoading,
    error: result.error,
    refetch: result.refetch
  };
}

/**
 * Hook to fetch a destination by ID
 */
export function useDestination(id: string, options?: UseApiOptions) {
  const useApi = createApiHook<DestinationDto | null, [string]>(
    (id) => id ? `${API_BASE_URL}/destinations/${id}` : null
  );
  
  const result = useApi(id, options);
  
  return {
    destination: result.data,
    isLoading: result.isLoading,
    error: result.error,
    refetch: result.refetch
  };
}

/**
 * Hook to fetch similar destinations based on provided destination IDs
 */
export function useSimilarDestinations(ids: string[], options?: UseApiOptions) {
  const fetchSimilarDestinations = async (ids: string[]) => {
    try {
      const destinations = await Promise.all(
        ids.map(async (id) => {
          const response = await fetch(`${API_BASE_URL}/destinations/${id}`);
          if (!response.ok) return null;
          return response.json();
        })
      );
      
      return destinations.filter((d): d is DestinationDto => d !== null);
    } catch (error) {
      console.error('Error fetching similar destinations:', error);
      return [];
    }
  };

  const useApi = createApiHook<DestinationDto[], [string[]]>(
    (ids) => ids.length > 0 ? `similar-destinations-${ids.join('-')}` : null,
    fetchSimilarDestinations
  );
  
  const result = useApi(ids, options);
  
  return {
    destinations: result.data || [],
    isLoading: result.isLoading,
    error: result.error,
    refetch: result.refetch
  };
}

/**
 * Hook to fetch popular destinations
 */
export function usePopularDestinations(limit: number = 3, options?: UseApiOptions) {
  const defaultConfig = { 
    useSWR: true, 
    swrConfig: { revalidateOnFocus: false, dedupingInterval: 86400000 } // 24 hour cache
  };
  
  const useApi = createApiHook<DestinationDto[], [number]>(
    (limit) => `${API_BASE_URL}/destinations?limit=${limit}`,
    undefined,
    defaultConfig
  );
  
  const result = useApi(limit, options);
  
  return {
    destinations: result.data || [],
    isLoading: result.isLoading,
    error: result.error,
    refetch: result.refetch
  };
}

// /**
//  * For backwards compatibility and direct API calls
//  * These functions can be used in scenarios where hooks aren't appropriate
//  */

// /**
//  * Fetches all destinations with optional SWR cache usage
//  */
// export async function getAllDestinations(useSWRCache = false): Promise<DestinationDto[] | null> {
//   const url = `${API_BASE_URL}/destinations`;
  
//   if (useSWRCache) {
//     // This is a hack to access SWR cache outside of a component
//     // @ts-ignore - Accessing private SWR cache
//     const cachedData = useSWR.cache?.get(url);
//     if (cachedData) return cachedData;
//   }
  
//   return fetchDirectly(url);
// }

// /**
//  * Fetches a destination by ID with optional SWR cache usage
//  */
// export async function getDestinationById(id: string, useSWRCache = false): Promise<DestinationDto | null> {
//   const url = `${API_BASE_URL}/destinations/${id}`;
  
//   if (useSWRCache) {
//     // This is a hack to access SWR cache outside of a component
//     // @ts-ignore - Accessing private SWR cache
//     const cachedData = useSWR.cache?.get(url);
//     if (cachedData) return cachedData;
//   }
  
//   return fetchDirectly(url);
// }

// /**
//  * Fetches similar destinations based on provided destination IDs
//  */
// export async function getSimilarDestinations(ids: string[], useSWRCache = false): Promise<DestinationDto[]> {
//   const cacheKey = `similar-destinations-${ids.join('-')}`;
  
//   if (useSWRCache) {
//     // This is a hack to access SWR cache outside of a component
//     // @ts-ignore - Accessing private SWR cache
//     const cachedData = useSWR.cache?.get(cacheKey);
//     if (cachedData) return cachedData;
//   }
  
//   try {
//     const destinations = await Promise.all(
//       ids.map(async (id) => {
//         const destination = await getDestinationById(id, useSWRCache);
//         return destination;
//       })
//     );
    
//     return destinations.filter((d): d is DestinationDto => d !== null);
//   } catch (error) {
//     console.error('Error fetching similar destinations:', error);
//     return [];
//   }
// }

// /**
//  * Fetches popular destinations with optional SWR cache usage
//  */
// export async function getPopularDestinations(limit: number = 3, useSWRCache = false): Promise<DestinationDto[]> {
//   const url = `${API_BASE_URL}/destinations?limit=${limit}`;
  
//   if (useSWRCache) {
//     // This is a hack to access SWR cache outside of a component
//     // @ts-ignore - Accessing private SWR cache
//     const cachedData = useSWR.cache?.get(url);
//     if (cachedData) return cachedData;
//   }
  
//   const result = await fetchDirectly(url);
//   return result || [];
// }
