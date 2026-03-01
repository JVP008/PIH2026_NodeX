import { Database } from './db';

/**
 * Represents a contractor/service provider in the system
 * Contains all details about a professional available for booking
 */
export type Contractor = Database['public']['Tables']['contractors']['Row'];

/**
 * Represents a booking made by a user for a contractor's services
 * Includes status tracking and related contractor information
 */
export interface Booking extends Omit<Database['public']['Tables']['bookings']['Row'], 'status'> {
  status: 'upcoming' | 'completed' | 'cancelled' | 'pending';
  contractor?: {
    name: string;
    image: string | null;
  };
  service?: string;
}

/**
 * Represents a dispute raised by a user regarding a booking
 * Contains dispute details and related booking/contractor information
 */
export type Dispute = Database['public']['Tables']['disputes']['Row'] & {
  booking?: {
    service: string;
    contractor?: {
      name: string;
    };
  };
};

/**
 * Represents a job posting created by a user
 * Contains job requirements and details for contractors to apply
 */
export type Job = Database['public']['Tables']['jobs']['Row'];

/**
 * Represents a user in the system
 * Contains basic user information and authentication details
 */
export type User = Database['public']['Tables']['users']['Row'];

/**
 * Filter options for searching and filtering contractors
 * Used in contractor listing and search functionality
 */
export interface ContractorFilter {
  service?: string;
  rating?: number;
  available?: boolean;
  verified?: boolean;
  searchQuery?: string;
}

/**
 * Booking form data structure
 * Used when creating or updating bookings
 */
export interface BookingFormData {
  contractorId: string;
  date: string;
  time: string;
  notes?: string;
}

/**
 * API response structure for consistent error handling
 * Used across all API endpoints
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
