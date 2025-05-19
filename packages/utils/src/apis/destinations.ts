import { DestinationDto } from '@wayfarer/types';

// Base API URL - should be stored in env variables in a real app
const API_BASE_URL = `${process.env.NEXT_PUBLIC_WAYFARER_API_URL}/api/catalog`;

/**
 * Fetches a destinations List
 */
export async function getAllDestinations(): Promise<DestinationDto[] | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations`, { 
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch destination: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching destination:', error);
    return null;
  }
}

/**
 * Fetches a destination by ID
 */
export async function getDestinationById(id: string): Promise<DestinationDto | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/${id}`, { 
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch destination: ${response.statusText}`);
    }
  
    return await response.json();
  } catch (error) {
    console.error('Error fetching destination:', error);
    return null;
  }
}

/**
 * Fetches similar destinations based on provided destination IDs
 */
export async function getSimilarDestinations(ids: string[]): Promise<DestinationDto[]> {
  try {
    const destinations = await Promise.all(
      ids.map(async (id) => {
        const destination = await getDestinationById(id);
        return destination;
      })
    );
    
    return destinations.filter((d): d is DestinationDto => d !== null);
  } catch (error) {
    console.error('Error fetching similar destinations:', error);
    return [];
  }
}

/**
 * Fetches popular destinations (for use in suggested destinations)
 */
export async function getPopularDestinations(limit: number = 3): Promise<DestinationDto[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations?limit=${limit}`, {
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch popular destinations: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular destinations:', error);
    return [];
  }
}
