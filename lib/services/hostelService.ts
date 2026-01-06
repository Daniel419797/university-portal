import { api } from './apiClient';

// Types
export interface Hostel {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  capacity: number;
  location: string;
  facilities: string[];
  warden?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HostelApplicationSubmitRequest {
  hostelId: string;
  session: string;
  roomType: 'single' | 'double' | 'shared';
  specialNeeds?: string;
}

export interface HostelApplicationResponse {
  id: string;
  studentId: string;
  session: string;
  roomType: 'single' | 'double' | 'shared';
  specialNeeds?: string;
  status: 'pending' | 'approved' | 'rejected' | 'allocated';
  appliedAt: string;
  allocatedRoom?: {
    hostelName: string;
    blockName: string;
    roomNumber: string;
    bedNumber: string;
  };
}

export interface HostelStats {
  totalHostels: number;
  totalCapacity: number;
  totalOccupied: number;
  occupancyRate: number;
  applications: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
}

export interface ApproveApplicationRequest {
  hostelId: string;
  roomNumber: string;
}

export interface RejectApplicationRequest {
  reason: string;
}

export interface AllocateRoomRequest {
  hostelId: string;
  roomNumber: string;
  bedNumber: string;
}

const hostelService = {
  // Student endpoints
  async applyForHostel(data: HostelApplicationSubmitRequest): Promise<void> {
    await api.post('/hostels/apply', data);
  },

  // Admin endpoints
  async getHostelApplications(): Promise<HostelApplicationResponse[]> {
    const response = await api.get<HostelApplicationResponse[]>('/hostels/applications');
    return response.data;
  },

  async getHostelApplication(id: string): Promise<HostelApplicationResponse> {
    const response = await api.get<HostelApplicationResponse>(`/hostels/applications/${id}`);
    return response.data;
  },

  async approveHostelApplication(id: string, data: ApproveApplicationRequest): Promise<void> {
    await api.put(`/hostels/applications/${id}/approve`, data);
  },

  async rejectHostelApplication(id: string, data: RejectApplicationRequest): Promise<void> {
    await api.put(`/hostels/applications/${id}/reject`, data);
  },

  async allocateHostelRoom(id: string, data: AllocateRoomRequest): Promise<void> {
    await api.put(`/hostels/applications/${id}/allocate`, data);
  },

  async getHostelStats(): Promise<HostelStats> {
    const response = await api.get<HostelStats>('/hostels/stats/overview');
    return response.data;
  },

  async getHostels(): Promise<Hostel[]> {
    const response = await api.get<Hostel[]>('/hostels');
    return response.data;
  },

  async createHostel(data: { name: string; gender: 'Male' | 'Female'; capacity: number; location: string; facilities: string[] }): Promise<Hostel> {
    const response = await api.post<Hostel>('/hostels', data);
    return response.data;
  },

  async getHostel(id: string): Promise<Hostel> {
    const response = await api.get<Hostel>(`/hostels/${id}`);
    return response.data;
  },

  async updateHostel(id: string, data: Partial<{ name: string; gender: 'Male' | 'Female'; capacity: number; location: string; facilities: string[] }>): Promise<Hostel> {
    const response = await api.put<Hostel>(`/hostels/${id}`, data);
    return response.data;
  },

  async deleteHostel(id: string): Promise<void> {
    await api.delete(`/hostels/${id}`);
  },
};

export default hostelService;